const formulario = document.querySelector("#form_nuevo_empleado");
const imagen = document.querySelector("#imagen");
const nombre = document.querySelector("#nombre");
const h_entrada = document.querySelector("#h_entrada");
const h_salida = document.querySelector("#h_salida");
const cargo = document.querySelector("#cargo");
//dias input tipe radio
const lunes = document.querySelector("#lunes");
const martes = document.querySelector("#martes");
const miercoles = document.querySelector("#miercoles");
const jueves = document.querySelector("#jueves");
const viernes = document.querySelector("#viernes");
const sabado = document.querySelector("#sabado");

//Leer el empleado de la base de datos
const leerEmpleado = (id) => {
    return fetch(`http://localhost:3000/empleados/${id}`).then( (respuesta) => {
        return respuesta.json();
    });
};


//Agregamos al empleado a la DB
const crearEmpleado = (nombre,imagenUrl,horaEntrada,horaSalida,dias,puesto, id) => {
    return fetch(`http://localhost:3000/empleados/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( { nombre,imagenUrl,horaEntrada,horaSalida,dias,puesto } ),
    }).then( (respuesta) => {
        return respuesta;
    });
};


const url = new URL(window.location);
const id = url.searchParams.get("id");

leerEmpleado(id).then( (datos) => {
    imagen.value = datos.imagenUrl;
    nombre.value = datos.nombre;
    h_entrada.value = Number(datos.horaEntrada.slice(0,2));
    h_salida.value = Number(datos.horaSalida.slice(0,2));
    cargo.value = datos.puesto;

    if(datos.dias.includes("LUNES")){
        lunes.checked = true;
    }

    if(datos.dias.includes("MARTES")){
        martes.checked = true;
    }

    if(datos.dias.includes("MIERCOLES")){
        miercoles.checked = true;
    }

    if(datos.dias.includes("JUEVES")){
        jueves.checked = true;
    }

    if(datos.dias.includes("VIERNES")){
        viernes.checked = true;
    }

    if(datos.dias.includes("SABADO")){
        lunes.checked = true;
    }

    formulario.addEventListener("submit", (event) => {
        //event.preventDefault();
        let cadena_dias = datos.dias + ",";
        let cadena_entrada = "";
        let cadena_salida = "";
        if(lunes.checked && !cadena_dias.includes("LUNES")) {
            console.log(lunes.value);
            cadena_dias += lunes.value + ",";
        }
    
        if(martes.checked && !datos.dias.includes("MARTES")) {
            console.log(martes.value);
            cadena_dias += martes.value + ",";
        }
    
        if(miercoles.checked && !datos.dias.includes("MIERCOLES")) {
            console.log(miercoles.value);
            cadena_dias += miercoles.value + ",";
        }
    
        if(jueves.checked && !datos.dias.includes("JUEVES")) {
            console.log(jueves.value);
            cadena_dias += jueves.value + ",";
        }
    
        if(viernes.checked && !datos.dias.includes("VIERNES")) {
            console.log(viernes.value);
            cadena_dias += viernes.value + ",";
        }
    
        if(sabado.checked && !datos.dias.includes("SABADO")) {
            console.log(sabado.value);
            cadena_dias += sabado.value + ",";
        }
    
        if(h_entrada.value < 12) {
            cadena_entrada += h_entrada.value.toString() + " a.m";
        } else {
            cadena_entrada += h_entrada.value.toString() + " p.m";
        }
    
        cadena_salida = h_salida.value.toString() + " p.m";
    
        crearEmpleado(nombre.value, imagen.value, cadena_entrada, cadena_salida, cadena_dias.slice(0, cadena_dias.length - 1), cargo.value, id);
    })
});