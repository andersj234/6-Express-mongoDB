let formulario = document.getElementById("formulario");

/*formulario.addEventListener("submit", function(e){
    e.preventDefault() //con esto hariamos que en la url si no se ha metido ningun campo que no aparezca
    

    let datos = new FormData(formulario)

    console.log(datos.get("serie"))
})*/

mostrar()
function mostrar(){
    fetch("/api/series").then(function (respuesta){
        return respuesta.json()
    }).then(function (datos){
        if(datos.error){
            document.getElementById("feedback").innerHTML ="<h2>Ha surgido un problema</h2>"
        }else{
            imprimir(datos)
        }
    })
}
function mostrarSerie(){
    let titulo =req.query.titulo
    fetch(`/api/serie/${titulo}`).then(function(respuesta){
        return respuesta.json()
    }).then(function(datos){
            if (datos.error) {
                document.getElementById("feedback").innerHTML = "ERROR!!!";
              } else {
                  let parrafo =""
                for (let i = 0; i < datos.contenido.length; i++) {
                  parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${datos.contenido[i].puntuacion}</td><td>${datos.contenido[i].plataforma}</td></tr>`;
                }
                document.getElementById(
                  "contenido"
                ).innerHTML = `<table><th>Título</th><th>Nota</th><th>Plataforma</th>${parrafo}</table>`;
              }
    })


function imprimir(datos){
    let parrafo=""
   
            for (let i = 0; i < datos.contenido.length; i++) {
                parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${datos.contenido[i].puntuacion}</td></tr>` //acuerdate que en la base de datos tienes que poner tambien de que plataforma es
                
            }
            document.getElementById("contenido").innerHTML =`<table><th>titulo:</th><th>puntuación:</th>${parrafo}</table>`
        }
}