
mostrar();
function mostrar() {
  fetch("/api/menus")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let parrafo = "";
      for (let i = 0; i < datos.contenido.length; i++) {
        parrafo += `<tr><td>${datos.contenido[i].numeroDeMenu}</td><td>${datos.contenido[i].primerPlato}</td><td>${datos.contenido[i].postre}</td><td>${datos.contenido[i].segundoPlato}</td><td>${datos.contenido[i].precio}</td></tr>`;
      }
      document.getElementById(
        "contenido"
      ).innerHTML = `<table><th>numero de menú:</th><th>primer plato:</th><th>postre:</th><th>segundo plato:</th><th>precio:</th>${parrafo}</table>`;
    });
}

function anyadir(){

    let menu= {
        numeroDeMenu: document.getElementById("menu").value,
        primerPlato: document.getElementById("primerPlato").value,
        postre: document.getElementById("postre").value,
        segundoPlato: document.getElementById("segundoPlato").value,
        precio: document.getElementById("precio").value,
    }
    fetch("/api/nuevoMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(menu),
      }).then(function(respuesta){
          return respuesta.json()
      }).then(function(datos){
          if(datos.error){
              document.getElementById("feedback").innerHTML =`<h3>Ha surgido un error</h3>`
          }else{
              mostrar()
          }
      })
}

function modificar(){
    let menu= {
        numeroDeMenu: document.getElementById("menu").value,
        primerPlato: document.getElementById("primerPlato").value,
        postre: document.getElementById("postre").value,
        segundoPlato: document.getElementById("segundoPlato").value,
        precio: document.getElementById("precio").value,
    }
    fetch("/api/nuevoMenu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(menu),
      }).then(function(respuesta){
          return respuesta.json()
      }).then(function(datos){
          if(datos.error){
              document.getElementById("feedback").innerHTML =`<h3>Ha surgido un error</h3>`
          }else{
              mostrar()
          }
      })
}

function borrar(){
  let menu= {
    numeroDeMenu: document.getElementById("menu").value,
    primerPlato: document.getElementById("primerPlato").value,
    postre: document.getElementById("postre").value,
    segundoPlato: document.getElementById("segundoPlato").value,
    precio: document.getElementById("precio").value,
}
fetch("/api/borrarMenu", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(menu),
  }).then(function(respuesta){
      return respuesta.json()
  }).then(function(datos){
      if(datos.error){
          document.getElementById("feedback").innerHTML =`<h3>Ha surgido un error</h3>`
      }else{
          document.getElementById("feedback2").innerHTML =`<h3>ha sido borrado correctamente</h3>`
          mostrar()
      }
  })
}