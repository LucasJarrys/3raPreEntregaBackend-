import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import productManager from "./dao/fileSystem/productManager.js";
import { connectMongoDB } from "./config/mongoDB.config.js";


const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); // INDICA EL MOTOR DE LA PLANTILLA
app.set("views", __dirname + "/views"); // INDICAMOS EN QUE RUTA SE ENCUENTRAN LAS VISTAS
app.set("view engine", "handlebars"); // INDICAMOS CON QUE MOTOR VAMOS A UTILIZAR LAS VISTAS
app.use(express.static("public"));

// RUTAS API
app.use("/api", routes);

// RUTA DE LAS VISTAS
app.use("/", viewsRoutes)

const httpServer = app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});


// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo usuario Conectado");
  const products = await productManager.getProductos();
  io.emit ("products",  products );
});