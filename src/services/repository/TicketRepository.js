class TicketRepository {
    constructor(ticketManager) {
        this.ticketManager = ticketManager;
    }
    getTicketsByUser = (userId) => {
        return this.ticketManager.getTicketsByUser(userId);
    }
    
    createTicket = (userId, cartId) => {
        return this.ticketManager.createTicket(userId, cartId);
    }
    
    checkStock = (products) => {
        return this.ticketManager.checkStock(products);
    }
    
    updateStock = (products) => {
        return this.ticketManager.updateStock(products);
    }

    getLatestTicketByUser = (userId) => {
        return this.ticketManager.getLatestTicketByUser(userId);
    }
}

export default TicketRepository;
