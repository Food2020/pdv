import { forma_pagamentos } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class FormaPagamento {
	async get() {
		try {
			const formaPagamento = prisma.forma_pagamentos.findMany();
			return formaPagamento;
		} catch (e) {
			return e;
		}
	}
	async create(data: forma_pagamentos) {
		try {
			const formaPagamento = prisma.forma_pagamentos.create({
				data: {
					nome: data.nome,
					ativo: data.ativo,
					createdAt: new Date(),
					updatedAt: new Date(),
				} as any,
			});
			return SuperJSON.stringify({
				id: (await formaPagamento).id,
				nome: (await formaPagamento).nome,
				ativo: (await formaPagamento).ativo,
				createdAt: (await formaPagamento).createdAt,
				updtedAt: (await formaPagamento).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async update(data: forma_pagamentos) {
		try {
			const formaPagamento = prisma.forma_pagamentos.update({
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
				id: (await formaPagamento).id,
				nome: (await formaPagamento).nome,
				ativo: (await formaPagamento).ativo,
				updtedAt: (await formaPagamento).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async delete(data: forma_pagamentos) {
		try {
			const formaPagamento = prisma.forma_pagamentos.delete({
				where: {
					id: Number(data.id),
				},
			});
			return formaPagamento;
		} catch (e) {
			return e;
		}
	}
}
