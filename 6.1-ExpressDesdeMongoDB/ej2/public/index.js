lista()
function lista(){
    fetch("/api/mesas").then(function(respuesta){
        return respuesta.json()
    }).then(function (datos){
        let parrafo =""
        for (let i = 0; i < datos.length; i++) {
            parrafo += `<tr><td>${datos[i].tamanio}</td><td>${datos[i].color}</td><td>${datos[i].material}</td><td>${datos[i].patas}</td></tr>`
            
        }
        document.getElementById("resultado").innerHTML =`<table>${parrafo}</table>`
    })
}



function agregarMesas(){
    let tamanio = document.getElementById("tamaño").value
    let color = document.getElementById("color").value
    let material = document.getElementById("material").value
    let patas = document.getElementById("patas").value

    let paqueteMesas= {
        tamanio,
        color,
        material,
        patas,
    }
    fetch("/api/anyadir",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(paqueteMesas)
    }).then(function(respuesta){
        return respuesta.json()
    }).then(function(datos){
        lista()
    })
}