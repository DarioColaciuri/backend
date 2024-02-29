import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const routes = {
    products: join(__dirname, 'data', 'productos.json'),
    carts: join(__dirname, 'data', 'carts.json'),
};

