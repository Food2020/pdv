import ProductController from "../../../backend/bd/Controller/ProductController"
import SuperJSON from "superjson";
const bcrypt = require("bcryptjs");

export default async  function handler(req, res) {
    const productController = new ProductController();
 
    if(req.method === "POST"){
        const produto = req.body;
        const produtoCadastrado =  await saveProduct(productController,produto);
        res.status(200).json(produtoCadastrado);
    }

    if(req.method === "GET"){
     const produtos = await getProduct(productController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(produtos)));
    }

    if(req.method === "PUT"){
      const data = req.body;
      const produto = await updateProduct(productController,data);
      res.status(200).json(produto);
    }

    if(req.method === 'DELETE'){
      const produto = req.body;
      await deleteProduct(productController,produto)
      res.status(200).json({message:'produto deletado'})
    }

  }

  async function saveProduct(productController,data){
    return await productController.create(data);
  }
  

  async function getProduct(productController){
    return await productController.get();
  }

  async function updateProduct(productController,data){
    return await productController.update(data);
  }

  async function deleteProduct(productController,data){
    return await productController.delete(data)
  }