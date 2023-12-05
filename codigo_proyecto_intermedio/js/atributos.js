const url_usuario = new URL(window.location);
const usuario = url_usuario.searchParams.get("user");
const enlaces_pagina = document.querySelectorAll(".enlace");
const enlaces_secciones = document.querySelectorAll(".enlace_titulo_seccion");
const enlaces_submenu = document.querySelectorAll(".enlace_submenu");

enlaces_submenu.forEach(enlace_sub => {
    const contenido = enlace_sub.getAttribute("href");
    enlace_sub.href = contenido + "?user=" + usuario;
});

enlaces_secciones.forEach(seccion => {
    if(usuario != "null" && usuario != null) {
        const contenido = seccion.getAttribute("href");
        seccion.href = contenido + "?user=" + usuario;
    }
});

enlaces_pagina.forEach(enlace => {
    if(usuario != "null" && usuario != null) {
        const contenido = enlace.getAttribute("href");
        enlace.href = contenido + "?user=" + usuario;
    }
});