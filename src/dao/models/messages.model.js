import mongoose from 'mongoose';

const collection = "messages";

const schema = new mongoose.Schema({
    user: String,
    message: String,
},
    { timestamps: true }
);

const messageModel = mongoose.model(collection, schema);

export default messageModel;

// validar que en el esquema sea un email y no un string cualquiera, igual lo agregue desde el prompt
// y funcionaria igual, pero en caso de tener que hacerlo creo que podria hacerlo asi tambien desde aca

// user: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//         validator: function (value) {
//             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//         },
//         message: 'Invalid email address format',
//     },
// },