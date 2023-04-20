import CategoriaController from "../../../backend/bd/Controller/CategoriaController"
import SuperJSON from "superjson";
import { categoria } from "@prisma/client";

export default async  function handler(req, res) {
    const categoriaController = new CategoriaController();
 
    if(req.method === "POST"){
        const categoria = req.body;
        const categoriaCadastrado =  await saveCat(categoriaController,categoria);
        res.status(200).json(categoriaCadastrado);
    }

    if(req.method === "GET"){
     const categorias = await getCat(categoriaController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(categorias)));
    }

    if(req.method === "PUT"){
      const data = req.body;
      const categoria = await updateCat(categoriaController,data);
      res.status(200).json(categoria);
    }

    if(req.method === 'DELETE'){
      const categoria = req.body;
      await deleteCat(categoriaController,categoria)
      res.status(200).json({message:'categoria deletada'})
    }

  }

  async function saveCat(categoriaController,data:categoria){
    return await categoriaController.create(data);
  }
  

  async function getCat(categoriaController){
    return await categoriaController.get();
  }

  async function updateCat(categoriaController,data:categoria){
    return await categoriaController.update(data);
  }

  async function deleteCat(categoriaController,data:categoria){
    return await categoriaController.delete(data)
  }