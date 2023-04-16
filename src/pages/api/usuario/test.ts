import UserController from "../../../backend/bd/UserController"
import SuperJSON from "superjson";

export default async  function handler(req, res) {
    const userController = new UserController();
 
    if(req.method === "POST"){
        const data = req.body;
       const usuario =  await saveUser(userController,data);
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

  async function saveUser(userController,data){
    return await userController.create(data);
  }
  

  async function getUser(userController){
    return await userController.get();
  }

  async function updateUser(userController,data){
    return await userController.update(data);
  }

  async function deleteUser(UserController,data){
    return await UserController.delete(data)
  }