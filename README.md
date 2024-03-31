<h1 align="center">Backend E-commerce</h1>

###

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" height="40" alt="socketio logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/handlebars/handlebars-original.svg" height="40" alt="handlebars logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="express logo"  />
</div>

###

<p align="left">PORT: 8080</p>


###

> [!NOTE]
> Todos los productos estan siendo agregados de manera hardcodeada al carrito 6606e44a2a9123e93bac004f

###

<p align="left">Dario Colaciuri</p>

###

<h2 align="left">End-points</h2>

###

<h3 align="center">Vistas (GET)</h3>

###

<h6 align="left">/</h6>

###

<p align="left">Una vista de todos los productos paginados, pueden seleccionarse por categoría y ordenarse por precio. Además, contiene un botón para agregar el producto seleccionado al carrito.</p>

###

<h6 align="left">/product/:pid</h6>

###

<p align="left">Una vista de todos los detalles del producto con su respectivo botón para agregar al carrito.</p>

###

<h6 align="left">/carts</h6>

###

<p align="left">Una vista de todos los carritos disponibles.</p>

###

<h6 align="left">/carts/:cid</h6>

###

<p align="left">Una vista de detalles del carrito seleccionado usando el populate para poder ver los detalles de cada item.</p>

###

<h6 align="left">/realtimeproducts</h6>

###

<p align="left">Una vista de administrador con socket.io que permite agregar o eliminar productos a la base de datos.</p>

###

<h6 align="left">/chat</h6>

###

<p align="left">Una vista hecha con socket.io que permite chatear en tiempo real con todas las personas que se conecten.</p>

###

<h3 align="center">Products (GET, POST, PUT, DELETE)</h3>

###

<h3 align="center">GET</h3>

###

<h6 align="left">/api/products/</h6>

###

<p align="left">Devuelve un objeto con el satus y toda la información de los productos en cada página.</p>

###

<h6 align="left">/api/products/:pid</h6>

###

<p align="left">Devuelve el producto seleccionado en formato json.</p>

###

<h3 align="center">PUT</h3>

###

<h6 align="left">/api/products/:pid</h6>

###

<p align="left">Actualiza el producto correctamente en la base de datos.</p>

###

<h3 align="center">DELETE</h3>

###

<h6 align="left">/api/products/:pid</h6>

###

<p align="left">Elimina el producto correctamente de la base de datos.</p>

###

<h3 align="center">CARTS (GET, POST, PUT , DELETE)</h3>

###

<h3 align="center">GET</h3>

###

<h6 align="left">/api/carts/</h6>

###

<p align="left">Trae todos los carritos disponibles.</p>

###

<h6 align="left">/api/carts/:cid</h6>

###

<p align="left">Trae solo el carrito con el ID seleccionado.</p>

###

<h3 align="center">POST</h3>

###

<h6 align="left">/api/carts/</h6>

###

<p align="left">Crea un carrito nuevo. (por defecto vacío)</p>

###

<h6 align="left">/api/carts/:cid/product/:pid</h6>

###

<p align="left">Añade un producto al carrito seleccionado.</p>

###

<h3 align="center">PUT</h3>

###

<h6 align="left">/api/carts/:cid</h6>

###

<p align="left">Modifica un carrito existente.</p>

###

<h6 align="left">/api/carts/:cid/product/:pid</h6>

###

<p align="left">Modifica la cantidad de un objeto seleccionado.</p>

###

<h3 align="center">DELETE</h3>

###

<h6 align="left">/api/carts/:cid/product/:pid</h6>

###

<p align="left">Elimina el objeto seleccionado dentro del carrito seleccionado.</p>

###

<h6 align="left">/api/carts/:cid</h6>

###

<p align="left">Vacia el carrito entero sin eliminarlo.</p>

###