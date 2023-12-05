
//Cargamos la info del producto con su id
const cargarInfoProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`).then( (respuesta) => {
        return respuesta.json();
    });
};

//Agregamos al carrito
const crearProducto2 = (nombre, imagenUrl, precio, categoria, id) => {
    return fetch("http://localhost:3000/carrito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, imagenUrl, precio, categoria, cantidad:1, id}),
    });
};


//Mostramos la info del producto en html y las reseñas y calificaciones
const mostrarInfoPorducto = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const user = url.searchParams.get("user");

    if(id == null) {
        window.alert("Ups ocurrio un error, el producto no se encuentra disponible");
    }

    cargarInfoProducto(id).then( (producto) => {
        const div_producto = document.querySelector(".div_producto");
        div_producto.innerHTML = `<h1 class="nombre_producto">${producto.nombre}</h1>
        <img src="img/${producto.imagenUrl}" alt="imagen de producto" class="imagen_producto">
        <p class="descripcion">${producto.descripcion}</p>
        <h2 class="titulo_resenas">Reseñas</h2>
        <a class="enlace_agregar_resena" href="agregar_resena.html?id=${id}&user=${user}">Agregar reseña+</a>`;
        const boton_agregar = document.createElement("button");
        boton_agregar.innerText = "Agregar al carrito";
        boton_agregar.classList.add("btn_agregar");
        div_producto.appendChild(boton_agregar);
        boton_agregar.addEventListener("click", ()=>{
            crearProducto2(producto.nombre, producto.imagenUrl, producto.precio, producto.categoria, producto.id)
        })
        
        //-----------------------------------------------------------------------------//
        const listaResenas = () => {
            return fetch(`http://localhost:3000/resenas`).then( (respuesta) => {
                return respuesta.json();
            });
        };

        
        listaResenas().then( (data) =>{
            data.forEach(element => {
                if(element.id_guitarra == id) {
                    const url = new URL(window.location);
                    const id = url.searchParams.get("id");
                    const div_resenas = document.createElement("div");
                    div_resenas.classList.add("resenas");
                    const usuario = document.createElement("p");
                    usuario.classList.add("usuario");
                    const opinion = document.createElement("p");
                    opinion.classList.add("opinion");
                    const div_resena = document.createElement("div");
                    div_resena.classList.add("resena");
                    usuario.innerText = "Usuario: " + element.usuario;
                    opinion.innerText = "Opinion: " + element.opinion;
                    if(element.calificacion == "1") {
                        div_resena.innerHTML = `<div class="star-rating" id="star-rating">
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_1" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="2">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_2" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                        <span class="star" data-value="3">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_3" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                        <span class="star" data-value="4">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_4" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                        <span class="star" data-value="5">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_5" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                      </div>`;
                    
                    } else if(element.calificacion == "4"){
                        div_resena.innerHTML = `<div class="star-rating" id="star-rating">
                        <span class="star" data-value="1">
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_1" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="2">
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_2" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="3">
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_3" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="4">
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_4" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="5">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_5" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                        </span>
                      </div>`;
                    } else if(element.calificacion == "2") {
                        div_resena.innerHTML = `<div class="star-rating" id="star-rating">
                        <span class="star" data-value="1">
                          
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_1" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="2">
                         
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_2" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="3">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_3" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                        <span class="star" data-value="4">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_4" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                        <span class="star" data-value="5">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_5" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                        </span>
                      </div>`;
                    }else if(element.calificacion == "3") {
                        div_resena.innerHTML = `<div class="star-rating" id="star-rating">
                        <span class="star" data-value="1">
                          
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_1" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="2">
                         
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_2" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="3">
                          
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_3" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="4">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_4" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                        <span class="star" data-value="5">
                          <svg xmlns="http://www.w3.org/2000/svg" id="estrella_vacia_5" class="icon icon-tabler icon-tabler-star" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                      
                          
                        </span>
                      </div>`;
                    } else {
                        div_resena.innerHTML = `<div class="star-rating" id="star-rating">
                        <span class="star" data-value="1">
                          
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_1" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="2">
                          
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_2" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="3">
                          
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_3" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="4">
                          
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_4" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                        <span class="star" data-value="5">
                          
                      
                          <svg xmlns="http://www.w3.org/2000/svg"  id="estrella_llena_5" class="icon icon-tabler icon-tabler-star-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                          </svg>
                        </span>
                      </div>`;
                    }
                    div_resena.appendChild(usuario);
                    div_resena.appendChild(opinion);
                    div_resenas.appendChild(div_resena);
                    div_producto.appendChild(div_resenas);
                }
               
            });
        });

        
        
    });
    
};

mostrarInfoPorducto();