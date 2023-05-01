import { clientes } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class ClienteController {
	async get() {
		try {
			const clientes = await prisma.clientes.findMany();
			const clientesTipos = await prisma.clientes_tipo.findMany();

			if (clientes.length > 0) {
				for (let i = 0; i < clientes.length; i++) {
					clientes[i].tipo = clientesTipos
						.filter((item) => item.idCliente === clientes[i].id)
						.map((item) => item.tipo);
				}
			}
			return clientes;
		} catch (e) {
			return e;
		}
	}
	async create(data: clientes) {
		try {
			const cliente = await prisma.clientes.create({
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
				} as any,
			});

			const tipos = data.tipo;

			if (tipos.length > 0) {
				for (const tipo of tipos) {
					await prisma.clientes_tipo.create({
						data: {
							idCliente: Number(cliente.id),
							tipo: tipo,
						} as any,
					});
				}
			}

			return SuperJSON.stringify({
				ativo: cliente.ativo,
				bairro: cliente.bairro,
				cep: cliente.cep,
				cidade: cliente.cidade,
				complemento: cliente.complemento,
				cpfCnpj: cliente.cpfCnpj,
				createdAt: cliente.createdAt,
				endereco: cliente.endereco,
				fone: cliente.fone,
				id: cliente.id,
				ie: cliente.ie,
				im: cliente.im,
				nome: cliente.nome,
				numero: cliente.numero,
				razaoSocial: cliente.razaoSocial,
				uf: cliente.uf,
				tipo: tipos,
			});
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}

	async update(data: clientes) {
		try {
			const cliente = await prisma.clientes.update({
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
				},
			});

			await prisma.clientes_tipo.deleteMany({
				where: {
					idCliente: Number(cliente.id),
				},
			});

			const tipos = data.tipo;

			if (tipos.length > 0) {
				for (const tipo of tipos) {
					await prisma.clientes_tipo.create({
						data: {
							idCliente: Number(cliente.id),
							tipo: tipo,
						} as any,
					});
				}
			}

			return SuperJSON.stringify({
				ativo: cliente.ativo,
				bairro: cliente.bairro,
				cep: cliente.cep,
				cidade: cliente.cidade,
				complemento: cliente.complemento,
				cpfCnpj: cliente.cpfCnpj,
				createdAt: cliente.createdAt,
				endereco: cliente.endereco,
				fone: cliente.fone,
				id: cliente.id,
				ie: cliente.ie,
				im: cliente.im,
				nome: cliente.nome,
				numero: cliente.numero,
				razaoSocial: cliente.razaoSocial,
				uf: cliente.uf,
				tipo: tipos,
			});
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}

	async delete(data: clientes) {
		try {
			const cliente = await prisma.clientes.delete({
				where: {
					id: Number(data.id),
				},
			});

			await prisma.clientes_tipo.deleteMany({
				where: {
					idCliente: Number(cliente.id),
				},
			});
			
			return cliente;
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}
}
