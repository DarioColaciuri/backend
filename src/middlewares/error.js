import EErrors from "../services/errors/errors-enum.js";

const errorHandler = (error, req, res, next) => {
    req.logger.error('Error detectado entrando al Error Handler:');
    req.logger.error(`Name: ${error.name}`);
    req.logger.error(`Code: ${error.errorCode}`);
    req.logger.error(`Message: ${error.message}`);

    if (error.additionalInfo) {
        req.logger.error('Additional Info:', error.additionalInfo);
    }

    switch (error.errorCode) {
        case EErrors.CART_NOT_FOUND:
            res.status(400).json({ status: 'error', error: error.message });
            break;
        case EErrors.PRODUCT_NOT_FOUND:
            res.status(404).json({ status: 'error', error: error.message });
            break;
        default:
            res.status(500).json({ status: 'error', error: 'Unhandled error!' });
    }
};

export default errorHandler