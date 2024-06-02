import { ticketRepository } from "../services/service.js";

export const purchase = async (req, res) => {
    const userId = req.user._id;
    const cartId = req.session.usuario.cart.toString();
    try {
        const ticket = await ticketRepository.createTicket(userId, cartId);
        req.logger.info('Ticket creado exitosamente.');
        res.status(201).json(ticket);
    } catch (error) {
        req.logger.error('Error al crear el ticket');
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};