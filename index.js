const express = require("express")
const app = express()
app.listen(8081, function(){
    console.log("Conectado com sucesso!")
})
const Sequelize = require("sequelize")
const sequelize = new Sequelize("medidas", "root", "",{
    host: "localhost",
    dialect: "mysql"
})
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha ao conectar: " + erro)
})
const Sensor = sequelize.define("sensors",{
    temperatura:{
        type: Sequelize.INTEGER
    },
    umidade:{
        type: Sequelize.INTEGER
    }
})
// Sensor.sync({force: true})

app.get("/",function(req, res){
    res.send("Projeto Esp")
})
app.get("/cadastrar/:itemA/:itemB",function(req, res){
    Sensor.create({
        temperatura: req.params.itemA,
        umidade: req.params.itemB,
    }).then(function(){
        console.log("Cadastrado com sucesso!")
    }).catch(function(erro){
        console.log("Falha ao cadastrar os dados: " + erro)
    })
    res.redirect("/")
})