import { Router } from 'express';
import { uploader } from '../utils.js';
import { updatePremiumStatus, uploadDocuments } from '../controllers/users.controller.js';

const usersRouter = Router()

usersRouter.put("/premium/:uid", updatePremiumStatus)
usersRouter.post("/:uid/documents", uploader, uploadDocuments)

export default usersRouter