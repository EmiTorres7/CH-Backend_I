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
    productsList.innerHTML += `<li>${newProduct.title} - $${newProduct.price}</li>`;
});


