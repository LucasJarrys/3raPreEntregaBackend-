import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import productDao from "../dao/mongoDB/product.dao.js";
import { verifyProductInCart } from "../middlewares/verifyProductInCart.middleware.js";


const router = Router();

// RUTA PARA CREAR TODOS LOS CARRITOS QUE QUIERAS
router.post("/", async (req, res) => {
    try {
        
        const cart = await cartDao.create();

        res.status(201).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
})

//RUTA PARA CONSEGUIR UN CARRITO POR ID
router.get("/:cid", async (req, res) => {
    try {
        const {cid} = req.params
        const cart = await cartDao.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

        res.status(200).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
})

// RUTA PARA AGREGAR PRODUCTOS DENTRO DE UN CARRITO

//  router.post("/:cid/product/:pid", async (req, res) => {
//      try {
//          const { cid, pid } = req.params;

//          const product = await productDao.getById(pid);
//          if (!product) return res.status(404).json({ status: "Error", msg: `Producto no encontrado con el id ${pid}` });
        
//          const cart = await cartDao.getById(cid);
//          if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });
        
//          const cartUpdate = await cartDao.addProductToCart(cid, pid);
                                         
//          res.status(200).json({ status: "success", payload: cartUpdate });
//        } catch (error) {
//          console.log(error);
//          res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
//        }
//      });


// RUTA PARA AGREGAR PRODUCTOS DENTRO DE UN CARRITO actualizado con el Middleware

router.post("/:cid/product/:pid", verifyProductInCart, async (req, res) => {
  try {
      const { cid } = req.params;
      // No es necesario buscar el producto nuevamente, ya que el middleware lo adjuntó a req.product
      const product = req.product;
     
      const cart = await cartDao.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });
     
      // product.id es el objeto producto que adjuntó el middleware
      const cartUpdate = await cartDao.addProductToCart(cid, product.id);
                                      
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  });

   



    //RUTA PARA ELIMINAR PRODUCTO DENTRO DEL CARRITO
    // router.delete("/:cid/product/:pid",  async (req, res) => {
    //   //  try {
    //   //      const { cid, pid } = req.params;
    //   //      const product = await productDao.getById(pid);
    
    //   //      if (!product) return res.status(404).json({ status: "Error", msg: `Producto no encontrado con el id ${pid}` });
    //   //      const cart = await cartDao.getById(cid);
            
    //   //      if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });
            
    //   //      const cartUpdate = await cartDao.deleteProductToCart(cid, pid); //ELIMINAMOS EL PRODUCTO DEL CARRITO
                                             
    //   //      res.status(200).json({ status: "success", payload: cartUpdate });
    //   //    } catch (error) {
    //   //      console.log(error);
    //   //      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    //   //    }
    //   //  });

//RUTA PARA ELIMINAR PRODUCTO DENTRO DEL CARRITO actualizado con el Middleware

      router.delete("/:cid/product/:pid", verifyProductInCart, async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await cartDao.getById(cid);
            
            if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });
            
            const cartUpdate = await cartDao.deleteProductToCart(cid, pid); // Utilizamos el producto adjunto por el middleware
            
            res.status(200).json({ status: "success", payload: cartUpdate });
          } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
          }
      });
      




// RUTA PARA ACTUALIZAR CANTIDAD DEL PRODUCTO        
        router.put("/:cid/product/:pid", verifyProductInCart, async (req, res) => {
             try {
                 const { cid, pid } = req.params; //PASAMOS LOS ID POR PARAMETROS
                 const {quantity} = req.body
                //  const product = await productDao.getById(pid);
        
                //  if (!product) return res.status(404).json({ status: "Error", msg: `Producto no encontrado con el id ${pid}` });
                 const cart = await cartDao.getById(cid);
                
                 if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });
                
                 const cartUpdate = await cartDao.updateQuantityProductInCart(cid, pid, Number(quantity)); //AGREGAMOS LA QUANTITY QUE LE PASAMOS POR EL BODY
                                                 
                 res.status(200).json({ status: "success", payload: cartUpdate });
               } catch (error) {
                 console.log(error);
                 res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
               }
             });



//RUTA PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO

router.delete("/:cid", async (req, res) => {
  try {
      const {cid} = req.params
      const cart = await cartDao.clearProductsToCart(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

      res.status(200).json({status: "success", cart});

  } catch (error) {
      console.log(error);
      res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }
})
          

export default router;