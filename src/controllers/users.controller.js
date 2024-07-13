import { usersModel } from "../dao/models/users.model.js"
import { loggerDev } from "../config/logger.js"
import { userRepository } from "../services/service.js"


export const updatePremiumStatus = async (req, res) => {
    const userId = req.params.uid;

    try {
        const user = await usersModel.findById(userId);
        console.log("Rol del usuario:", user.rol);

        if (!user) {
            return res.status(404).json({ error: 'No se encontro el usuario' });
        }

        if(user.rol === "user") {            
            const requiredDocuments = ["Identificacion", "Comprobante de domicilio", "Comprobante de estado de cuenta"];
            const userDocuments = user.documents.map(doc => doc.name.split('_')[0]);
            console.log("userdocuments", userDocuments)

            const hasAllDocuments = requiredDocuments.every(doc => userDocuments.includes(doc));
            console.log("hasAllDocuments", hasAllDocuments)
            if (!hasAllDocuments) {
                console.log("No hay documentos");
                return res.status(400).json({ message: "El usuario debe cargar todos los documentos requeridos antes de actualizar su rol a premium" });
            }
        }

        const newRole = user.rol === "user" ? "premium" : "user";
        user.rol = newRole;

        await user.save();
        loggerDev.info(`Se actualizo el rol del usuario ${userId} a ${user.rol}`);
        res.status(200).json({ message: 'Se actualizo el rol del usuario', user: user.toObject() });
    } catch (error) {
        loggerDev.error("Error al actualizar el rol", error);
        res.status(500).json({ error: error.message });
    }
};

export const uploadDocuments = async (req, res) => {
    try {
        const userId = req.params.uid;
        const documents = req.files;

        const updateResult = await userRepository.updateDocuments(userId, documents);

        if (!updateResult.success) {
            return res.status(404).json({ message: updateResult.message });
        }

        res.status(200).json({ message: "Documentos subidos correctamente" });
    } catch (error) {
        loggerDev.error("Error al subir documentos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};