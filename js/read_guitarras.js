const guitarras = document.querySelector(".guitarras");
const bajos = document.querySelector(".bajos");
const cantidad_productos_carrito = document.querySelector(".cantidad_productos_carrito");

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
const crearLineaHtmlGuitarra = (nombre, precio, nombre_foto, id, categoria, descripcion) =>{ 
    const div_guitarra = document.createElement("div");
    div_guitarra.classList.add("guitarra");
    const boton_agregar = document.createElement("button");
    boton_agregar.innerText = "Agregar";
    boton_agregar.classList.add("btn_agregar");
    boton_agregar.setAttribute("id", id);
    const linea = `<img src="img/${nombre_foto}" alt="imagen guitarra">
    <p class="descripcion">${nombre}</p>
    <p class="precio">$ ${precio}</p>`;
    div_guitarra.innerHTML = linea;
    div_guitarra.appendChild(boton_agregar);
    guitarras.appendChild(div_guitarra);
    boton_agregar.addEventListener("click", ()=>{
        crearProducto(nombre, nombre_foto, precio, categoria, id)
    })
}

const crearLineaHtmlBajo = (descripcion, precio, nombre_foto, id) =>{ 
    const div_bajo = document.createElement("div");
    div_bajo.classList.add("bajo");
    const boton_agregar = document.createElement("button");
    boton_agregar.innerText = "Agregar";
    boton_agregar.classList.add("btn_agregar");
    const linea = `<img src="img/${nombre_foto}" alt="imagen bajo">
    <p class="descripcion">${descripcion}</p>
    <p class="precio">$ ${precio}</p>`;
    div_bajo.innerHTML = linea;
    div_bajo.appendChild(boton_agregar);
    bajos.appendChild(div_bajo);
    boton_agregar.addEventListener("click", ()=>{
        console.log(id);
    })
}

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
            crearLineaHtmlBajo(element.nombre, element.precio, element.imagenUrl, element.id);
            index++;
        }
    });
  });

//Modificamos el numero de elemntos del icono del carrito
listaCarrito().then( (data) => {
    cantidad_productos_carrito.innerText = data.length;
});
  