import express from 'express';
import admin from 'firebase-admin';

const express = require("express");
const admin = require("firebase-admin");
const app = express();

const serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iotLDM.firebaseio.com"
});

const db = admin.database();

const Sensor = db.ref("sensores");

app.get("/", function(req, res){
    res.send("Projeto Esp");
});

app.get("/cadastrar/:itemA/:itemB", function(req, res){
    const itemA = parseInt(req.params.itemA);
    const itemB = parseInt(req.params.itemB);

    // Cria um novo objeto no Firebase Realtime Database subir alt
    const novoSensor = Sensor.push();
    novoSensor.set({
        temperatura: itemA,
        umidade: itemB,
    }, (error) => {
        if (error) {
            console.log("Falha ao cadastrar os dados: " + error);
        } else {
            console.log("Cadastrado com sucesso!");
        }
    });

    res.redirect("/");
});