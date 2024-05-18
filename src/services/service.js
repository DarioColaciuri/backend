import ProductManager from '../dao/Mongo/productManagerMongo.js';
import ProductRepository from './repository/ProductRepository.js';

const productManager = new ProductManager();
export const productRepository = new ProductRepository(productManager);

import CartManager from '../dao/Mongo/cartManagerMongo.js';
import CartRepository from './repository/CartRepository.js';

const cartManager = new CartManager();  
export const cartRepository = new CartRepository(cartManager);  

import  UsuariosManagerMongo from '../dao/Mongo/userManagerMongo.js';
import UserRepository from './repository/UserRepository.js';

const UserManager = new UsuariosManagerMongo();
export const userRepository = new UserRepository(UserManager);

import TicketManager from '../dao/Mongo/ticketManagerMongo.js';
import TicketRepository from "../services/repository/TicketRepository.js"

const ticketManager = new TicketManager()
export const ticketRepository = new TicketRepository(ticketManager)

import MessageManager from '../dao/Mongo/messageManagerMongo.js'
import MessageRepository from './repository/MessageRepository.js';

const messageManager = new MessageManager()
export const messageRepository = new MessageRepository(messageManager)