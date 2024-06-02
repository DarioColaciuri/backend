import messageModel from "../models/messages.model.js"

export default class MessagesManager {
    getMessages = async () => {
        try {
            return await messageModel.find().lean();
        } catch (error) {
            return error;
        }
    }

    createMessage = async (message) => {
        if (message.user.trim() === '' || message.message.trim() === '') {
            return null;
        }
        try {
            return await messageModel.create(message);
        } catch (error) {
            return error;
        }
    }

    deleteAllMessages = async () => {
        try {
            req.logger.info("Deleting all messages...");
            const result = await messageModel.deleteMany({});
            req.logger.info("Messages deleted:", result);
            return result;
        } catch (error) {
            req.logger.error("Error deleting messages:", error);
            return error;
        }
    }
}