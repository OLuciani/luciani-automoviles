const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "../public")));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const mainRoute = require("./Routes/mainRoute");
const usersRoute = require("./Routes/usersRoute");
const productsRoute = require("./Routes/productsRoute")

app.use("/", mainRoute);
app.use("/users", usersRoute);
app.use("/products", productsRoute);

app.listen(3100, () => {
    console.log("Servidor corriendo en el puerto 3100");
})












