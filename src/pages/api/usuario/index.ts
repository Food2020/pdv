import UserController from "../../../backend/bd/Controller/UserController"
import SuperJSON from "superjson";
import { usuarios } from "@prisma/client";
const bcrypt = require("bcryptjs");

export default async  function handler(req, res) {
    const userController = new UserController();
 
    if(req.method === "POST"){
        let {senha,...user} = req.body;
        const salt = await bcrypt.genSalt(8);
         senha = await bcrypt.hash(senha.toString(),salt);
        const usuarioCad = {...user,senha}
        const usuario =  await saveUser(userController,usuarioCad);
        res.status(200).json(usuario);
    }

    if(req.method === "GET"){
     const usuarios = await getUser(userController);
     res.status(200).json(JSON.parse(SuperJSON.stringify(usuarios)));
    }

    if(req.method === "PUT"){
      const data = req.body;

      const usuario = await updateUser(userController,data);
      res.status(200).json(usuario);
    }

    if(req.method === 'DELETE'){
      const data = req.body;
      await deleteUser(userController,data)
      res.status(200).json({message:'usuario deletado'})
    }

  }

  async function saveUser(userController,data:usuarios){
    return await userController.create(data);
  }
  

  async function getUser(userController){
    return await userController.get();
  }

  async function updateUser(userController,data:usuarios){
    return await userController.update(data);
  }

  async function deleteUser(UserController,data:usuarios){
    return await UserController.delete(data)
  }