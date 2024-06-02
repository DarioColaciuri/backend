import ticketsModel from "../models/tickets.model.js"
import CartModel from "../models/carts.model.js"
import { productsModel } from "../models/products.model.js"
import { usersModel } from "../models/users.model.js"

class TicketManager {

    async createTicket(userId, cartId) {
        try {
            const cart = await CartModel.findOne({ _id: cartId });
            if (!cart || cart.products.length === 0) {
                throw new Error('No hay productos en el carrito para crear un ticket.');
            }

            const { availableProducts, unavailableProducts } = await this.checkStock(cart.products);

            if (availableProducts.length === 0) {
                throw new Error('No hay suficiente stock para completar la compra.');
            }

            const user = await usersModel.findById(userId);
            const ticket = new ticketsModel({
                purchase_datetime: new Date(),
                amount: this.calculateTotalAmount(availableProducts),
                purchaser: userId,
                products: availableProducts,
            });
            await ticket.save();
            await this.updateStock(availableProducts);

            await CartModel.findOneAndUpdate({ _id: cartId }, { $set: { products: unavailableProducts } });

            return { ticket, unavailableProducts };
        } catch (error) {
            req.logger.error('Error al crear el ticket:', error.message);
            throw new Error('Error al crear el ticket. Consulta los registros para obtener más detalles.');
        }
    }

    async checkStock(products) {
        try {
            const availableProducts = [];
            const unavailableProducts = [];

            for (const item of products) {
                const product = await productsModel.findById(item.product);
                if (product && product.stock >= item.quantity) {
                    availableProducts.push(item);
                } else {
                    unavailableProducts.push({
                        product: item.product,
                        quantity: product ? item.quantity - product.stock : item.quantity
                    });
                    if (product) {
                        item.quantity = product.stock;
                        if (product.stock > 0) {
                            availableProducts.push(item);
                        }
                    }
                }
            }
            return { availableProducts, unavailableProducts };
        } catch (error) {
            req.logger.error("Error al verificar stock", error);
            throw error;
        }
    }

    async updateStock(products) {
        try {
            for (const item of products) {
                await productsModel.findByIdAndUpdate(item.product._id, {
                    $inc: { stock: -item.quantity },
                });
            }
        } catch (error) {
            req.logger.error("Error al actualizar stock", error);
            throw error;
        }
    }

    async getTicketsByUser(userId) {
        try {
            const user = await usersModel.findById(userId);
            if (!user) {
                return [];
            }
            const tickets = await ticketsModel.find({ purchaser: user.email });
            return tickets;
        } catch (error) {
            req.logger.error("Error al obtener los tickets:", error);
            throw error;
        }
    }

    calculateTotalAmount(products) {
        return products.reduce((total, item) => {
            const price = item.product.price;
            const quantity = item.quantity;
            return total + price * quantity;
        }, 0);
    }
}

export default TicketManager;