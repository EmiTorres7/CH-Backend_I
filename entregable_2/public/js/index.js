//realizamos la conexión
const socket = io();

//escuchamos el evento 'productAdded' que se emite desde el servidor cuando se agrega un nuevo producto

const formNewProduct = document.getElementById('formNewProduct');

formNewProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formNewProduct);
    const productData = {}
    formData.forEach((value, key) => {
        productData[key] = value;
    });
    console.log(productData);
    //enviamos los datos del productos al servidor para guardarlo en el json
    socket.emit('newProduct', productData);
});

socket.on('productAdded', (newProduct) => {
    console.log('Nuevo producto agregado:', newProduct);
    // Aquí puedes actualizar la interfaz de usuario para mostrar el nuevo producto
    // Por ejemplo, podrías agregar el nuevo producto a una lista en la página
    const productsList = document.getElementById('productsList');
    productsList.innerHTML += `<li data-id="${newProduct.id}">${newProduct.title} - $${newProduct.price}<button onclick="deleteProduct('${newProduct.id}')">Eliminar</button></li>`;
});

//hacer funcion para eliminar un producto, que emita el evento 'deleteProduct' al servidor con el id del producto a eliminar
function deleteProduct(productId) {
    socket.emit('deleteProduct', productId);
}

//escuchamos el evento 'productDeleted' que se emite desde el servidor cuando se elimina un producto
socket.on('productDeleted', (productId) => {
    console.log('Producto eliminado:', productId);
    // Aquí puedes actualizar la interfaz de usuario para eliminar el producto de la lista
    const productItem = document.querySelector(`li[data-id="${productId}"]`);
    if (productItem) {
        productItem.remove();
    }
});


