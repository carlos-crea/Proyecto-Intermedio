const url = new URL(window.location);
const usuario = url.searchParams.get("user");
const btn = document.querySelector("#btn_actualizar_datos");
const nombre_usuario = document.querySelector(".titulo_usuario");
const login = document.querySelector("#login");
const inicio =document.querySelector("#inicio");

inicio.addEventListener("click", (evento) => {
    evento.preventDefault();
    window.location.href = "index.html?user=" + usuario;
});

if(usuario != null && usuario != "null") {
    nombre_usuario.innerText = "Bienvenido " + usuario;
} else {
    nombre_usuario.innerText = "Bienvenido";
    login.style.display = "block";
}

const cargarInfoUser = () => {
    return fetch(`http://localhost:3000/usuarios`).then( (respuesta) => {
        return respuesta.json();
    });
};



btn.addEventListener("click", (evento)=>{
    evento.preventDefault();
    cargarInfoUser().then( (userx) => {
        for(let i = 0; i < userx.length; i++) {
            if(userx[i].userName == usuario) {
                window.location.href = "actualizar_usuario.html?user=" + usuario + "&id=" + userx[i].id;
                break; 
            } 
        }
    });
})
