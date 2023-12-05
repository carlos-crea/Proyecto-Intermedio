const input_barra = document.querySelector("#input_barra");
const productos_encontrados = document.querySelector(".productos_encontrados");
const barra = document.querySelector(".barra_busqueda");
const icono_lupa = document.querySelector(".icon-tabler-search");

input_barra.addEventListener("blur", () => {
    let cupcakes = Array.prototype.slice.call(document.getElementsByClassName("enlace_producto_e"), 0);
  
    for(element of cupcakes){
        console.log(element);
        element.remove();
    }  
    productos_encontrados.style.display = "none";
});

const crearProductoE = (imagen, nombre, id) => {
    const enlace = document.createElement("a");
    enlace.classList.add("enlace_producto_e");
    enlace.innerHTML = `<img src="img/${imagen}" class="imagen_producto_e" alt="imagen_producto">
    <p>${nombre}</p>`;
    enlace.href = "producto.html?id=" + id;
    productos_encontrados.appendChild(enlace);
}

const inventarioProductos = () => {
    return fetch("http://localhost:3000/productos").then( (respuesta) => {
        return respuesta.json();
    });
};

inventarioProductos().then( (data) => {
    //input_barra.addEventListener("keypress", ()=>{
    //    console.log("Producto encontrado y su id es: ");
    //    for(let i = 0; i < data.length; i++) {
    //        if(data[i].nombre == input_barra.value) {
    //            console.log("Producto encontrado y su id es: " + data[i].id);
    //            productos_encontrados.style.display = "block";
    //            crearProductoE(data[i].imagenUrl, data[i].nombre, data[i].id);
    //            break;
    //        }else if(input_barra.value.toLowerCase().includes("guitarra") || input_barra.value.toLowerCase().includes("guitarras")) {
    //            if(data[i].categoria == "guitarras") {
    //                productos_encontrados.style.display = "block";
    //                crearProductoE(data[i].imagenUrl, data[i].nombre, data[i].id);
    //            }
    //        }     
    //    }
    //});

    icono_lupa.addEventListener("click", () => {
        let verdad = false;
        for(let index = 0; index < data.length; index++) {
            if(data[index].nombre == input_barra.value) {
                console.log("Producto encontrado y su id es: " + data[index].id);
                productos_encontrados.style.display = "block";
                crearProductoE(data[index].imagenUrl, data[index].nombre, data[index].id);
                verdad = true;
                break;
            }
        }

        if(verdad == false) {
            for(let i = 0; i < data.length; i++) {
                if(input_barra.value.toLowerCase().includes("guitarra") || input_barra.value.toLowerCase().includes("guitarras")) {
                    if(data[i].categoria == "guitarras") {
                        productos_encontrados.style.display = "block";
                        crearProductoE(data[i].imagenUrl, data[i].nombre, data[i].id);
                    }
                }else if(input_barra.value.toLowerCase().includes("bajo") || input_barra.value.toLowerCase().includes("bajos")) {
                    if(data[i].categoria == "bajos") {
                        productos_encontrados.style.display = "block";
                        crearProductoE(data[i].imagenUrl, data[i].nombre, data[i].id);
                    }
                }else if(input_barra.value.toLowerCase().includes("amplificador") || input_barra.value.toLowerCase().includes("amplificadores")) {
                    if(data[i].categoria == "amplificadores") {
                        productos_encontrados.style.display = "block";
                        crearProductoE(data[i].imagenUrl, data[i].nombre, data[i].id);
                    }
                }else if(input_barra.value.toLowerCase().includes("accesorio") || input_barra.value.toLowerCase().includes("accesorios")) {
                    if(data[i].categoria == "accesorios") {
                        productos_encontrados.style.display = "block";
                        crearProductoE(data[i].imagenUrl, data[i].nombre, data[i].id);
                    }
                } 
            }
        }
    });

} );

