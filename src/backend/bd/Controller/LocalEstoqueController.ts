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
					id: Number(localEstoque.idLocalEstoque),
					nome: localEstoque.nome,
					descricao:localEstoque.descricao,
					ativo:  localEstoque.ativo,
					createdAt: localEstoque.createdAt,
					updatedAt: localEstoque.updatedAt
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
			
			const resposta = await prisma.local_estoque.update({
				where: {
					idLocalEstoque: Number(data.idLocalEstoque),
				},
				data: {
					nome: data.nome,
					descricao:data.descricao,
					updatedAt: new Date(),
				},
			});
			return JSON.parse(SuperJSON.stringify({
				id: resposta.idLocalEstoque,
				nome:  resposta.nome
			}));
		} catch (e) {
			return e;
		}
	}

	async delete(data: local_estoque) {
		const unidade = JSON.parse(SuperJSON.stringify(data));
		
		
		try {
			const deletado = await prisma.local_estoque.delete({
				where: {
					idLocalEstoque: Number(unidade.idLocalEstoque),
				},
			});
			return SuperJSON.stringify({
				id: deletado.idLocalEstoque,
				nome:deletado.nome,
				ativo:  deletado.ativo,
				createdAt:  deletado.createdAt,
				updtedAt: deletado.updatedAt
			});
		} catch (e) {
			return e;
		}
	}
}