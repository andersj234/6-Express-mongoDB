const express = require("express")
const app = express()
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let db;

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(express.json());


MongoClient.connect('mongodb://127.0.0.1:27017', function(err, client){
    /*if(err !== null){
        console.log(err)
    }else{
        db =client.db("tienda")
    }*/
    err
    ? console.log(err)
    : db =client.db("tienda")
})

app.get("/api/mesas", function(req, res){

    db.collection("mesas").find().toArray(function(err, datos){
        if(err !== null){
            res.send({err: true, datos:datos})
        }else{
            res.send({err: false, contenido :datos})
        }
    })
})  

app.post("api/anyadir", function(req,res){
    let paqueteMesas= {
        tamanio,
        color,
        material,
        patas,
    }
    db.collection("mesas").insertOne(paqueteMesas,function(err, datos){
        if(err !== null){
            res.send({err: true, mensaje :error})
        }else{
            res.send({err: false, mensaje :datos})
        }
    });
});
app.listen(3000)