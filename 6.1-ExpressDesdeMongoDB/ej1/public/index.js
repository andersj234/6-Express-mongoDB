fetch("api/mesas")
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (datos) {
      let parrafo =""
      for (let i = 0; i < datos.contenido.length; i++) {
          parrafo +=`<p>Tamaño: ${datos.contenido[i].tamanio}</p>`
          
      }
  });
