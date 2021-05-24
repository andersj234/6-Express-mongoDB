const express = require("express");
const app = express()
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

let db;

MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error, client) {
      error ? console.log(error) : (db = client.db("series"));
    }
  );

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/api/series", function(req,res){
db.collection("series").find().toArray(function (error, datos) {
    error
      ? res.send({ error: true, contenido: error })
      : res.send({ error: false, contenido: datos });
  });
})
// no esta terminado me esta dando fallos por todos lados
app.get("/api/serie/", function(req,res){
    db.collection("series").find({titulo: req.query.titulo}).toArray(function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos });
      });
    })
app.listen(3000)