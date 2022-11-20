const { redirect } = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const productsFildPath = path.join(__dirname, "../data/products.json");

const db = require("../database/models");
const sequelize = db.sequelize;

const controller = {
    list: (req, res) => {
        db.Producto.findAll() //Usamos el alias(al alias le damos el nombre del modelo en plural).
            .then(function(products) {
                res.render("productsList",{ products });
            })
    },/*
    list: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFildPath, "utf8"));
        res.render("productsList", { products: products });
    },*/ 
    detail: function(req, res) {
        db.Producto.findByPk(req.params.id/* ,
           {
                include:["categorias"]
           } */)
        .then(function(product) {
            res.render("productsDetail", { product })
        })
        
    },
    edit: (req,res) => {
        db.Producto.findByPk(req.params.id)
        .then((product) => {
            res.render("productsEdit", { product })
        })
    },
    modify: (req, res) => {
        db.Producto.findByPk(req.params.id)
        .then((product) => {
            res.render("productsEdit", { product })
        }); 
        db.Producto.update({
            "name": req.body.name,
            "type": req.body.type,
            "model": req.body.model,
            "category": req.body.category,
            "price": req.body.price,
            "image": req.file.filename,
            "category_id": req.body.category
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/products");
    },
    create: (req, res) => {
        res.render("productsCreate");
    },
    save: (req, res) => {
        db.Producto.create({
            "name": req.body.name,
            "type": req.body.type,
            "model": req.body.model,
            "category": req.body.category,
            "price": req.body.price,
            "image": req.file.filename,
            "category_id": req.body.category
        })
        .then((respuesta) => {
            res.redirect("/products");
        })
    }, 
    delete: (req, res) => {
        db.Producto.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            res.redirect("/products")
        })
    }
}

module.exports = controller;


/* let products = JSON.parse(fs.readFileSync(productsFildPath, "utf8"));
let totalProductos = products.length;
let newId = products[totalProductos - 1].id + 1;
let newProduct = {
    "id": newId,
    "name": req.body.name,
    "type": req.body.type,
    "model": req.body.model,
    "category": req.body.category,
    "price": req.body.price,
    "image": req.file.filename
}

products.push(newProduct);
fs.writeFileSync(productsFildPath, JSON.stringify(products, null, " "));
res.redirect("/products"); */