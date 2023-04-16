import { PrismaClient, usuarios } from "@prisma/client";
import SuperJSON from "superjson";

export default class UserController {

    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    async get(){
        try{
            return this.prisma.usuarios.findMany();
        }catch(e){
            return e
        }
    }
    async create(data:Omit<usuarios,'id'>){
        try{
           return this.prisma.usuarios.create({
                data:{
                    ...data,
                    createdAt:new Date(),
                    updatedAt:new Date()
                }as any
            })
        }catch(e){
            return e;
        }
    }

    async update(data:usuarios){
        try{
            return this.prisma.usuarios.update({
                where:{
                    id:Number(data.id),
                },
                data:{
                    nome:data.nome,
                    email:data.email,
                    senha:data.senha,
                    cargo:data.cargo,
                    ativo:data.ativo, 
                    updatedAt:new Date()
                }
           })
           
        }catch(e){
            return e
        }

    }

    async delete(data:usuarios){
        try{
           return this.prisma.usuarios.delete({
                where:{
                id:Number(data.id)
            }})
        }catch(e){
            return e;
        }
    }
}