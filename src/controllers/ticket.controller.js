import { ticketRepository } from "../services/service.js";

export const purchase = async (req, res) => {
    const userId = req.user._id;
    const cartId = req.session.usuario.cart.toString();
    try {
        const ticket = await ticketRepository.createTicket(userId, cartId);
        console.log('Ticket creado exitosamente.');
        res.status(201).json(ticket);
    } catch (error) {
        console.log('Error al crear el ticket:', error.message);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};