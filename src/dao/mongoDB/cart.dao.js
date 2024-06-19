import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

//MOSTRAMOS TODOS LOS CARRITOS
const getAll = async () => {
    const carts = await cartModel.find();
    return carts;
};

//CONSEGUIMOS CARRITO POR ID
const getById = async (id) => {
    const cart = await cartModel.findById(id).populate("products.product");
    return cart;
};

//CREAMOS CARRITOS
const create = async (data) => {
    const cart = await cartModel.create(data);
    return cart;
};

//ACTUALIZAR CARRITO
const update = async (id, data) => {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, {new: true});
    // const cartUpdate = await cartModel.find(id);
    return cartUpdate;
};

//ELIMINAR UN CARRITO POR ID
const deleteOne = async (id) => {
    const cart = await cartModel.deleteOne({_id: id});
    return cart;
};

//AGREGAR PRODUCTO E INCREMENTARLO EN EL CARRITO
const addProductToCart = async (cid, pid) => {

     // METODO 1 PROBADO EN LA CLASE 16 PERO ELIJO EL METODO 2 QUE ESTA DEBAJO DE ESTE
  // const productInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });

    // if (!productInCart) {
  //   await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
  // }

  // const cartUpdate = await cartModel.findById(cid);
  // return cartUpdate;

  // METODO 2 PARA INCREMENTAR EL PRODUCTO EN CARRITO

  const cart = await cartModel.findById(cid); //BUSCAMOS NUESTRO CARRITO

  const productInCart = cart.products.find((element) => element.product == pid);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  };
  await cart.save(); // GUARDAMOS LOS CAMBIOS REALIZADO EN LA BASE DE DATOS DE MONGO
  return cart;
};

//ELIMINAMOS PRODUCTO EN EL CARRITO QUE BUSCAMOS POR ID
const deleteProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid); //BUSCAMOS NUESTRO CARRITO
    cart.products = cart.products.filter(element => element.product != pid); //BUSCAMOS NUESTRO PRODUCTO QUE VAMOS A ELIMINAR
    await cart.save()
    return cart;
}


// ACTUALIZAR CANTIDAD DEL PRODUCTO
const updateQuantityProductInCart = async (cid, pid, quantity) => {

  const cart = await cartModel.findById(cid); //BUSCAMOS NUESTRO CARRITO
  const product = cart.products.find(element => element.product == pid); //BUSCAMOS NUESTRO PRODUCTO QUE VAMOS A ACTUALIZAR
  product.quantity = quantity;

  await cart.save(); //GUARDAMOS LOS CAMBIOS
  return cart;
}

const clearProductsToCart = async (cid) => {
  const cart = await cartModel.findById(cid); //BUSCAMOS NUESTRO CARRITO
  cart.products = []

  await cart.save()

  return cart;
} 


export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart
}