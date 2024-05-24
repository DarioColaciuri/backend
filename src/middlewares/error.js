import EErrors from "../services/errors/errors-enum.js";

const errorHandler = (error, req, res, next) => {
    console.error('Error detectado entrando al Error Handler:');
    console.error(`Name: ${error.name}`);
    console.error(`Code: ${error.errorCode}`);
    console.error(`Message: ${error.message}`);

    if (error.additionalInfo) {
        console.error('Additional Info:', error.additionalInfo);
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