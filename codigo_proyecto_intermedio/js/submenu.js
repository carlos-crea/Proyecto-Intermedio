const submenu = document.querySelector(".submenu");
const id_subMenu = document.querySelector("#sub_menu");
const barras = document.querySelector(".barra");
const icono_menu = document.querySelector(".icon-menu");
const icono_menu2 = document.querySelector(".icon-menu2");

id_subMenu.addEventListener("mouseover", ()=>{
    submenu.style.display = "flex";
    submenu.style.flexDirection = "column";
    submenu.style.alignItems = "center"
    submenu.style.position = "absolute";
    submenu.style.backgroundColor = "#363062";
    id_subMenu.style.backgroundColor = "#363062";
});

submenu.addEventListener("mouseover", ()=> {
    submenu.style.display = "flex";
    id_subMenu.style.backgroundColor = "#363062";
});

submenu.addEventListener("mouseout", ()=> {
    submenu.style.display = "none";
    id_subMenu.style.backgroundColor = "#363062";
});


//Esta seccion la usaremos para cuando el dispositivo es un telefono y no quremos mostrar
// la barra de navergacion hasta que el lo solicite
icono_menu.addEventListener("click", () => {
    barras.classList.toggle("amburguesa");
})