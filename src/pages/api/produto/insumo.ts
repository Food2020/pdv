import ProductController from "../../../backend/bd/Controller/ProductController"
import SuperJSON from "superjson";

export default async  function handler(req, res) {
    const productController = new ProductController();


    if(req.method === "GET"){
     const produtos = await getProduct(productController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(produtos)));
    }


  async function getProduct(productController){
    return await productController.getInsumo();
  }
}