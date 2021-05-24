function mostrarLibros() {
  fetch("/api/libros")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        document.getElementById(
          "feedback"
        ).innerHTML = `<h3>ha ocurrido un error</h3>`;
      } else {
        imprimir(datos);
      }
    });
}
function leido(){
    let libroLeido = document.getElementById("libroLeido").value

    fetch(`/api/editarLibro/${libroLeido}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }).then(function(respuesta){
          return respuesta.json()
      }).then(function(datos){
          if(datos.error){ //podemos hacer que si datos.contenido.result.nModified > 0 marcaremos que un libro se ha modificado si no que no se haya modificado ninguno
              document.getElementById("feedback3").innerHTML =`<h3> ha surgido un fallo</h3>`
          }else{
              document.getElementById("feedback3").innerHTML =`<h3>se ha cambiado correctamente ${datos.contenido.result.nModified} libros</h3>`
              mostrarLibros()
          }
      })
}
function mostrarTitulo(datos) {
  let libroSolicitado = document.getElementById("libroSolicitado").value;

  fetch(`/api/libro/${libroSolicitado}`)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        document.getElementById(
          "feedback2"
        ).innerHTML = `<h2>Ha surgido un error</h2>`;
      } else {
        imprimir(datos);
      }
    });
}

function anyadirLibro() {
    let libro = document.getElementById("libro").value // no se porque no me deja meter el document.getelementbyid("").value dentro del fetch pero si lo meto en una variable si
  fetch(`/api/nuevoLibro/${libro}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        document.getElementById(
          "feedback2"
        ).innerHTML = `<h3>ha ocurrido un error</h3>`;
      } else {
        document.getElementById(
          "feedback2"
        ).innerHTML = `<h3>ha añadido un libro ${datos.contenido.ops[0].titulo}</h3>`;
        mostrarLibros();
      }
    });
}

function imprimir(datos) {
  let parrafo = "";
  console.log(datos);
  for (let i = 0; i < datos.contenido.length; i++) {
    parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${
      datos.contenido[i].estado ? "leido" : "sin leer"
    }</td></tr>`;
  }
  document.getElementById(
    "contenido"
  ).innerHTML = `<table><th>titulo:</th><th>Estado:</th>${parrafo}</table>`;
}

function imprimir(datos) {
    let parrafo = "";
    console.log(datos);
    for (let i = 0; i < datos.contenido.length; i++) {
      parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${
        datos.contenido[i].estado ? "leido" : "sin leer"
      }</td></tr>`;
    }
    document.getElementById(
      "contenido"
    ).innerHTML = `<table><th>titulo:</th><th>Estado:</th>${parrafo}</table>`;
  }
  
