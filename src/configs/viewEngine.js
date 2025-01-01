import express from "express";
const path = require('path');
//config view engine for an express app
let configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    app.set("view engine", "ejs")
    app.set("views", path.join(__dirname, '../views'))
};

module.exports = configViewEngine;