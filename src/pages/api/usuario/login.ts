import UserController from "../../../backend/bd/Controller/UserController"
import SuperJSON from "superjson";
const bcrypt = require("bcryptjs");


export default async function handler(req,res){
    const userController = new UserController();

    if(req.method === "POST"){

       const data = req.body;
       const usuario =  await loginUser(userController,data);
       const usuarioLogado = JSON.parse(SuperJSON.stringify(usuario))

       if(usuarioLogado === null){
         return res.status(400).json({
            erro:true,
            message:"Erro: Usuario ou Senha Incorreta !",
            status:res.status,
         });
       }

       if(data.email !== usuarioLogado.json.email){
        return res.status(400).json({
            error: true,
            mensagem: "Erro: Usuário ou senha incorreto! ",
          });

       }


       if(!(await bcrypt.compare(data?.senha.toString(),usuarioLogado?.json?.senha.toString()))){

        return res.status(400).json({
            erro:true,
            message:"Erro: Usuario ou Senha Incorreta! ",
            status:res.status,
        })
        
       }

      const {nome, id} = usuarioLogado.json;
      return res.json({
        erro:false,
        message:"Login Realizado com Sucesso!",
        usuarioLogado:{nome,id},
      });

    }

}

async function loginUser(userController,data){
    return await userController.login(data);
  }