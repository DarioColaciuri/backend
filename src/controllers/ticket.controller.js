import { ticketRepository } from "../services/service.js";
import { enviarMail } from "../config/mailer.js";


export const purchase = async (req, res) => {
    const userId = req.user._id;
    const cartId = req.session.usuario.cart.toString();
    try {
        const ticket = await ticketRepository.createTicket(userId, cartId);
        req.logger.info('Ticket creado exitosamente.');
        const userEmail = req.user.email;
        const latestTicket = await ticketRepository.getLatestTicketByUser(userId);
        await enviarMail(userEmail, `Su compra ha sido completada. ID del ticket: ${latestTicket.code}`,
            `<h1>Gracias por realizar su compra</h1>
        <p>Por favor no pierda su ID de compra para realizar reclamos:</p> 
        <h2>${latestTicket.code}</h2>
        <p>Precio: ${latestTicket.amount}</p>
        `
        );

        res.status(201).json(ticket);
    } catch (error) {
        req.logger.error('Error al crear el ticket');
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};