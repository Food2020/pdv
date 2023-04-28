import { PrismaClient, cargos } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class FuncaoController {
	async get() {
		try {
			const cargos = prisma.cargos.findMany();
			return cargos;
		} catch (e) {
			return e;
		}
	}
	async create(data: cargos) {
		try {
			const cargos = prisma.cargos.create({
				data: {
					nome: data.nome,
					ativo: data.ativo,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});
			return SuperJSON.stringify({
				id: (await cargos).id,
				nome: (await cargos).nome,
				ativo: (await cargos).ativo,
				createdAt: (await cargos).createdAt,
				updtedAt: (await cargos).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async update(data: cargos) {
		try {
			
			const resposta = prisma.cargos.update({
				where: {
					id: Number(data.id),
				},
				data: {
					nome: data.nome,
					updatedAt: new Date(),
				},
			});
			return SuperJSON.stringify({
				id: (await resposta).id,
				nome: (await resposta).nome
			});
		} catch (e) {
			return e;
		}
	}

	async delete(data: cargos) {
		const unidade = JSON.parse(SuperJSON.stringify(data));
		
		
		try {
			const deletado = prisma.cargos.delete({
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
