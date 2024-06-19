import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{ product: {type: mongoose.Schema.Types.ObjectId, ref:"product" }, quantity: Number }] //este obejeto tiene un propiedad Producto que va as er de tipo ObjectID
    },
}); //En vez de poner todas los elementos de un producto solo ponemos el ID

export const cartModel = mongoose.model(cartCollection, cartSchema);
