const btn_submit = document.querySelector(".fomulario_contacto");
const tarjeta_exito = document.querySelector(".tarjeta-exito");
const btn_ok = document.querySelector("#btn-ok");

btn_submit.addEventListener("submit", (event) =>{
    event.preventDefault();
    tarjeta_exito.style.display = "block";
});

btn_ok.addEventListener("click", () => {
    window.location.href = "contacto.html";
});