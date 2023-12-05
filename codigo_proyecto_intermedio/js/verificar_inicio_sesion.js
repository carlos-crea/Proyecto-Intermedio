const nombreDeUsuario = document.querySelector("#user");
const contrasena = document.querySelector("#pasword");
const boton = document.querySelector(".btn_prueba");
const tarjeta_exito = document.querySelector(".tarjeta-exito");
const btn_ok = document.querySelector("#btn-ok");


const datosUsuarios = () => {
    return fetch("http://localhost:3000/usuarios").then( (respuesta) => {
        return respuesta.json();
    });
};

//David64git

boton.addEventListener("click", ()=>{
    
    datosUsuarios().then( (data) => {
        let verdad = true;
        for(let i = 0; i < data.length; i++) {
            if(data[i].userName == nombreDeUsuario.value && CryptoJS.AES.decrypt(data[i].password,contrasena.value).toString(CryptoJS.enc.Utf8) == contrasena.value) {
                console.log("Inicio de sesion exitoso");
                verdad = true;
                window.location.href = `index.html?user=${data[i].userName}`;
                break;
            } else {
                verdad = false;
            }
        }

        if(verdad == false) {
            tarjeta_exito.style.display = "block";
            btn_ok.addEventListener("click", () => {
                tarjeta_exito.style.display = "none";
            });
        }
    });
});