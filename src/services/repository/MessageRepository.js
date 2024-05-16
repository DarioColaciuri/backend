class MessageRepository {
    constructor(MessageManager) {
        this.MessageManager = MessageManager;
    }

    getMessages = () => {
        return this.MessageManager.getMessages();
    }

    createMessage = (message) => {
        return this.MessageManager.createMessage();
    }

    deleteAllMessages = () => {
        return this.MessageManager.deleteAllMessages();
    }
}

export default MessageRepository;