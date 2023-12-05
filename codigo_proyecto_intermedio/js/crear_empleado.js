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


//Agregamos al empleado a la DB
const crearEmpleado = (nombre,imagenUrl,horaEntrada,horaSalida,dias,puesto) => {
    return fetch("http://localhost:3000/empleados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, imagenUrl, horaEntrada, horaSalida, dias, puesto, id: uuid.v4()}),
    });
};

formulario.addEventListener("submit", (event) => {
    //event.preventDefault();
    let cadena_dias = "";
    let cadena_entrada = "";
    let cadena_salida = "";
    if(lunes.checked) {
        console.log(lunes.value);
        cadena_dias += lunes.value + ",";
    }

    if(martes.checked) {
        console.log(martes.value);
        cadena_dias += martes.value + ",";
    }

    if(miercoles.checked) {
        console.log(miercoles.value);
        cadena_dias += miercoles.value + ",";
    }

    if(jueves.checked) {
        console.log(jueves.value);
        cadena_dias += jueves.value + ",";
    }

    if(viernes.checked) {
        console.log(viernes.value);
        cadena_dias += viernes.value + ",";
    }

    if(sabado.checked) {
        console.log(sabado.value);
        cadena_dias += sabado.value + ",";
    }

    if(h_entrada.value < 12) {
        cadena_entrada += h_entrada.value.toString() + " a.m";
    } else {
        cadena_entrada += h_entrada.value.toString() + " p.m";
    }

    cadena_salida = h_salida.value.toString() + " p.m";

    crearEmpleado(nombre.value, imagen.value, cadena_entrada, cadena_salida, cadena_dias.slice(0, cadena_dias.length - 1), cargo.value);
})