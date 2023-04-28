import { PrismaClient, unidades } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class UnidadeMedidaController {
	async get() {
		try {
			const unidades = prisma.unidades.findMany();
			return unidades;
		} catch (e) {
			return e;
		}
	}
	async create(data: unidades) {
		try {
			const unidades = prisma.unidades.create({
				data: {
					nome: data.nome,
					ativo: data.ativo,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});
			return SuperJSON.stringify({
				id: (await unidades).id,
				nome: (await unidades).nome,
				ativo: (await unidades).ativo,
				createdAt: (await unidades).createdAt,
				updtedAt: (await unidades).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async update(data: unidades) {
		try {
			const unidade = JSON.parse(SuperJSON.stringify(data))
			
			const unidades = prisma.unidades.update({
				where: {
					id: Number(unidade.json.id),
				},
				data: {
					nome: unidade.json.nome,
					ativo: unidade.json.ativo,
					updatedAt: new Date(),
				},
			});
			return SuperJSON.stringify({
				id: (await unidades).id,
				nome: (await unidades).nome,
				ativo: (await unidades).ativo,
				updtedAt: (await unidades).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async delete(data: unidades) {
		const unidade = JSON.parse(SuperJSON.stringify(data))

		console.log('uni',unidade);
		try {
			const deletado = prisma.unidades.delete({
				where: {
					id: Number(unidade.json.id),
				},
			});
			return JSON.parse(SuperJSON.stringify({
				id: (await deletado).id,
				nome: (await deletado).nome,
				ativo: (await deletado).ativo,
				updtedAt: (await deletado).updatedAt,
			}));;
		} catch (e) {
			return console.log(e);
		}
	}
}
