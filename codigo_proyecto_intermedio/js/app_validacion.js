import { valida } from "./validacion.js";
import { agregaUser } from "./agregar_usuario.js";

const inputs = document.querySelectorAll("input");
const btn_enviar = document.querySelector(".formulario_registro");
const tarjeta_exito = document.querySelector(".tarjeta-exito");
const btn_ok = document.querySelector("#btn-ok");
const tarjeta_exito2 = document.querySelector(".tarjeta-exito2");
const btn_ok2 = document.querySelector("#btn-ok2");

inputs.forEach( (input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

const cargarUsuarios = () => {
    return fetch("http://localhost:3000/usuarios").then( (respuesta) => {
        return respuesta.json();
    });
};

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
            agregaUser(nombreUsuario,
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
                fechaExpiracion);

                tarjeta_exito.style.display = "block";
                btn_ok.addEventListener("click", () => {
                    tarjeta_exito.style.display = "none";
                });
                window.location.href = "index.html?user=" + nombreDeUsuario;
        } else {
                tarjeta_exito2.style.display = "block";
                btn_ok2.addEventListener("click", () => {
                    tarjeta_exito2.style.display = "none";
                });
        }

    });

    

    
});