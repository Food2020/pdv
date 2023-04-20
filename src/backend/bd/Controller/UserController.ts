import { PrismaClient, usuarios } from "@prisma/client";
import SuperJSON from "superjson";

export default class UserController {

    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    async get(){
        try{
            return this.prisma.usuarios.findMany({
                select:{
                    id:true,
                    nome:true,
                    email:true,
                    cargo:true,
                    ativo:true
                }
            });
        }catch(e){
            return e
        }
    }
    async create(data:Omit<usuarios,'id'>){
        try{
           const usuario = this.prisma.usuarios.create({
                data:{
                    ...data,
                    createdAt:new Date(),
                    updatedAt:new Date()
                }as any
            })
            return SuperJSON.stringify({
                id:(await usuario).id,
                nome:(await usuario).nome,
                email:(await usuario).email,
                cargo:(await usuario).cargo,
                ativo:(await usuario).ativo,
                ceatedAt:(await usuario).createdAt,
                updatedAt:(await usuario).updatedAt
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

    async login(data:usuarios){
        try{
           return this.prisma.usuarios.findFirst({
                where:{
                    email:data.email,
                }
            });
        }
        catch(e){
            return e
        }
    }
}