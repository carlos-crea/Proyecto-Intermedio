const formulario = document.querySelector("#formulario_editar");
const imagen = document.querySelector("#imagen");
const input_imagen = document.querySelector("#imagen_input");
const nombre = document.querySelector("#nombre");
const descripcion = document.querySelector("#descripcion");
const precio = document.querySelector("#precio");
const categoria = document.querySelector("#categoria");


//guardamos los cambios
const guardarProducto = (nombre,imagenUrl,precio,categoria,descripcion,id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {nombre,imagenUrl,precio,categoria,descripcion} ),
    }).then( (respuesta) => {
        return respuesta;
    });
};

//Leer todos los productos de la base de datos
const leerProductos = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`).then( (respuesta) => {
        return respuesta.json();
    });
};

const url = new URL(window.location);
const id = url.searchParams.get("id");

leerProductos(id).then( (data) => {

    imagen.setAttribute("src", data.imagenUrl);
    nombre.value = data.nombre;
    descripcion.value = data.descripcion;
    precio.value = data.precio;
    categoria.value = data.categoria;
    

    formulario.addEventListener("submit", (event) => {
        const file = input_imagen.files[0];
        if(file) {
            let imageData;
            const reader = new FileReader();
            reader.onload = function (event) {
                imageData = event.target.result;

                console.log("Data: " + imageData);
                console.log('Imagen nombre: ', file.name);
                guardarProducto(nombre.value, imageData, precio.value, categoria.value, descripcion.value, id);
            };

            reader.readAsDataURL(file);
        } else {
            console.log("no etsiste")
            guardarProducto(nombre.value, data.imagenUrl, precio.value, categoria.value, descripcion.value, id);
        }
    })
});