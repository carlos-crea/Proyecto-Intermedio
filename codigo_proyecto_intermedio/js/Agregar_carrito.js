const articulos = document.querySelector(".articulos");
const total_pagar = document.querySelector(".total_pagar");
const btn_pagar = document.querySelector(".boton_pagar");
const cupon_cliente = document.querySelector(".input_cupon");
const boton_verificar_cupon = document.querySelector(".btn_canjear_cupon");
const tarjeta_exito = document.querySelector(".tarjeta-exito");
const btn_ok = document.querySelector("#btn-ok");

//Guardamos las ventas en la BD  de ventas para poder usarlas despues
const guardarVentas = (categoria,cantidad,total,id) => {
    return fetch(`http://localhost:3000/ventas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {categoria, cantidad, total} ),
    }).then( (respuesta) => {
        return respuesta;
    });
};

//Cargamos las ventas
const cargarVentas = () => {
    return fetch("http://localhost:3000/ventas").then( (respuesta) => {
        return respuesta.json();
    });
};

//Estamos cargando los productos que se encuentran en el carrito en la DB
const listaProductos = () => {
    return fetch("http://localhost:3000/carrito").then( (respuesta) => {
        return respuesta.json();
    });
};

//Estamos cargando los cupones de la DB
const listaCupones = () => {
    return fetch("http://localhost:3000/cupones").then( (respuesta) => {
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

//Creamos la lineas donde mostramos toda la info del producto en el carrito
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
        window.location.href = "carrito.html";
    });

    btn_menos.addEventListener("click", ()=>{
        if(cantidad != 1) {
            actualizarProducto(nombre, nombre_foto, precio, categoria, (cantidad-1), id);
            window.location.href = "carrito.html";
        }
    });

    boton_eliminar.addEventListener("click", ()=>{
        borrarPorducto(id);
        tarjeta_exito.style.display = "block";
    });

    btn_ok.addEventListener("click", () => {
        window.location.href = "carrito.html?id=" + id;
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

    //Aquie estamos aplicando el descuento de un cupon si es que existe y actualizando el valor a pagar
    boton_verificar_cupon.addEventListener("click", ()=> {
        listaCupones().then( (cupones) =>{
            let verdad = true;
            for(let i = 0; i < cupones.length; i++) {
                if(cupones[i].id == cupon_cliente.value) {
                    const descuento = (total * cupones[i].descuento) / 100;
                    total = total - descuento;
                    total_pagar.innerText = "$" + total;
                    verdad = true;
                    break;
                } else {
                    verdad = false;
                }
            }

            if(verdad == false) {
                window.alert("Lo sentimos pero ese cupón ya no es valido o no es correto, por favor verifique que sea correcto");
            }
        });
    })
});

btn_pagar.addEventListener("click", ()=>{
        let total_ventasG = 0;
        let total_cantidadG = 0;
        let total_ventasB = 0;
        let total_cantidadB = 0;
        let total_ventasA = 0;
        let total_cantidadA = 0;
        let total_ventasAc = 0;
        let total_cantidadAc = 0;
        listaProductos().then( (data) =>{
            data.forEach(element => {
                //borrarPorducto(element.id);
                if(element.categoria == "guitarras") {
                    total_ventasG = total_ventasG + (Number(element.precio) * element.cantidad);
                    total_cantidadG = total_cantidadG + element.cantidad; 
                }

                if(element.categoria == "bajos") {
                    total_ventasB = total_ventasB + (Number(element.precio) * element.cantidad);
                    total_cantidadB = total_cantidadB + element.cantidad; 
                }

                if(element.categoria == "amplificadores") {
                    total_ventasA = total_ventasA + (Number(element.precio) * element.cantidad);
                    total_cantidadA = total_cantidadA + element.cantidad; 
                }

                if(element.categoria == "accesorioss") {
                    total_ventasAc = total_ventasAc + (Number(element.precio) * element.cantidad);
                    total_cantidadAc = total_cantidadAc + element.cantidad; 
                }
                
            });
        });

        cargarVentas().then( (data) =>{
            data.forEach(element => {
                if(element.categoria == "guitarras") {
                    guardarVentas("guitarras", total_cantidadG + element.cantidad, total_ventasG + element.total, "guitars");
                }

                if(element.categoria == "bajos") {
                    guardarVentas("bajos", total_cantidadB + element.cantidad, total_ventasB + element.total, "bass");
                }

                if(element.categoria == "amplificadores") {
                    guardarVentas("amplificadores", total_cantidadA + element.cantidad, total_ventasA + element.total, "amplis");
                }

                if(element.categoria == "accesorios") {
                    guardarVentas("accesorios", total_cantidadAc + element.cantidad, total_ventasAc + element.total, "accesories");
                }
            });

            

        });
        
        listaProductos().then( (data) => {
            data.forEach(element => {
                borrarPorducto(element.id);
                window.location.href = "index.html";
            });
        }) 
        
});
