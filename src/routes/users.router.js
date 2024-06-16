import { Router } from 'express';
import { updatePremiumStatus } from '../controllers/users.controller.js';

const usersRouter = Router()

usersRouter.put("/premium/:uid", updatePremiumStatus)

export default usersRouter