const ctx = document.querySelector("#myChart");
const ctx2 = document.querySelector("#myChart2");
const categorias = ['guitarras', 'bajos', 'amplificadores', 'accesorios'];
let ventas = [];
let ganacias = [];

const listaVentas = () => {
    return fetch("http://localhost:3000/ventas").then( (respuesta) => {
        return respuesta.json();
    });
};

listaVentas().then( (datos) => {
    datos.forEach(registro => {
        ventas.push(registro.cantidad);
    });

    datos.forEach(registro => {
        ganacias.push(registro.total);
    });
});

const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: categorias,
        datasets: [{
            label: 'categoria',
            data: ganacias,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1.5
        }]
    }
});


const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categorias,
        datasets: [{
            label: 'categoria',
            data: ventas,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1.5
        }]
    }
});
