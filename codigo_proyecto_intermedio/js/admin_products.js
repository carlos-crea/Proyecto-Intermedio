const productos = document.querySelector(".productos");

//Leer todos los productos de la base de datos
const leerProductos = () => {
    return fetch("http://localhost:3000/productos").then( (respuesta) => {
        return respuesta.json();
    });
};

//Eliminamos el producto del carrito
const borrarPorducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}` , {
        method: "DELETE",
    });
};

const mostrarProductos = (nombre_foto, nombre, id) => {
    const div_producto = document.createElement("div");
    div_producto.classList.add("producto");
    const boton_editar = document.createElement("button");
    boton_editar.innerText = "Editar";
    boton_editar.classList.add("btn_editar");
    boton_editar.setAttribute("id", id);
    const boton_eliminar = document.createElement("button");
    boton_eliminar.innerText = "Eliminar";
    boton_eliminar.classList.add("btn_eliminar");
    boton_eliminar.setAttribute("id", id);
    const linea = `<img src="${nombre_foto}" alt="imagen_producto">
    <p class="nombre">${nombre}</p>`;
    div_producto.innerHTML = linea;
    const div_botones = document.createElement("div");
    div_botones.classList.add("div_botones");
    div_botones.appendChild(boton_editar);
    div_botones.appendChild(boton_eliminar);
    div_producto.appendChild(div_botones);
    productos.appendChild(div_producto);

    boton_editar.addEventListener("click", ()=>{
        window.location.href = "editar_producto.html?id=" + id;
        //crearProducto(nombre, nombre_foto, precio, categoria, id);
        //tarjeta_exito.style.display = "block";
    });

    boton_eliminar.addEventListener("click", () => {
        borrarPorducto(id);
    });

};

leerProductos().then( (data) => {
    data.forEach(element => {
        mostrarProductos(element.imagenUrl, element.nombre, element.id);
    });
});