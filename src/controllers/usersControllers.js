const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const sequelize = db.sequelize;
 
const controller = {
    register: (req, res) => {
        res.render("register")
    },
    usersList: (req, res) => {
        db.Usuario.findAll()
            .then((respuesta) => {
                res.render("usersList", { users: respuesta });
            })
    } , 
    processRegister: (req, res) => {
        if(req.body.pasword == req.body.password2){
            db.Usuario.create({
                 "firstName": req.body.firstName,
                 "lastName": req.body.lastName,
                 "nickname": req.body.nickname,
                 "birthday": req.body.birthday,
                 "userProfile_id": req.body.userProfile,
                 "email": req.body.email,
                 "password": bcryptjs.compareSync(req.body.password, 10), 
                 "avatar": req.file.filename
            })
            .then((respuesta) => {
                res.redirect("/users/list")
            })  
        } else {
                res.render("register")
        }
   }
   , 
    login: (req, res) => {
        res.render("login");
    }, 
     loginProcess: (req, res) => {
        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((userLogin) => {
            if(userLogin){
                res.redirect("/users/list")
            } else {
                res.render("login")
            }
            
        })
        
    } 
    /*
    processRegister: (req, res) => {
        let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let totalDeUsuarios = users.length;
        let newId = users[totalDeUsuarios - 1].id + 1;
        let newUser = {
            "id": newId,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "nickname": req.body.nickname,
            "birthday": req.body.birthday,
    "userProfile": req.body.userProfile,
            "email": req.body.email,
            "password": req.body.password, 
            "avatar": req.file.filename
        }

        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        res.redirect("/users/list");
    }  ,
    usersList: (req, res) => {
        let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        res.render("usersList", { users });
    }, 
    login: (req, res) => {
        res.render("login");
    }, 
     loginProcess: (req, res) => {
        
        
    }  */
} 

module.exports = controller;