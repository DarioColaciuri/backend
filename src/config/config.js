import dotenv from "dotenv";
import { Command, Option } from "commander";

let programa = new Command();

programa.addOption(new Option("-m --mode <MODE>", "Modo de ejecución del Script").choices(["dev", "prod"]).default("dev"));

programa.parse();
const opts = programa.opts();

const mode = opts.mode;

console.log(`Ejecutando en modo ${mode}`);
dotenv.config({
  path: mode === "prod" ? "./src/.env.prod" : "./src/.env.dev",
  override: true,
});

export const config = {
  PORT: process.env.PORT || 8080,
  MENSAJE: process.env.MENSAJE,
  SECRET: process.env.SECRET,
  MONGO_URL: process.env.MONGO_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
}