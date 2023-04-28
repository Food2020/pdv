import FuncaoController from "../../../backend/bd/Controller/FuncaoController"
import SuperJSON from "superjson";
import { cargos } from "@prisma/client";

export default async  function handler(req, res) {
    const funcaoController = new FuncaoController();
 
    if(req.method === "POST"){
        const data = req.body;
        const funcao =  await saveFuncao(funcaoController,data);
        res.status(200).json(funcao);
    }

    if(req.method === "GET"){
     const funcaos = await getFuncao(funcaoController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(funcaos)));
    }

    if(req.method === "PUT"){
      const data = req.body;
      const funcao = await updateFuncao(funcaoController,data);
      res.status(200).json(funcao);
    }

    if(req.method === 'DELETE'){
      const data = req.body
      console.log(data)
      const funcao =  await deleteFuncao(funcaoController,data)
         res.status(200).json(funcao)
    }

  }

  async function saveFuncao(funcaoController,data:cargos){
    return await funcaoController.create(data);
  }

  async function getFuncao(funcaoController){
    return await funcaoController.get();
  }

  async function updateFuncao(funcaoController,data:cargos){
    return await funcaoController.update(data);
  }

  async function deleteFuncao(funcaoController,data){
    return await funcaoController.delete(data)
  }