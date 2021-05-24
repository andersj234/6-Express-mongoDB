const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

MongoClient.connect(
  "mongodb://127.0.0.1:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    error ? console.log(err) : (db = client.db("libros"));
  }
);

app.get("/api/libros", function(req,res){
    db.collection("libros").find().toArray(function(error, datos){
        if(error !== null){
            res.send({error: true, contenido: error})
        }else{
            res.send({error: false, contenido :datos})
        }
    })
})
app.get("/api/libro/:titulo", function(req,res){
  db.collection("libros").find({titulo: {$regex: `${req.params.titulo}`}}).toArray(function(error, datos){
    if(error !== null){
      res.send({error :true, contenido: error})
    }else{
      res.send({error: false, contenido: datos})
    }
  })
});

app.post("/api/nuevoLibro/:titulo", function(req,res){
  db.collection("libros").insertOne({titulo :req.params.titulo, estado: "leido"}, function(error,datos){
    error
    ? res.send({error : true, contenido:error})
    : res.send({error : false, contenido:datos})
  })
})

app.put("/api/editarLibro/:titulo", function(req,res){
  db.collection("libros").updateOne({titulo: req.params.titulo}, {$set:{estado: "sin leer"}}, function(error, datos){
    error
    ? res.send({error : true, contenido:error})
    : res.send({error : false, contenido:datos});
  })
})
app.listen(3001); 
