import { PrismaClient, local_estoque } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class LocalEstoqueController {
	async get() {
		try {
			const localEstoque = prisma.local_estoque.findMany();
			return localEstoque;
		} catch (e) {
			return e;
		}	
	}
	async create(data: local_estoque) {
		try {
			const localEstoque = await prisma.local_estoque.create({
				data: {
					nome: data.nome,
					descricao:data.descricao,
					ativo: data.ativo,
					createdAt: new Date(),
					updatedAt: new Date()

				},
			}).then((response)=>
			{	

				return JSON.parse(SuperJSON.stringify({
					id: Number( response.id),
					nome: ( response).nome,
					descricao:( response).descricao,
					ativo: ( response).ativo,
					createdAt:( response).createdAt,
					updatedAt:( response).updatedAt
				}));}
			)
			.catch((e)=>{
				console.log(e)
				return e
			})
		} catch (e) {
			return e;
		}
	}

	async update(data: local_estoque) {
		try {
			
			const resposta = prisma.local_estoque.update({
				where: {
					id: Number(data.id),
				},
				data: {
					nome: data.nome,
					descricao:data.descricao,
					updatedAt: new Date(),
				},
			});
			return JSON.parse(SuperJSON.stringify({
				id: (await resposta).id,
				nome: (await resposta).nome
			}));
		} catch (e) {
			return e;
		}
	}

	async delete(data: local_estoque) {
		const unidade = JSON.parse(SuperJSON.stringify(data));
		
		
		try {
			const deletado = prisma.local_estoque.delete({
				where: {
					id: Number(unidade.json.id),
				},
			});
			return SuperJSON.stringify({
				id:(await deletado).id,
				nome:(await deletado).nome,
				ativo: (await deletado).ativo,
				createdAt: (await deletado).createdAt,
				updtedAt: (await deletado).updatedAt
			});
		} catch (e) {
			return e;
		}
	}
}