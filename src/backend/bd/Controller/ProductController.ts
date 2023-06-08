import { products } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class UserController {
	async get() {
		try {
			let produtos = (await prisma.products.findMany()) as any;
			const produtoComposicao =await prisma.produto_composicao.findMany();

			if (produtos.length > 0) {
				for (let i = 0; i < produtos.length; i++) {
					produtos[i].produtoComposicao = produtoComposicao
					.filter((item) => item.idProduto === produtos[i].idProduto);
				}
			}
			return produtos;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	async create(data: any) {
		const insumo = data.tipo.includes("Insumo") ? 1 : 0;
		const venda = data.tipo.includes("Venda") ? 1 : 0;
		const composicao = data.composicao ? 1 : 0;
		const estoque = data.local_estoque?.value ?? 0;

		const produto = await prisma.products
			.create({
				data: {
					ativo: data.ativo,
					categoria: data.categoria,
					codigoBarra: data.codigoBarra,
					composicao: composicao,
					codigo: data.codigo,
					nome: data.nome,
					preco: Number(data.preco),
					unidade: String(data.unidade),
					local_estoque:estoque,
					insumo: insumo,
					venda: venda,
					createdAt: new Date(),
					updatedAt: new Date(),
				} as any,
			})
			.then((response) => {
				return SuperJSON.stringify(response);
			})
			.catch((e) => {
				console.log(e);
				return e;
			});
	}

	async update(data) {
		try {
			const Pinsumo = data.tipo.includes("Insumo") ? 1 : 0;
			const Pvenda = data.tipo.includes("Venda") ? 1 : 0;
			const Pcomposicao = data.composicao ? 1 : 0;
			const estoque = data.local_estoque?.value ?? 0;
			const produto = await prisma.products.update({
				where: {
					idProduto: data.id,
				},
				data: {
					nome: data.nome,
					preco: Number(data.preco),
					codigo: data.codigo.toString(),
					codigoBarra: data.codigoBarra,
					categoria: data.categoria.toString(),
					unidade: data.unidade.toString(),
					localEstoque: estoque,
					insumo: Pinsumo,
					venda: Pvenda,
					composicao: Pcomposicao,
					ativo: Number(1),
					updatedAt: new Date(),
				},
			});
			const insumo = data.insumo;
			if (insumo.length) {
				for (const produto of insumo) {
					await prisma.produto_composicao
						.create({
							data: {
								idProduto: Number(data.id),
								quantidade: Number(produto?.quantidade),
								dataCriacao: new Date(),
								dataAtualizacao: new Date(),
							} as any,
						})
						.catch((e) => {
							console.log(e);
						});
				}
			}
			const tipos = data.tipo;
			if (tipos.length) {
				for (const tipo of tipos) {
					await prisma.tipo_produto.create({
						data: {
							idProduto: data.id,
							nome: tipo,
							dataCriacao: new Date(),
							dataAtualizacao: new Date(),
						} as any,
					});
				}
			}
			return SuperJSON.stringify({
				idProduto: produto.idProduto,
				nome: produto.nome,
				preco: produto.preco,
				codigo: produto.codigo,
				codigoBarra: produto.codigoBarra,
				categoria: produto.categoria,
				unidade: produto.unidade,
				ativo: produto.ativo,
				createdAt: produto.createdAt,
				updateAt: produto.updatedAt,
				insumo: insumo,
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	}

	async delete(data) {
		try {
			const produto = prisma.products.delete({
				where: {
					idProduto: data.id,
				},
			});
			return produto;
		} catch (e) {
			console.log("eerr", e);
			return e;
		}
	}

	async getInsumo() {
		try {
			const insumos = prisma.products.findMany({
				where: {
					insumo: 1,
				},
			});
			return insumos;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
}
