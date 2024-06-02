import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import vistasRouter from "./routes/vistas.router.js";
import { router as sessionsRouter } from './routes/sessions.router.js';
import socketProducts from "./listeners/socketProducts.js";
import socketChat from './listeners/socketChat.js';
import connectToDB from "./config/configServer.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { config } from "../src/config/config.js"
import { addLogger, loggerDev } from "./config/logger.js"
import loggerRouter from './routes/loggers.router.js';

const PORT = config.PORT;
const app = express();

app.use(addLogger)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB()

app.use(session(
    {
        secret: config.SECRET,
        resave: true, saveUninitialized: true,
        store: MongoStore.create(
            {
                mongoUrl: config.MONGO_URL,
                ttl: 3000
            }
        )
    }
))

initializePassport();
app.use(passport.initialize())
app.use(passport.session()) 
app.use(express.static(path.join(__dirname, '/public')));


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter)
app.use("/", vistasRouter)
app.use("/loggerTest", loggerRouter)




app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

const http = app.listen(PORT, () => {
    loggerDev.info(`Server on port ${PORT}`);
});

const io = new Server(http)

socketProducts(io)
socketChat(io)