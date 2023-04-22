import { PrismaClient, unidades } from "@prisma/client";
import SuperJSON from "superjson";

export default class UnidadeMedidaController {

    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }

    async get(){
        try{
            const unidades = this.prisma.unidades.findMany();
            return unidades;
        }catch(e){
            return e
        }
    }
    async create(data:unidades){
        try{
            const unidades = this.prisma.unidades.create({
                data:{
                    nome:data.nome,
                    ativo:data.ativo,
                    createdAt:new Date(),
                    updatedAt:new Date()
                }
            })
            return SuperJSON.stringify({
                id:(await unidades).id,
                nome:(await unidades).nome,
                ativo:(await unidades).ativo,
                createdAt:(await unidades).createdAt,
                updtedAt:(await unidades).updatedAt
               });
        }catch(e){
            return e;
        }
    }

    async update(data:unidades){
        try{
            const unidades =  this.prisma.unidades.update({
                where:{
                    id:Number(data.id),
                },
                data:{
                   nome:data.nome,
                   ativo:data.ativo,
                   updatedAt:new Date()
                }
           })
           return SuperJSON.stringify({
            id:(await unidades).id,
            nome:(await unidades).nome,
            ativo:(await unidades).ativo,
            updtedAt:(await unidades).updatedAt
           });
        }catch(e){
            return e
        }
    }

    async delete(data:unidades){
      const unidade =  JSON.parse(data)
        try{
           const unidades = this.prisma.unidades.delete({
                where:{ 
                    id:unidade.id
                },
            });
            return unidades;
        }catch(e){
            return e;
        }
    }
}