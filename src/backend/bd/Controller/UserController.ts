import { PrismaClient, usuarios } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class UserController {
	async get() {
		try {
			return prisma.usuarios.findMany({
				select: {
					id: true,
					nome: true,
					email: true,
					cargo: true,
					ativo: true,
				},
			});
		} catch (e) {
			return e;
		}
	}
	async create(data: Omit<usuarios, "id">) {
		try {
			const usuario = prisma.usuarios.create({
				data: {
					...data,
					createdAt: new Date(),
					updatedAt: new Date(),
				} as any,
			});
			return SuperJSON.stringify({
				id: (await usuario).id,
				nome: (await usuario).nome,
				email: (await usuario).email,
				cargo: (await usuario).cargo,
				ativo: (await usuario).ativo,
				ceatedAt: (await usuario).createdAt,
				updatedAt: (await usuario).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async update(data: usuarios) {
		try {
			return prisma.usuarios.update({
				where: {
					id: Number(data.id),
				},
				data: {
					nome: data.nome,
					email: data.email,
					senha: data.senha,
					cargo: data.cargo,
					ativo: data.ativo,
					updatedAt: new Date(),
				},
			});
		} catch (e) {
			return e;
		}
	}

	async delete(data: usuarios) {
		try {
			return prisma.usuarios.delete({
				where: {
					id: Number(data.id),
				},
			});
		} catch (e) {
			return e;
		}
	}

	async login(data: usuarios) {
		try {
			return prisma.usuarios.findFirst({
				where: {
					email: data.email,
				},
			});
		} catch (e) {
			return e;
		}
	}
}
