let productos = [];

import fs from "fs";

const pathFile = "./src/data/productos.json";

// Armamos el objeto de producto

const addProducto = async (producto) => {
    await getProductos();
    const {title, description, price, thumbail, code, stock, category} = producto;
    const newProduct = {
        id: productos.length + 1,
        title,
        description,
        price,
        thumbail : thumbail || [],
        code,
        stock,
        category,
        status: true,
    };

    productos.push(newProduct);

    await fs.promises.writeFile(pathFile,JSON.stringify(productos));
    
    return producto;
};

// FUNCION PARA CONSEGUIR PRODUTOS EN UN JSON

const getProductos = async (limit) => {
    const productosJson = await fs.promises.readFile(pathFile, "utf-8");
    const productosParse = JSON.parse(productosJson);
    productos = productosParse || [];

    if (!limit) return productos;

    return productos.slice(0, limit);
}


// BUSCAMOS PRODUCTOS POR ID

const getProductoById = async (id) => {
    productos = await getProductos();
    const producto = productos.find((product) => product.id === id );
    return producto;
};

// ACTUALIZAR PRODUCTO

const updateProducto = async (id, productData) => {
    await getProductos();

    const index = productos.findIndex((product) => product.id === id);
    productos[index] = {
    ...productos[index], // hago una copia completa
    ...productData, // sobreescribo la data actualizada
    };


    await fs.promises.writeFile(pathFile, JSON.stringify(productos));
    const producto = await getProductoById(id);
    return producto;
};


// BORRAR PRODUCTO

const deleteProducto = async (id) => {
    await getProductos();
    const producto = await getProductoById(id);
    if (!producto) return false;
    productos = productos.filter((product) => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(productos));
    return true; 

};

export default{
    addProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto,
};




