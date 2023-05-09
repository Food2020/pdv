import LocalEstoqueController from "../../../backend/bd/Controller/LocalEstoqueController"
import SuperJSON from "superjson";
import { local_estoque } from "@prisma/client";

export default async  function handler(req, res) {
    const localEstoqueController = new LocalEstoqueController();
 
    if(req.method === "POST"){
        const data = req.body;
        console.log('controller',data)
        try{

          const local_estoque =  await saveLocalEstoque(localEstoqueController,data);
          res.status(200).json({local_estoque:local_estoque, method:"POST"});
        }catch(e){
          res(e)
        }
    }

    if(req.method === "GET"){
     const local_estoque = await getLocalEstoque(localEstoqueController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(local_estoque)));
    }

    if(req.method === "PUT"){
      const data = req.body;
      const local_estoque = await updateLocalEstoque(localEstoqueController,data);
      res.status(200).json({local_estoque:local_estoque,method:'PUT'});
    }

    if(req.method === 'DELETE'){
      const data = req.body
      const local_estoque =  await deleteLocalEstoque(localEstoqueController,data)
         res.status(200).json(local_estoque)
    }

  }

  async function saveLocalEstoque(localEstoqueController,data){
    return await localEstoqueController.create(data);
  }

  async function getLocalEstoque(localEstoqueController){
    return await localEstoqueController.get();
  }

  async function updateLocalEstoque(localEstoqueController,data:local_estoque){
    return await localEstoqueController.update(data);
  }

  async function deleteLocalEstoque(localEstoqueController,data){
    return await localEstoqueController.delete(data)
  }