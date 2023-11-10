const articulos = document.querySelector(".articulos");
const total_pagar = document.querySelector(".total_pagar");
const btn_pagar = document.querySelector(".boton_pagar");

const listaProductos = () => {
    return fetch("http://localhost:3000/carrito").then( (respuesta) => {
        return respuesta.json();
    });
};

//Actualizamos la cantidad de articulos
const actualizarProducto = (nombre, imagenUrl, precio, categoria, cantidad, id) => {
    return fetch(`http://localhost:3000/carrito/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {nombre, imagenUrl, precio, categoria, cantidad} ),
    }).then( (respuesta) => {
        return respuesta;
    });
};

//Eliminamos el producto del carrito
const borrarPorducto = (id) => {
    return fetch(`http://localhost:3000/carrito/${id}` , {
        method: "DELETE",
    });
};

const crearLineaHtmlProducto = (nombre, precio, nombre_foto, id, cantidad, categoria) =>{ 
    const div_producto = document.createElement("div");
    div_producto.classList.add("producto");
    const boton_eliminar = document.createElement("button");
    boton_eliminar.innerText = "Eliminar";
    boton_eliminar.classList.add("btn_agregar");
    boton_eliminar.setAttribute("id", id);
    const div_cantidad = document.createElement("div");
    div_cantidad.classList.add("cantidades");
    const cantidad_producto = document.createElement("p");
    const btn_mas = document.createElement("button");
    btn_mas.classList.add("btn_mas");
    const btn_menos = document.createElement("button");
    btn_menos.classList.add("btn_menos");
    btn_mas.innerText = "+";
    btn_menos.innerText = "-";
    cantidad_producto.innerText = cantidad;
    div_cantidad.appendChild(btn_mas);
    div_cantidad.appendChild(cantidad_producto);
    div_cantidad.appendChild(btn_menos);
    const linea = `<img src="img/${nombre_foto}" alt="imagen producto">
    <p class="descripcion">${nombre}</p>
    <p class="precio">$ ${precio}</p>`;
    div_producto.innerHTML = linea;
    div_producto.appendChild(div_cantidad);
    div_producto.appendChild(boton_eliminar);
    articulos.appendChild(div_producto);

    btn_mas.addEventListener("click", () =>{
        actualizarProducto(nombre, nombre_foto, precio, categoria, (cantidad+1), id);
    });

    btn_menos.addEventListener("click", ()=>{
        if(cantidad != 1) {
            actualizarProducto(nombre, nombre_foto, precio, categoria, (cantidad-1), id);
        }
    });

    boton_eliminar.addEventListener("click", ()=>{
        borrarPorducto(id);
    });
}

listaProductos().then( (data) =>{
    data.forEach(element => {
        crearLineaHtmlProducto(element.nombre, element.precio, element.imagenUrl, element.id, element.cantidad, element.categoria);
    });

    let total = 0;
    data.forEach(element => {
        total = total + (Number(element.precio) *  element.cantidad);
    });

    total_pagar.innerText = "$" + total;
});

btn_pagar.addEventListener("click", ()=>{
        listaProductos().then( (data) =>{
            data.forEach(element => {
                borrarPorducto(element.id);
        });
    });
});
