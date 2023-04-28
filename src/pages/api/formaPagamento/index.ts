import FormaPagamentoController from "../../../backend/bd/Controller/FormaPagamentoController"
import SuperJSON from "superjson";
import { forma_pagamentos } from "@prisma/client";

export default async  function handler(req, res) {
    const formaPagamentoController = new FormaPagamentoController();
 
    if(req.method === "POST"){
        const formaPagamento = req.body;
        const categoriaCadastrado =  await saveCat(formaPagamentoController,formaPagamento);
        res.status(200).json(categoriaCadastrado);
    }

    if(req.method === "GET"){
     const formaPagamentos = await getCat(formaPagamentoController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(formaPagamentos)));
    }

    if(req.method === "PUT"){
      const data = req.body;
      const formaPagamento = await updateCat(formaPagamentoController,data);
      res.status(200).json(formaPagamento);
    }

    if(req.method === 'DELETE'){
      const formaPagamento = req.body;
      await deleteCat(formaPagamentoController,formaPagamento)
      res.status(200).json({message:'formaPagamento deletada'})
    }

  }

  async function saveCat(formaPagamentoController,data:forma_pagamentos){
    return await formaPagamentoController.create(data);
  }
  

  async function getCat(formaPagamentoController){
    return await formaPagamentoController.get();
  }

  async function updateCat(formaPagamentoController,data:forma_pagamentos){
    return await formaPagamentoController.update(data);
  }

  async function deleteCat(formaPagamentoController,data:forma_pagamentos){
    return await formaPagamentoController.delete(data)
  }