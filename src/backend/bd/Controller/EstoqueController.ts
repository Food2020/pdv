import SuperJSON from "superjson";
import { prisma } from "../../../lib/prisma";

export default class EstoqueController {
	async getEntradaManual() {
		try {
			let entradaManual = await prisma.entrada_manual.findMany() as any;

			const entrada_manual_item =  await prisma.entrada_manual_item.findMany();

			if (entradaManual.length > 0) {
				for (let i = 0; i < entradaManual.length; i++) {
					entradaManual[i].itens = entrada_manual_item
						.filter((item) => item.idEntradaManual === entradaManual[i].idEntradaManual);
				}
			}

			return entradaManual;
		} catch (e) {
            console.log(e)
			return e;
		}
	}
	async createEntradaManual(data) {
		try {
			const entradaManual = await prisma.entrada_manual.create({
				data: {
					numNota: data.numNota,
					dataEmissao: data.dataEmissao,
                    dataEntrada: data.dataEntrada,
                    idFornecedor: data.idFornecedor,
                    status: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				} as any,
			});

			const itens = data.itens;
			
			if(itens.length > 0){
				for (const item of itens) {
					let idProduto = item.produto.value;
					await prisma.entrada_manual_item.create({	
						data: {
							idEntradaManual: entradaManual.idEntradaManual,
							idProduto: idProduto,
							qtd: item.qtd,
							valorUnit: item.valor_unit,
							ativo:1,
							createdAt: new Date(),
							updatedAt: new Date(),
						} as any,
					});
				}
			}
			return SuperJSON.stringify({
				idEntradaManual: (await entradaManual).idEntradaManual,
				numNota: (await entradaManual).numNota,
				dataEntrada: (await entradaManual).dataEntrada,
                idFornecedor: (await entradaManual).idFornecedor,
                status: (await entradaManual).status,
				createdAt: (await entradaManual).createdAt,
				updtedAt: (await entradaManual).updatedAt,
			});
		} catch (e) {
            console.log(e)
			return e;
		}
	}

	async update(data) {
		try {
			const entradaManual = prisma.entrada_manual.update({
				where: {
					idEntradaManual: Number(data.idEntradaManual),
				},
				data: {
					numNota: data.numNota,
					dataEmissao: data.dataEmissao,
                    dataEntrada: data.dataEntrada,
                    idFornecedor: data.idFornecedor,
					updatedAt: new Date(),
				},
			});
			return SuperJSON.stringify({
				idEntradaManual: (await entradaManual).idEntradaManual,
				numNota: (await entradaManual).numNota,
				dataEntrada: (await entradaManual).dataEntrada,
                idFornecedor: (await entradaManual).idFornecedor,
                status: (await entradaManual).status,
				createdAt: (await entradaManual).createdAt,
				updtedAt: (await entradaManual).updatedAt,
			});
		} catch (e) {
			return e;
		}
	}

	async deleteEntradaManual(data) {
		try {
			const entradaManual = prisma.entrada_manual.delete({
				where: {
					idEntradaManual: Number(data.idEntradaManual),
				},
			});
			return entradaManual;
		} catch (e) {
			return e;
		}
	}
}
