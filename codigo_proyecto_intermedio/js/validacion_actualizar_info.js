import { valida } from "./validacion.js";

const inputs = document.querySelectorAll("input");
const btn_enviar = document.querySelector(".formulario_registro");
const url = new URL(window.location);
const id = url.searchParams.get("id");

inputs.forEach( (input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

//Cargamos los usuarios para verificar que no exista el nombre de usuario en la base
const cargarUsuarios = () => {
    return fetch("http://localhost:3000/usuarios").then( (respuesta) => {
        return respuesta.json();
    });
};


//Info del usuario
const cargarUsuario = (id) => {
    return fetch(`http://localhost:3000/usuarios/${id}`).then( (respuesta) => {
        return respuesta.json();
    });
};


//Actualizamos la info del usuario
const actualizarUsuario = (nombre, apellidos, fechaNacimiento, telefono, userName, correo, password, direccion, ciudad, estado, cp, tipoTarjeta, numTarjeta, expiracionTarjeta, id) => {
    return fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {nombre, apellidos, fechaNacimiento, telefono, userName, correo, password, direccion, ciudad, estado, cp, tipoTarjeta, numTarjeta, expiracionTarjeta } ),
    }).then( (respuesta) => {
        return respuesta;
    });
};


function mostrarDatos(id) {
    const idp = id;
    const inputs = document.querySelectorAll("input");
    const lista_tipo_tarjetas = document.querySelector(".opciones_tarjeta");
    
    console.log(idp);
    cargarUsuario(idp).then(  (user) => {
        let verdad = false;
        inputs[0].value = user.nombre;
        inputs[1].value = user.apellidos;
        inputs[2].value = user.fechaNacimiento;
        inputs[3].value = user.telefono;
        inputs[4].value = user.userName;
        inputs[5].value = user.correo;
        while(verdad == false) {
            const contra = window.prompt("Ingresa tu contraseña", "");
            if(CryptoJS.AES.decrypt(user.password,contra).toString(CryptoJS.enc.Utf8) == contra) {
                verdad = true;
                inputs[6].value = contra;
            } else {
                window.alert("La contraseña es incorrecta vulve a intentarlo")
            }
        }
        inputs[7].value = user.direccion;
        inputs[8].value = user.ciudad;
        inputs[9].value = user.estado;
        inputs[10].value = user.cp;
        lista_tipo_tarjetas.value = user.tipoTarjeta;
        inputs[11].value = user.numTarjeta; 
        inputs[12].value = user.expiracionTarjeta; 
    })
    
};

mostrarDatos(id);

btn_enviar.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const inputs = document.querySelectorAll("input");
    const lista_tipo_tarjetas = document.querySelector(".opciones_tarjeta");
    const nombreUsuario = inputs[0].value;
    const apellidosUsuario = inputs[1].value;
    const nacimientoUsuario = inputs[2].value;
    const telefonoUsuario = inputs[3].value;
    const nombreDeUsuario = inputs[4].value;
    const correoUusuario = inputs[5].value;
    const contrasenaUsuario = inputs[6].value;
    const direccionCompleta = inputs[7].value;
    const ciudadUsuario = inputs[8].value;
    const estadoUsuario = inputs[9].value;
    const codigoPostalUser = inputs[10].value;
    const tipoTarjeta = lista_tipo_tarjetas.value;
    const numTarjeta = inputs[11].value;
    const fechaExpiracion = inputs[12].value;
    const contrasenaUsuario2 = CryptoJS.AES.encrypt(contrasenaUsuario,contrasenaUsuario);
    let existe = false;
    cargarUsuario(id).then( usuarios =>{
        if(usuarios.userName != nombreDeUsuario) {
            cargarUsuarios().then( (data) => {
                for(let i = 0; i < data.length; i++) {
                    if(data[i].userName == nombreDeUsuario) {
                        existe = true;
                        break;
                    } else {
                        existe = false;
                    }
                }
        
                if(existe == false) {
                    actualizarUsuario(nombreUsuario,
                        apellidosUsuario,
                        nacimientoUsuario,
                        telefonoUsuario,
                        nombreDeUsuario,
                        correoUusuario,
                        contrasenaUsuario2.toString(),
                        direccionCompleta,
                        ciudadUsuario,
                        estadoUsuario,
                        codigoPostalUser,
                        tipoTarjeta,
                        numTarjeta,
                        fechaExpiracion, 
                        id);
        
                        window.location.href = "index.html?user=" + nombreDeUsuario;
                } else {
                        window.alert("El nombre de usuario que deseas utilizar ya existe, necesitas usar otro");
                }
        
            });
        } else {
            actualizarUsuario(nombreUsuario,
                apellidosUsuario,
                nacimientoUsuario,
                telefonoUsuario,
                nombreDeUsuario,
                correoUusuario,
                contrasenaUsuario2.toString(),
                direccionCompleta,
                ciudadUsuario,
                estadoUsuario,
                codigoPostalUser,
                tipoTarjeta,
                numTarjeta,
                fechaExpiracion,
                id);

                window.location.href = "index.html?user=" + nombreDeUsuario;
        }
    });

    

    
});