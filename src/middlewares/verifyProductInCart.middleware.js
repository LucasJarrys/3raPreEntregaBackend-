import { response } from "express";
import productDao from "../dao/mongoDB/product.dao.js";


export const verifyProductInCart = async (req = request, res = response, next) => {
     try {
       const { pid } = req.params; // Asumiendo que estás enviando pid por parametro

       const product = await productDao.getById(pid);
  
       if (!product) {
         return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado en el carrito` });
       }
  
       // Si el producto existe, lo adjuntamos al objeto de solicitud y procedemos
       req.product = product;
       next();

    }
     catch (error) {
      console.log(error);
      res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
  };

  