import { PrismaClient, products } from "@prisma/client";
import SuperJSON from "superjson";

export default class UserController {

    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    async get(){
        try{
            const produtos = this.prisma.products.findMany();
            return produtos;
        }catch(e){
            return e
        }
    }
    async create(data:products){
        try{
           const produto = this.prisma.products.create({
                data:{
                    ativo:Number(data.ativo),
                    createdAt:new Date(),
                    unidade:data.unidade.toString(),
                    updatedAt:new Date(),
                   categoria:data.categoria.toString(),
                   codigo:data.codigo.toString(),
                   codigoBarra:data.codigoBarra,
                   nome:data.nome.toString(),
                   preco:Number(data.preco)
                }
            })
            return SuperJSON.stringify({
                ativo:(await produto).ativo,
                categoria:(await produto).categoria,
                codigo:(await produto).codigo,
                codigoBarra:(await produto).codigoBarra,    
                createdAt:(await produto).createdAt,
                id:(await produto).id,
                nome:(await produto).nome,
                preco:(await produto).preco,
                unidade:(await produto).unidade
            });
        }catch(e){
            return e;
        }
    }

    async update(data:products){

          try{ 
             const produto =  this.prisma.products.update({
                where:{
                    id:Number(data.id),
                },
                data:{
                    nome:data.nome,
                    preco:Number(data.preco),
                    codigo:data.codigo.toString(),
                    codigoBarra:data.codigoBarra,
                    categoria:data.categoria.toString(),
                    unidade:data.unidade.toString(),
                    ativo:Number(1),
                    updatedAt:new Date()
                }
           })
           return SuperJSON.stringify({
            id:(await produto).id,
            nome:(await produto).nome,
            preco:(await produto).preco,
            codigo:(await produto).codigo,
            codigoBarra:(await produto).codigoBarra,
            categoria:(await produto).categoria,
            unidade:(await produto).unidade,
            ativo:(await produto).ativo,
            createdAt:(await produto).createdAt,
            updateAt:(await produto).updatedAt
           })
        }catch(e){
            return e;
        }
        }

    async delete(data:products){
        try{
           const produto =  this.prisma.products.delete({
                            where:{
                            id:Number(data.id)
                            }  
                        });
            return (produto);
        }catch(e){
            return e;
        }
    }
}