const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let db;

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    error ? console.log(error) : (db = client.db("restaurante"));
  }
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/menus", function (req, res) {
  db.collection("restaurante")
    .find()
    .toArray(function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    });
});

app.post("/api/nuevoMenu", function (req, res) {
  let menu = {
    numeroDeMenu: req.body.numeroDeMenu,
    primerPlato: req.body.primerPlato,
    postre: req.body.postre,
    segundoPlato: req.body.segundoPlato,
    precio: req.body.precio,
  };
  db.collection("restaurante").insertOne(
    {
      numeroDeMenu: parseInt(req.body.numeroDeMenu),
      primerPlato: req.body.primerPlato,
      postre: req.body.postre,
      segundoPlato: req.body.segundoPlato,
      precio: parseInt(req.body.precio),
    },
    function (error, datos) {
      if (error !== null) {
        res.send({ error: true, contenido: error });
      } else {
        res.send({ error: false, contenido: datos });
      }
    }
  );
});

app.put("/api/editorMenu", function (req, res) {
  let menu = {
    numeroDeMenu: req.body.numeroDeMenu,
    primerPlato: req.body.primerPlato,
    postre: req.body.postre,
    segundoPlato: req.body.segundoPlato,
    precio: req.body.precio,
  };
  db.collection("restaurante").updateOne(
    { numeroDeMenu: req.body.numeroDeMenu },
    {
      $set: {
        primerPlato: req.body.primerPlato,
        postre: req.body.postre,
        segundoPlato: req.body.segundoPlato,
        precio: req.body.precio,
      },
    }, //no esta bien me falta algo
    function (error, datos) {
      if (error !== null) {
      
        res.send({ error: true, contenido: error });
      } else {
        res.send({ error: false, contenido: datos });
      }
    }
  );
});
 //nose no me esta funcionando nada
app.delete("/api/borrarMenu", function (req, res) {
  db.collection("restaurante").delete({ numeroDeMenu: req.body.numeroDeMenu }, function(error, datos){
    if (error !== null) {
      console.log(error);
      res.send({ error: true, contenido: error });
    } else {
      res.send({ error: false, contenido: datos });
    }
  });
});
app.listen(3001);
