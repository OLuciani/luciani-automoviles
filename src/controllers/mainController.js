const path = require("path");

const controller = {
    index: (req, res) => {
        //res.sendFile(path.join(__dirname, "../index.html"));//Para usar con archivo html en views (index.html)
        let nombre = "Luciani Automóviles S.A.";
        res.render("index", { empresa: nombre} );
    }
}

module.exports = controller;