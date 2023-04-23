import { clientes } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class ClienteController {
	async get() {
		try {
			const clientes = prisma.clientes.findMany();
			return clientes;
		} catch (e) {
			return e;
		}
	}
	async create(data: clientes) {
		try {
			const cliente = prisma.clientes.create({
				data: {
					ativo: 1,
					bairro: data.bairro.toString(),
					cep: data.cep,
					cidade: data.cidade,
					complemento: data.complemento,
					cpfCnpj: data.cpfCnpj,
					createdAt: new Date(),
					endereco: data.endereco,
					fone: data.fone,
					ie: data.ie,
					im: data.im,
					nome: data.nome,
					numero: data.numero,
					razaoSocial: data.razaoSocial,
					uf: data.uf,
					updatedAt: new Date(),
					tipo: data.tipo,
				} as any,
			});

			console.log("await cliente", await cliente);
			return SuperJSON.stringify({
				ativo: (await cliente).ativo,
				bairro: (await cliente).bairro,
				cep: (await cliente).cep,
				cidade: (await cliente).cidade,
				complemento: (await cliente).complemento,
				cpfCnpj: (await cliente).cpfCnpj,
				createdAt: (await cliente).createdAt,
				endereco: (await cliente).endereco,
				fone: (await cliente).fone,
				id: (await cliente).id,
				ie: (await cliente).ie,
				im: (await cliente).im,
				nome: (await cliente).nome,
				numero: (await cliente).numero,
				razaoSocial: (await cliente).razaoSocial,
				uf: (await cliente).uf,
				tipo: (await cliente).tipo,
			});
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}

	async update(data: clientes) {
		try {
			const cliente = prisma.clientes.update({
				where: {
					id: Number(data.id),
				},
				data: {
					ativo: Number(1),
					bairro: data.bairro,
					cep: data.cep,
					cidade: data.cidade,
					complemento: data.complemento,
					cpfCnpj: data.cpfCnpj,
					createdAt: new Date(),
					endereco: data.endereco,
					fone: data.fone,
					ie: data.ie,
					im: data.im,
					nome: data.nome,
					numero: data.numero,
					razaoSocial: data.razaoSocial,
					uf: data.uf,
					updatedAt: new Date(),
					tipo: data.tipo,
				},
			});

			console.log("cliente", cliente);

			return SuperJSON.stringify({
				ativo: (await cliente).ativo,
				bairro: (await cliente).bairro,
				cep: (await cliente).cep,
				cidade: (await cliente).cidade,
				complemento: (await cliente).complemento,
				cpfCnpj: (await cliente).cpfCnpj,
				createdAt: (await cliente).createdAt,
				endereco: (await cliente).endereco,
				fone: (await cliente).fone,
				id: (await cliente).id,
				ie: (await cliente).ie,
				im: (await cliente).im,
				nome: (await cliente).nome,
				numero: (await cliente).numero,
				razaoSocial: (await cliente).razaoSocial,
				uf: (await cliente).uf,
				tipo: (await cliente).tipo,
			});
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}

	async delete(data: clientes) {
		try {
			const cliente = prisma.clientes.delete({
				where: {
					id: Number(data.id),
				},
			});
			return cliente;
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}
}
