import { Router } from "express";
import productManager from "../dao/fileSystem/productManager.js";
import { io } from "../app.js";

const router = Router();

router.get("/", async (req, res) => {

    try {
        const products = await productManager.getProductos()
        res.render("home", {products});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});

router.get("/realtimeproducts", async (req, res) => {

    try {
        // const products = await productManager.getProductos();
        // io.emit("products", products);
        res.render("realTimeproducts");
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});

router.post("/realtimeproducts", async (req, res) => {
    try {
        const { title, price, description } = req.body
        await productManager.addProducto({title, price, description});
        const products = await productManager.getProductos();
        io.emit("products", products);

        res.render("realtimeproducts");

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});

router.delete("/realtimeproducts", async (req, res) => {
    try {
        const { id } = req.body
        await productManager.deleteProducto(Number(id));
        const products = await productManager.getProductos()
        io.emit("products", products);

        res.render("realtimeproducts");

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno del servidor"});
    }
} )

export default router;
