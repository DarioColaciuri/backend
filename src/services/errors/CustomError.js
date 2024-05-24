import EErrors from "./errors-enum.js";

class CustomError extends Error {
    constructor(errorCode, additionalInfo) {
        super(getErrorMessage(errorCode) || 'Error desconocido');
        this.errorCode = errorCode;
        this.additionalInfo = additionalInfo;
    }
}

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case EErrors.CART_NOT_FOUND:
            return 'Carrito no encontrado';
        case EErrors.PRODUCT_NOT_FOUND:
            return 'Producto no encontrado';
        default:
            return 'Error desconocido';
    }
}

export default CustomError;