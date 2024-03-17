const socketClient=io()

socketClient.on("enviodeproducts",(obj)=>{
    updateProductList(obj)
})


function updateProductList(productList) {
 
    const productsDiv  = document.getElementById('list-products')

    let productosHTML = "";
  
    productList.forEach((product) => {
      // const thumbnailUrl = product.thumbnails.length > 0 ? product.thumbnails[0].url : 'https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg';
        productosHTML += `
          <div class="card">
            <div class="card-header-code">code: ${product.code}</div>
              <div class="card-body">
                  <h4 class="card-title">${product.title}</h4>
                    <ul class="card-text">
                      <li>id: ${product._id}</li>
                      <li>description: ${product.description}</li>
                      <li>price: $${product.price}</li>
                      <li>category: ${product.category}</li>
                      <li>status: ${product.status}</li>
                      <li>stock: ${product.stock}</li>
                    </ul>
                    <div class="img-container">
                      <img class="card-img" src="${product.thumbnail}" alt="${product.title}">
                    </div>
              </div>
              <div class="container-eliminar-btn">
                <button type="button" class="eliminar-btn" onclick="deleteProduct('${String(product._id)}')"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
`;
    });
  
    productsDiv .innerHTML = productosHTML;
  }


  let form = document.getElementById("formProduct");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  
    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.checked;
  
    socketClient.emit("addProduct", {
      title,
      description,
      stock,
      thumbnail,
      category,
      price,
      code,
      status,
    });
  
    form.reset();
  });


document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = deleteidinput.value;
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  })

function deleteProduct(productId) {
  socketClient.emit("deleteProduct", productId);
}