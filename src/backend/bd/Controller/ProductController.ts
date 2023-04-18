import { PrismaClient, products } from "@prisma/client";

export default class UserController {

    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    async get(){
        try{
            return this.prisma.products.findMany();
        }catch(e){
            return e
        }
    }
    async create(data:products){
        try{
           return this.prisma.products.create({
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

    async update(data:products){
        try{
            return this.prisma.products.update({
                where:{
                    id:Number(data.id),
                },
                data:{
                   ...data,
                    updatedAt:new Date()
                }
           })
           
        }catch(e){
            return e
        }

    }

    async delete(data:products){
        try{
           return this.prisma.products.delete({
                where:{
                id:Number(data.id)
            }})
        }catch(e){
            return e;
        }
    }
}