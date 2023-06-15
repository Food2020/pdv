import { products } from "@prisma/client";
import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class UserController {
	async get() {
		try {
			let produtos = (await prisma.products.findMany()) as any;
			const produtoComposicao = await prisma.produto_composicao.findMany();
			
			if (produtos.length > 0) {
				for (let i = 0; i < produtos.length; i++) {
					produtos[i].produtoComposicao = produtoComposicao
					.filter(({idProduto}) => idProduto === produtos[i].idProduto);
				}
			}
			return produtos;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	async create(data: any) {
		try{
			const tinsumo 	 = data.tipo.includes("Insumo") ? 1 : 0;
			const venda 	 = data.tipo.includes("Venda") ? 1 : 0;
			const composicao = data.composicao ? 1 : 0;
			const estoque 	 = data.localEstoque?.value ?? 0;

			const produto 	 = await prisma.products
			.create({
				data: {
					ativo: 1,
					categoria: data.categoria,
					codigoBarra: data.codigoBarra,
					composicao: composicao,
					codigo: data.codigo,
					nome: data.nome,
					preco: Number(data.preco),
					unidade: String(data.unidade),
					localEstoque:Number(estoque),
					insumo: tinsumo,
					venda: venda,
					createdAt: new Date(),
					updatedAt: new Date(),
				} as any,
			})

			const insumo = data.insumo;
			if (insumo.length) {
				for (const produtoInsumo of insumo) {
					await prisma.produto_composicao
						.create({
							data: {
								idProduto: produto.idProduto,
								produto:Number(produtoInsumo.value),
								quantidade: Number(produtoInsumo?.quantidade),
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
							idProduto: produto.idProduto,
							nome: tipo,
							dataCriacao: new Date(),
							dataAtualizacao: new Date(),
						} as any,
					});
				}
			}
			
			return SuperJSON.stringify(produto);
		}catch(e){
			console.log(e);
			return e;
		}
	}

	async update(data) {
		try {
			const delet = await prisma.produto_composicao.deleteMany({where:{idProduto:data.id}})
			console.log(data)
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
			const insumos = data.insumo;
			if (insumos.length) {
				for (const insumo of insumos) {
					await prisma.produto_composicao
						.create({
							data: {
								idProduto: data.id,
								produto:insumo?.value||insumo?.produto,
								quantidade: Number(insumo?.quantidade),
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
				insumo: insumos,
			});
		} catch (e) {
			console.log(e);
			return e;
		}
	}

	async delete(data) {
		try {
			const produto = await prisma.products.delete({
				where: {
					idProduto: data.id,
				},
			});
			const insumo = await prisma.produto_composicao.deleteMany({
				where:{idProduto:data.id,},
			})
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
