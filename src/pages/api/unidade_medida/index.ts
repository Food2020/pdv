import UnidadeMedidaController from "../../../backend/bd/Controller/UnidadeMedidaController"
import SuperJSON from "superjson";
import { unidades } from "@prisma/client";

export default async  function handler(req, res) {
    const unidadeMedidaController = new UnidadeMedidaController();
 
    if(req.method === "POST"){
        const data = req.body;
        const unidadeMedida =  await saveUnidade(unidadeMedidaController,data);
        res.status(200).json(unidadeMedida);
    }

    if(req.method === "GET"){
     const unidadeMedidas = await getUnidade(unidadeMedidaController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(unidadeMedidas)));
    }

    if(req.method === "PUT"){
      const data = req.body;
      const unidadeMedida = await updateUnidade(unidadeMedidaController,data);
      res.status(200).json(unidadeMedida);
    }

    if(req.method === 'DELETE'){
      const data = req.body
      const unidade =  await deleteUnidade(unidadeMedidaController,data)
         res.status(200).json(unidade)
    }

  }

  async function saveUnidade(unidadeMedidaController,data:unidades){
    return await unidadeMedidaController.create(data);
  }

  async function getUnidade(unidadeMedidaController){
    return await unidadeMedidaController.get();
  }

  async function updateUnidade(unidadeMedidaController,data:unidades){
    return await unidadeMedidaController.update(data);
  }

  async function deleteUnidade(unidadeMedidaController,data){
    return await unidadeMedidaController.delete(data)
  }