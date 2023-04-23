import { categoria } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class CategoriaController {
	async get() {
		try {
			const categorias = prisma.categoria.findMany();
			return categorias;
		} catch (e) {
			return e;
		}
	}
	async create(data: categoria) {
		try {
			const categoria = prisma.categoria.create({
				data: {
					nome: data.nome,
					ativo: data.ativo,
					createdAt: new Date(),
					updatedAt: new Date(),
				} as any,
			});
			return SuperJSON.stringify({
				id: (await categoria).id,
				nome: (await categoria).nome,
				ativo: (await categoria).ativo,
				createdAt: (await categoria).createdAt,
				updtedAt: (await categoria).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async update(data: categoria) {
		try {
			const categoria = prisma.categoria.update({
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
				id: (await categoria).id,
				nome: (await categoria).nome,
				ativo: (await categoria).ativo,
				updtedAt: (await categoria).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async delete(data: categoria) {
		try {
			const categoria = prisma.categoria.delete({
				where: {
					id: Number(data.id),
				},
			});
			return categoria;
		} catch (e) {
			return e;
		}
	}
}
