import { usersModel } from "../models/users.model.js";
import { enviarMail } from "../../config/mailer.js";


export default class UsuariosManagerMongo{

    async create(usuario){
        let nuevoUsuario=await usersModel.create(usuario)
        return nuevoUsuario.toJSON()
    }

    async getBy(filtro){
        return await usersModel.findOne(filtro).lean()
    }

    async updateLastConnection(uid){
        try {
            const user = await usersModel.findById(uid)

            if (!user) {
                return { sucess: false, message: 'No se encontro el usuario' }
            }

            user.last_connection = new Date()
            await user.save()
            return { sucess: true, message: 'Ultima conexion actualizada correctamente' }
        } catch (error) {
            return { sucess: false, message: "Error al actualizar la ultima conexion" }
        }
    }

    async deleteInactiveUsers() {
        try {
            console.log("Iniciando eliminacion de usuarios inactivos")
            const twoDays = newDate()
            twoDays.setDate(twoDays.getDate() - 2)
            console.log("Fecha de busqueda", twoDays)

            const usersDelete = await usersModel.find({
                $or: [
                    { last_connection: { $exists: true, $lt: twoDays } }, 
                    { last_connection: { $exists: false } } 
                ]
            })

            if (usersDelete.length === 0) {
                console.log("No hay usuarios inactivos")
                return { success: true, message: "No hay usuarios inactivos" }
            } else {
                const emailsToDelete = usersDelete.map(user => user.email)

                for (const email of emailsToDelete) {
                    await enviarMail(email, "Cuenta inactiva", "Su cuenta ha sido inactivada por inactividad")
                    console.log("Correo electronico enviado a ", email)
                } 

                const deletedUsers = await usersModel.deleteManydeleteMany({ _id: { $in: usersToDelete.map(user => user._id) } })
                console.log(deletedUsers, "usuarios eliminados")
                return { success: true, message: "Se han eliminado los usuarios inactivos:", deletedUsers }
            }
        } catch (error) {
            console.log("Error al eliminar los usuarios inactivos", error)
            return { success: false, message: "Error al eliminar los usuarios inactivos" }
        }
    }

    async updateDocuments(uid, documents) {
        try {
            const user = await usersModel.findById(uid)
            if (!user) {
                console.log("El usuario no existe")
                return { success: false, message: 'No se encontro el usuario' }
            }

            const namedDocuments = Object.values(documents).map(document => ({
                name: `${document[0].originalname.split('.')[0]}_${user.email}`,
                reference: document[0].path
            }));
    
            user.documents.push(...namedDocuments);
            await user.save();
    
            console.log("Documentos actualizados correctamente");
            return { success: true, message: "Documentos actualizados correctamente" };
        } catch (error) {
            console.log("Error al actualizar documentos:", error);
            return { success: false, message: "Error al actualizar documentos" };
        }
    };


}