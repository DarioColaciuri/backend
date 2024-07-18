import { Router } from 'express';
import { uploader } from '../utils.js';
import { updatePremiumStatus, uploadDocuments, getAllUsers, deleteInactiveUsers, updateUserRole, deleteUser } from '../controllers/users.controller.js';

const usersRouter = Router()

usersRouter.get("/", getAllUsers)
usersRouter.put("/premium/:uid", updatePremiumStatus)
usersRouter.post("/:uid/documents", uploader, uploadDocuments)
usersRouter.delete("/", deleteInactiveUsers)
usersRouter.post("/role/:uid", updateUserRole);  
usersRouter.post("/:uid", deleteUser); 


export default usersRouter