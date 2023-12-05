const guitarras = document.querySelector(".guitarras");
const bajos = document.querySelector(".bajos");
const amplificadores = document.querySelector(".amplificadores");
const accesorios = document.querySelector(".accesorios");
const cantidad_productos_carrito = document.querySelector(".cantidad_productos_carrito");
const nombre_user = document.querySelector(".nombre_user");
const tarjeta_exito = document.querySelector(".tarjeta-exito");
const btn_ok = document.querySelector("#btn-ok");


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
 


//href="carrito.html?id=${id}
const crearLineaHtmlGuitarra = (nombre, precio, nombre_foto, id, categoria) =>{ 
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");

    const div_guitarra = document.createElement("div");
    div_guitarra.classList.add("guitarra");
    const boton_agregar = document.createElement("button");
    boton_agregar.innerText = "Agregar";
    boton_agregar.classList.add("btn_agregar");
    boton_agregar.setAttribute("id", id);
    const linea = `<a href="producto.html?id=${id}&user=${usuario}"><img src="${nombre_foto}" alt="imagen guitarra"></img></a>
    <p class="descripcion">${nombre}</p>
    <p class="precio">$ ${precio}</p>`;
    div_guitarra.innerHTML = linea;
    div_guitarra.appendChild(boton_agregar);
    guitarras.appendChild(div_guitarra);
    boton_agregar.addEventListener("click", ()=>{
        crearProducto(nombre, nombre_foto, precio, categoria, id);
        tarjeta_exito.style.display = "block";
    });

    btn_ok.addEventListener("click", () => {
        window.location.href = "index.html?user=" + usuario;
    });
}

const crearLineaHtmlBajo = (nombre, precio, nombre_foto, id, categoria) =>{ 
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");

    const div_bajo = document.createElement("div");
    div_bajo.classList.add("bajo");
    const boton_agregar = document.createElement("button");
    boton_agregar.innerText = "Agregar";
    boton_agregar.classList.add("btn_agregar");
    boton_agregar.setAttribute("id", id);
    const linea = `<a href="producto.html?id=${id}&user=${usuario}"><img src="${nombre_foto}" alt="imagen bajo"></a>
    <p class="descripcion">${nombre}</p>
    <p class="precio">$ ${precio}</p>`;
    div_bajo.innerHTML = linea;
    div_bajo.appendChild(boton_agregar);
    bajos.appendChild(div_bajo);
    boton_agregar.addEventListener("click", ()=>{
        crearProducto(nombre, nombre_foto, precio, categoria, id);
    })
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

const crearLineaHtmlAccesorio = (nombre, precio, nombre_foto, id, categoria, descripcion) =>{ 
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");

    const div_accesorio = document.createElement("div");
    div_accesorio.classList.add("accesorio");
    const boton_agregar = document.createElement("button");
    boton_agregar.innerText = "Agregar";
    boton_agregar.classList.add("btn_agregar");
    boton_agregar.setAttribute("id", id);
    const linea = `<a href="producto.html?id=${id}&user=${usuario}"><img src="${nombre_foto}" alt="imagen accesorio"></img></a>
    <p class="descripcion">${nombre}</p>
    <p class="precio">$ ${precio}</p>`;
    div_accesorio.innerHTML = linea;
    div_accesorio.appendChild(boton_agregar);
    accesorios.appendChild(div_accesorio);
    boton_agregar.addEventListener("click", ()=>{
        crearProducto(nombre, nombre_foto, precio, categoria, id)
    })
};

listaProductos().then( (data) => {
    let index = 0;
        data.forEach(element => {
            if(element.categoria == "guitarras" && index < 4) {
                crearLineaHtmlGuitarra(element.nombre, element.precio, element.imagenUrl, element.id, element.categoria, element.descripcion);
                index++;
            }
        });
    
    index = 0;
    data.forEach(element => {
        if(element.categoria == "bajos" && index < 4) {
            crearLineaHtmlBajo(element.nombre, element.precio, element.imagenUrl, element.id, element.categoria);
            index++;
        }
    });

    index = 0;
    data.forEach(element => {
        if(element.categoria == "amplificadores" && index < 4) {
            crearLineaHtmlAplificador(element.nombre, element.precio, element.imagenUrl, element.id, element.categoria);
            index++;
        }
    });

    index = 0;
    data.forEach(element => {
        if(element.categoria == "accesorios" && index < 4) {
            crearLineaHtmlAccesorio(element.nombre, element.precio, element.imagenUrl, element.id, element.categoria);
            index++;
        }
    });



  });

//Modificamos el numero de elemntos del icono del carrito
listaCarrito().then( (data) => {
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");
    cantidad_productos_carrito.innerText = data.length;
    nombre_user.innerText = usuario;
});

//Ponemos el nombre del usuario logeado
const linkUser = ()=> {
    const url = new URL(window.location);
    const usuario = url.searchParams.get("user");
    const info_user = document.querySelector(".info_user");
    info_user.href = "usuario.html?user=" + usuario;
}

linkUser();