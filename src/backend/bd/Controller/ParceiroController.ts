import { parceiros } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class ParceiroController {
	async get() {
		try {
			let parceiros = await prisma.parceiros.findMany() as any;
			const parceirosTipos = await prisma.parceiros_tipo.findMany();

			if (parceiros.length > 0) {
				for (let i = 0; i < parceiros.length; i++) {
					parceiros[i].tipo = parceirosTipos
						.filter((item) => item.idParceiro === parceiros[i].id)
						.map((item) => item.tipo);
				}
			}
			return parceiros;
		} catch (e) {
			return e;
		}
	}
	async create(data: any) {
		try {
			const parceiro = await prisma.parceiros.create({
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
					await prisma.parceiros_tipo.create({
						data: {
							idParceiro: Number(parceiro.id),
							tipo: tipo,
						} as any,
					});
				}
			}

			return SuperJSON.stringify({
				ativo: parceiro.ativo,
				bairro: parceiro.bairro,
				cep: parceiro.cep,
				cidade: parceiro.cidade,
				complemento: parceiro.complemento,
				cpfCnpj: parceiro.cpfCnpj,
				createdAt: parceiro.createdAt,
				endereco: parceiro.endereco,
				fone: parceiro.fone,
				id: parceiro.id,
				ie: parceiro.ie,
				im: parceiro.im,
				nome: parceiro.nome,
				numero: parceiro.numero,
				razaoSocial: parceiro.razaoSocial,
				uf: parceiro.uf,
				tipo: tipos,
			});
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}

	async update(data: any) {
		try {
			const parceiro = await prisma.parceiros.update({
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

			await prisma.parceiros_tipo.deleteMany({
				where: {
					idParceiro: Number(parceiro.id),
				},
			});

			const tipos = data.tipo;

			if (tipos.length > 0) {
				for (const tipo of tipos) {
					await prisma.parceiros_tipo.create({
						data: {
							idParceiro: Number(parceiro.id),
							tipo: tipo,
						} as any,
					});
				}
			}

			return SuperJSON.stringify({
				ativo: parceiro.ativo,
				bairro: parceiro.bairro,
				cep: parceiro.cep,
				cidade: parceiro.cidade,
				complemento: parceiro.complemento,
				cpfCnpj: parceiro.cpfCnpj,
				createdAt: parceiro.createdAt,
				endereco: parceiro.endereco,
				fone: parceiro.fone,
				id: parceiro.id,
				ie: parceiro.ie,
				im: parceiro.im,
				nome: parceiro.nome,
				numero: parceiro.numero,
				razaoSocial: parceiro.razaoSocial,
				uf: parceiro.uf,
				tipo: tipos,
			});
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}

	async delete(data: parceiros) {
		try {
			const parceiro = await prisma.parceiros.delete({
				where: {
					id: Number(data.id),
				},
			});

			await prisma.parceiros_tipo.deleteMany({
				where: {
					idParceiro: Number(parceiro.id),
				},
			});
			
			return parceiro;
		} catch (e) {
			console.log("e", e);
			return e;
		}
	}
}
