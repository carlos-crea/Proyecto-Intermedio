const formulario = document.querySelector("#formulario_editar");
const input_imagen = document.querySelector("#imagen_input");
const nombre = document.querySelector("#nombre");
const descripcion = document.querySelector("#descripcion");
const precio = document.querySelector("#precio");
const categoria = document.querySelector("#categoria");

//Agregamos el producto al DB
const crearProducto = (nombre,imagenUrl,precio,categoria,descripcion) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, imagenUrl, precio, categoria, descripcion, id: uuid.v4()}),
    });
};

formulario.addEventListener("submit", (event) => {
    
    const file = input_imagen.files[0];
        if(file) {
            console.log("si existe");
            let imageData;
            const reader = new FileReader();
            reader.onload = function (event) {
                imageData = event.target.result;

                console.log("Data: " + imageData);
                console.log('Imagen nombre: ', file.name);
                crearProducto(nombre.value, imageData, precio.value, categoria.value, descripcion.value);
            };

            reader.readAsDataURL(file);
        }    
});
