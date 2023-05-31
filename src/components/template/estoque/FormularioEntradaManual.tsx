import { useEffect, useState } from "react";
import Entrada from "../cadastros/Entrada";
import { Button, Divider, Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Selecao from "../cadastros/Selecao";
import UsePoduto from "../../../hooks/UseProduto";
import TabelaProdutos from "./TabelaProdutos";
import {
	dateBrToDate,
	optionToValue,
	renderizaLabelSelect,
	valueToOptionNumber,
} from "../../Util";

const transformItens = (ProdutosOptions, itens) => {
	return itens.map((item) => {
		return {
			produto: {
				value: item.idProduto,
				label: renderizaLabelSelect(item.idProduto, ProdutosOptions),
			},
			qtd: item.qtd,
			valor_unit: item.valorUnit,
		};
	});
};
export default function FormularioEntradaManual({
	FornecedoresOptions,
	values,
	setValues,
	salvarEntradaManual,
	exibirTabela,
	detalhe,
}) {
	const initialItem = {
		produto: {},
		qtd: 0,
		valor_unit: 0,
	};

	const { ProdutosOptions } = UsePoduto();

	const [item, setItem] = useState(initialItem);
	const [itens, setItens] = useState([]);

	const addItem = (item, itens) => {
		if (item.produto == null) {
			alert("Informe o produto !");
			return;
		}
		if (item.qtd === 0) {
			alert("Informe a qtd !");
			return;
		}

		const newItens = itens.concat(item);
		setItens(newItens);
		setItem(initialItem);
	};

	useEffect(() => {
		if (values?.itens && ProdutosOptions) {
			setItens(transformItens(ProdutosOptions, values?.itens));
		}
	}, [ProdutosOptions]);

	useEffect(() => {
		if (values?.idFornecedor && !values?.fornecedor) {
			setValues({
				...values,
				fornecedor: valueToOptionNumber(
					values.idFornecedor,
					false,
					FornecedoresOptions
				),
			});
		}
	}, [FornecedoresOptions]);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Divider textAlign="left">Entrada Manual Estoque</Divider>
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada
					somenteLeitura={detalhe}
					texto="Num. nota"
					valor={values.numNota}
					valorMudou={(value) => setValues({ ...values, numNota: value })}
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada
					somenteLeitura={detalhe}
					texto="Data Emissão"
					valor={values.dataEmissao}
					valorMudou={(value) => setValues({ ...values, dataEmissao: value })}
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada
					somenteLeitura={detalhe}
					texto="Data Entrada"
					valor={values.dataEntrada}
					valorMudou={(value) => setValues({ ...values, dataEntrada: value })}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<Selecao
					options={FornecedoresOptions}
					somenteLeitura={detalhe}
					valorMudou={(value) => setValues({ ...values, fornecedor: value })}
					valor={values.fornecedor}
					texto="Fornecedor"
				/>
			</Grid>
			<Grid item xs={12}>
				<Divider textAlign="left">Produtos</Divider>
			</Grid>
			<Grid item xs={12} md={3}>
				<Selecao
					options={ProdutosOptions}
					somenteLeitura={detalhe}
					valorMudou={(value) => setItem({ ...item, produto: value })}
					valor={item.produto}
					texto="Produtos"
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada
					somenteLeitura={detalhe}
					texto="Qtd"
					valor={item.qtd}
					valorMudou={(value) => setItem({ ...item, qtd: Number(value) })}
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada
					somenteLeitura={detalhe}
					texto="Valor unit"
					valor={item.valor_unit}
					valorMudou={(value) =>
						setItem({ ...item, valor_unit: Number(value) })
					}
				/>
			</Grid>
			{!detalhe && (
				<Grid item xs={12} md={2}>
					<Button
						variant="outlined"
						onClick={() => addItem(item, itens)}
						startIcon={<AddCircleOutlineIcon />}
					>
						Adicionar item
					</Button>
				</Grid>
			)}
			<Grid item xs={12} md={8}>
				<TabelaProdutos itens={itens} setItens={setItens} detalhe={detalhe} />
			</Grid>
			<Grid item xs={12}>
				{!detalhe && (
					<Button
						type="button"
						variant="contained"
						color="primary"
						onClick={() =>
							salvarEntradaManual?.(
								{
									...values,
									dataEmissao: dateBrToDate(values.dataEmissao),
									dataEntrada: dateBrToDate(values.dataEntrada),
									idFornecedor: Number(optionToValue(values.fornecedor)),
								},
								itens
							)
						}
					>
						Salvar
					</Button>
				)}
				<Button
					type="button"
					variant="contained"
					color="error"
					onClick={exibirTabela}
				>
					Voltar
				</Button>
			</Grid>
		</Grid>
	);
}
