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
			const unidades = prisma.unidades.update({
				where: {
					id: Number(data.id),
				},
				data: {
					nome: data.nome,
					ativo: data.ativo,
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
		const unidade = data;
		try {
			const deletado = prisma.unidades.delete({
				where: {
					id: unidade.id,
				},
			});
			return deletado;
		} catch (e) {
			return e;
		}
	}
}
