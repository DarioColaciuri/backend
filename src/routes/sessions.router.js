import { Router } from 'express';
import passport from "passport";
import { register, failedRegister, login, failLogin, logout, callBackGithub, errorGithub, current } from "../controllers/sessions.controler.js"

export const router = Router()

router.post('/register', passport.authenticate("register", { failureRedirect: "/api/sessions/failedregister" }), register)
router.get("/failedregister", failedRegister)
router.post('/login', passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }), login)
router.get("/faillogin", failLogin)
router.get('/logout', logout);
router.get('/github', passport.authenticate("github", {}), (req, res) => { })
router.get('/callbackGithub', passport.authenticate("github", { failureRedirect: "/api/sessions/errorGitHub" }), callBackGithub)
router.get("/errorGitHub", errorGithub)
router.get("/current", current);

