import mongoose from "mongoose";
const URI="mongodb+srv://dariocolaciuri:0303456@cluster0.ghl8fhe.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB