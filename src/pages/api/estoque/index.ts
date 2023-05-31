import SuperJSON from "superjson";
import EstoqueController from "../../../backend/bd/Controller/EstoqueController";

export default async  function handler(req, res) {
    const estoqueController = new EstoqueController();
 
    if(req.method === "POST"){
        const entradaManualCadastrado =  await saveEntradaManual(estoqueController,req.body);
        res.status(200).json(entradaManualCadastrado);
    }

    if(req.method === "GET"){
     const entradasManuais = await getEntradaManual(estoqueController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(entradasManuais)));
    }

    if(req.method === "PUT"){
      const entradaManual = await updateEntradaManual(estoqueController,req.body);
      res.status(200).json(entradaManual);
    }

    if(req.method === 'DELETE'){
      const entradaManual = req.body;
      await deleteEntradaManual(estoqueController,entradaManual)
      res.status(200).json({message:'Entrada manual deletada'})
    }

  }

  async function saveEntradaManual(estoqueController,data){
    return await estoqueController.createEntradaManual(data);
  }
  

  async function getEntradaManual(estoqueController){
    return await estoqueController.getEntradaManual();
  }

  async function updateEntradaManual(estoqueController,data){
    return await estoqueController.updateEntradaManual(data);
  }

  async function deleteEntradaManual(estoqueController,data){
    return await estoqueController.deleteEntradaManual(data)
  }