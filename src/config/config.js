import dotenv from "dotenv"

dotenv.config(
    {
        path:"./src/.env", 
        override: true
    }
)

export const config={
    PORT:process.env.PORT || 8080,
    MONGO_URL:process.env.MONGO_URL,
    SECRET:process.env.SECRET,
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    CALLBACK_URL:process.env.CALLBACK_URL
}