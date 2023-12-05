const empleados = document.querySelector(".empleados");

//Leer todos los empleados de la base de datos
const leerEmpleados = () => {
    return fetch("http://localhost:3000/empleados").then( (respuesta) => {
        return respuesta.json();
    });
};

//Eliminamos el empleado de la BD
const borrarEmpleado = (id) => {
    return fetch(`http://localhost:3000/empleados/${id}` , {
        method: "DELETE",
    });
};

const mostrarEmpleados = (nombre_foto,nombre, horaEntrada, horaSalida, dias, cargo, id) => {
    const div_empleado = document.createElement("div");
    div_empleado.classList.add("empleado");
    const boton_editar = document.createElement("button");
    boton_editar.innerText = "Editar";
    boton_editar.classList.add("btn_editar");
    boton_editar.setAttribute("id", id);
    const boton_eliminar = document.createElement("button");
    boton_eliminar.innerText = "Eliminar";
    boton_eliminar.classList.add("btn_eliminar");
    boton_eliminar.setAttribute("id", id);
    const linea = `<img src="${nombre_foto}" alt="imagen_empleado" class="imagen_empleado">
    <p class="nombre">${nombre}</p>
    <p class="cargo">${cargo}</p>
    <p class="entrada">Hora de entrada: ${horaEntrada}</p>
    <p class="salida">Hora de salida: ${horaSalida}</p>
    <p class="_titulodias">Días de trabajo</p>
    <p class="dias">${dias}</p>`;
    div_empleado.innerHTML = linea;
    const div_botones = document.createElement("div");
    div_botones.classList.add("div_botones");
    div_botones.appendChild(boton_editar);
    div_botones.appendChild(boton_eliminar);
    div_empleado.appendChild(div_botones);
    empleados.appendChild(div_empleado);

    boton_editar.addEventListener("click", ()=>{
        window.location.href = "editar_empleado.html?id=" + id;
        //crearProducto(nombre, nombre_foto, precio, categoria, id);
        //tarjeta_exito.style.display = "block";
    });

    boton_eliminar.addEventListener("click", () => {
        borrarEmpleado(id);
    });

};

leerEmpleados().then( (data) => {
    data.forEach(element => {
        mostrarEmpleados(element.imagenUrl,element.nombre, element.horaEntrada, element.horaSalida, element.dias, element.puesto, element.id);
    });
});