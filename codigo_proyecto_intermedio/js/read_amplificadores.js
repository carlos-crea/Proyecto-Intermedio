const amplificadores = document.querySelector(".amplificadores");
const cantidad_productos_carrito = document.querySelector(".cantidad_productos_carrito");
const nombre_user = document.querySelector(".nombre_user");

const listaProductos = () => {
    return fetch("http://localhost:3000/productos").then( (respuesta) => {
        return respuesta.json();
    });
};

const listaCarrito = () => {
    return fetch("http://localhost:3000/carrito").then( (respuesta) => {
        return respuesta.json();
    });
};

//Agregamos al carrito
const crearProducto = (nombre, imagenUrl, precio, categoria, id) => {
    return fetch("http://localhost:3000/carrito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, imagenUrl, precio, categoria, cantidad:1, id}),
    });
};

const crearLineaHtmlAplificador = (nombre, precio, nombre_foto, id, categoria, descripcion) =>{ 
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");

    const div_amplificador = document.createElement("div");
    div_amplificador.classList.add("amplificador");
    const boton_agregar = document.createElement("button");
    boton_agregar.innerText = "Agregar";
    boton_agregar.classList.add("btn_agregar");
    boton_agregar.setAttribute("id", id);
    const linea = `<a href="producto.html?id=${id}&user=${usuario}"><img src="${nombre_foto}" alt="imagen amplificador"></img></a>
    <p class="descripcion">${nombre}</p>
    <p class="precio">$ ${precio}</p>`;
    div_amplificador.innerHTML = linea;
    div_amplificador.appendChild(boton_agregar);
    amplificadores.appendChild(div_amplificador);
    boton_agregar.addEventListener("click", ()=>{
        crearProducto(nombre, nombre_foto, precio, categoria, id)
    })
};

//Ponemos todas las guitarras disponibles en la DB
listaProductos().then( (data) => {
    data.forEach(element => {
        if(element.categoria == "amplificadores") {
            crearLineaHtmlAplificador(element.nombre, element.precio, element.imagenUrl, element.id, element.categoria, element.descripcion);
        }
    });
});

//Modificamos el numero de elemntos del icono del carrito
listaCarrito().then( (data) => {
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");
    cantidad_productos_carrito.innerText = data.length;
    if(usuario != null && usuario != "null") {
        nombre_user.innerText = usuario;
    }
});

//Ponemos el nombre del usuario logeado
const linkUser = ()=> {
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");
    const info_user = document.querySelector(".info_user");
    info_user.href = "usuario.html?user=" + usuario;
};

linkUser();