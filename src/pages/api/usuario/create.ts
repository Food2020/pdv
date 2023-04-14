import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../../lib/prisma';

export default async function create(req:NextApiRequest, res:NextApiResponse){
    const {nome, email, senha, cargo, ativo} = req.body;

   const user =  await prisma.usuarios.create({
        data:{
            nome,
            email,
            senha,
            cargo,
            ativo
        } as any
    })
    .then((response)=>{
        return console.log(response)
        // return res.status(201).json(user)
    })
    .catch((err)=>{return console.log(err)})
}