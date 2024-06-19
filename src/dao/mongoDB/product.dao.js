import { productModel } from "./models/product.model.js";

//OBTENER TODOS LOS PRODUCTOS
const getAll = async (query, options) => {
    const products = await productModel.paginate(query, options);
    return products;
};

//CONSEGUIMOS PRODUCTOS POR ID
const getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
};

// FUNCION PARA CREAR PRODUCTOS
const create = async (data) => {
    const product = await productModel.create(data);
    return product;
};


// ACTUALIZAMOS PRODUCTOS
const update = async (id, data) => {
    const productUpdate = await productModel.findByIdAndUpdate(id, data, {new: true});
    // const productUpdate = await productModel.find(id);
    return productUpdate;
};

// ELIMINAMOS PRODUCTO POR SU ID
const deleteOne = async (id) => {
    const product = await productModel.findByIdAndUpdate(id, {status: false}, {new: true});
    return product;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}