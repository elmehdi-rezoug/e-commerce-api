import ProductModel from "../models/product_model.js";

export async function getProducts(req, res) {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

export async function getProductById(req, res) {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

export async function postProduct(req, res) {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

export async function updateProduct(req, res) {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

export async function deleteProduct(req, res) {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}
