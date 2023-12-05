const url = new URL(window.location);
const id = url.searchParams.get("id");
const user = url.searchParams.get("user");
const btn_enviar_resena = document.querySelector(".btn_guardar_resena");
let calificacion = "0";

//Agregamos la resena
const crearResena = (usuario,opinion,calificacion,id_lira) => {
    return fetch("http://localhost:3000/resenas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, opinion, calificacion, id_guitarra , id: uuid.v4()}),
    });
};

const estrella_vacia1 = document.querySelector("#estrella_vacia_1");
const estrella_rellena1 = document.querySelector("#estrella_llena_1");

const estrella_vacia2 = document.querySelector("#estrella_vacia_2");
const estrella_rellena2 = document.querySelector("#estrella_llena_2");

const estrella_vacia3 = document.querySelector("#estrella_vacia_3");
const estrella_rellena3 = document.querySelector("#estrella_llena_3");

const estrella_vacia4 = document.querySelector("#estrella_vacia_4");
const estrella_rellena4 = document.querySelector("#estrella_llena_4");

const estrella_vacia5 = document.querySelector("#estrella_vacia_5");
const estrella_rellena5 = document.querySelector("#estrella_llena_5");


estrella_vacia1.addEventListener("click", ()=>{
    estrella_vacia1.style.display = "none";
    estrella_rellena1.style.display = "block";
    calificacion = "1";
});

estrella_vacia2.addEventListener("click", ()=>{
    estrella_vacia1.style.display = "none";
    estrella_vacia2.style.display = "none";
    estrella_rellena1.style.display = "block";
    estrella_rellena2.style.display = "block";
    calificacion = "2";
});

estrella_vacia3.addEventListener("click", ()=>{
    estrella_vacia1.style.display = "none";
    estrella_vacia2.style.display = "none";
    estrella_vacia3.style.display = "none";
    estrella_rellena1.style.display = "block";
    estrella_rellena2.style.display = "block";
    estrella_rellena3.style.display = "block";
    calificacion = "3";
});

estrella_vacia4.addEventListener("click", ()=>{
    estrella_vacia1.style.display = "none";
    estrella_vacia2.style.display = "none";
    estrella_vacia3.style.display = "none";
    estrella_vacia4.style.display = "none";
    estrella_rellena1.style.display = "block";
    estrella_rellena2.style.display = "block";
    estrella_rellena3.style.display = "block";
    estrella_rellena4.style.display = "block";
    calificacion = "4";
});

estrella_vacia5.addEventListener("click", ()=>{
    estrella_vacia1.style.display = "none";
    estrella_vacia2.style.display = "none";
    estrella_vacia3.style.display = "none";
    estrella_vacia4.style.display = "none";
    estrella_vacia5.style.display = "none";
    estrella_rellena1.style.display = "block";
    estrella_rellena2.style.display = "block";
    estrella_rellena3.style.display = "block";
    estrella_rellena4.style.display = "block";
    estrella_rellena5.style.display = "block";
    calificacion = "5";
});


estrella_rellena1.addEventListener("click", ()=>{
    estrella_rellena2.style.display = "none";
    estrella_rellena3.style.display = "none";
    estrella_rellena4.style.display = "none";
    estrella_rellena5.style.display = "none";
    estrella_vacia2.style.display = "block";
    estrella_vacia3.style.display = "block";
    estrella_vacia4.style.display = "block";
    estrella_vacia5.style.display = "block";
    calificacion = "1";
});

estrella_rellena2.addEventListener("click", ()=>{
    
    estrella_rellena3.style.display = "none";
    estrella_rellena4.style.display = "none";
    estrella_rellena5.style.display = "none";
    estrella_vacia3.style.display = "block";
    estrella_vacia4.style.display = "block";
    estrella_vacia5.style.display = "block";
    calificacion = "2";
});

estrella_rellena3.addEventListener("click", ()=>{
    
    estrella_rellena4.style.display = "none";
    estrella_rellena5.style.display = "none";
    estrella_vacia4.style.display = "block";
    estrella_vacia5.style.display = "block";
    calificacion = "3";
});

estrella_rellena4.addEventListener("click", ()=>{
    estrella_rellena5.style.display = "none";
    estrella_vacia5.style.display = "block";
    calificacion = "4";
});

estrella_rellena5.addEventListener("click", ()=>{
    calificacion = "5";
});

btn_enviar_resena.addEventListener("click", ()=> {
    const textarea = document.querySelector("#oppinion");
    //console.log("opinion: " + textarea.value);
    //console.log("Calificación: " + calificacion);
    if(user != "null" && user != null) {
        crearResena(user, textarea.value, calificacion, id);
        console.log(id);
        window.history.back();
    } else {
        window.alert("Ncesitas iniciar sesión para realizar una opinión");
        window.history.back();
    }
    
})