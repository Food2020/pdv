import { useEffect, useState } from "react";
import Produto from "../../../../core/Produto";
import {
	trataNull,
	optionToValue,
	valueToOption,
	valueToOptionNumber,
	renderizaLabelSelect,
} from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada";
import Selecao from "../Selecao";
import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import TabPanel from "../../TabPanel";
import ToggleButton from "../../ToogleButton/ToogleButton";
import { IconeEdicao, IconeLixo, IconeDuplicar } from "../../../icons/index";

interface FormularioProdutoProps {
	produto: Produto;
	produtoMudou?: (produto: Produto) => void;
	cancelado?: () => void;
}
interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface Insumo {
	value?: number;
	label?: string;
	unidade?: string;
	quantidade?: string;
}

interface LocalEstoque {
	value?: String;
	label?: String;
}
export default function FormularioProduto({
	produto,
	produtos,
	produtoDup,
	unidadesOptions,
	unidades,
	categoriasOptions,
	localEstoqueOptions,
	produtoOptions,
	salvarProduto,
	exibirTabela,
}) {
	const id = trataNull(produto?.idProduto);
	const [nome, setNome] = useState((produto?.nome || produtoDup?.nome) ?? "");
	const [codigo, setCodigo] = useState(
		(produto?.codigo || produtoDup?.codigo) ?? ""
	);
	const [unidade, setUnidade] = useState(
		(valueToOptionNumber(produto?.unidade, false, unidadesOptions) ||
			valueToOptionNumber(produtoDup?.unidade, false, unidadesOptions)) ??
			null
	);
	const [categoria, setCategoria] = useState(
		(valueToOptionNumber(produto?.categoria, false, categoriasOptions) ||
			valueToOptionNumber(produtoDup?.categoria, false, categoriasOptions)) ??
			null
	);
	const [preco, setPreco] = useState(
		(produto?.preco || produtoDup?.preco) ?? 0
	);
	const [codigoBarra, setcodigoBarra] = useState(
		(produto?.codigoBarra || produtoDup?.codigoBarra) ?? ""
	);

	const retornaArrayTipo = (venda, insumo) => {
		let Arr = [];
		if (venda === 1) {
			Arr.push({
				value: "Venda",
				label: "Venda",
			});
		}
		if (insumo === 1) {
			Arr.push({
				value: "Insumo",
				label: "Insumo",
			});
		}
		return Arr;
	};

	const [tipo, setTipo] = useState(
		retornaArrayTipo(produto.venda, produto.insumo) ?? []
	);

	const [localEstoque, setLocalEstoque] = useState<LocalEstoque>(
		(valueToOptionNumber(produto?.localEstoque, false, localEstoqueOptions) ||
			valueToOptionNumber(
				produtoDup?.localEstoque,
				false,
				localEstoqueOptions
			)) ??
			null
	);
	const [produtoInsumo, setProdutoInsumo] = useState(
		(valueToOptionNumber(produto, false, produtoOptions) ||
			valueToOptionNumber(produtoDup, false, produtoOptions)) ??
			null
	);

	const [composicao, setComposicao] = useState(produto.composicao);
	const [quantidade, setQuantidade] = useState(0);
	const [insumo, setInsumo] = useState<Insumo[]>(produto.produtoComposicao);

	const retornaNomeProduto = (id) => {
		const prd = produtos.json.find((produto) => produto.idProtudo === id);
		return prd ? prd?.nome : "";
	};
	const tipoProdutoOptions = [
		{
			value: "Venda",
			label: "Venda",
		},
	];

	if (!composicao) {
		tipoProdutoOptions.push({
			value: "Insumo",
			label: "Insumo",
		});
	}

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	function retornaUnidade(codigoProduto) {
		return produtos.map((produto) => {
			return produto.idProduto === Number(codigoProduto)
				? nomeUnidade(produto.unidade)
				: "";
		});
	}
	function nomeUnidade(codigoUnidade){
		return unidades.json.map((unidade)=>{
			return unidade.id === Number(codigoUnidade)
			? unidade.nome
			:''
		})
	}

	function retornaProduto(codigoProduto) {
		return produtos.map((produto) => {
			return produto.idProduto === codigoProduto ? produto.nome : "";
		});
	}

	function removeInsumo(index) {
		const novaLista = [...insumo];
		novaLista.splice(index, 1);
		setInsumo(novaLista);
	}

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="Geral" {...a11yProps(0)} />
						<Tab label="Composicao" {...a11yProps(1)} disabled={!composicao} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<div className="grid grid-cols-1 md:grid-cols-4">
						{id ? (
							<Entrada
								somenteLeitura
								texto="Id"
								valor={id}
								className="col-span-12"
							/>
						) : (
							false
						)}
						<Entrada
							texto="Código"
							valor={codigo}
							valorMudou={setCodigo}
							className="col-span-12"
						/>
						<Entrada
							texto="Nome"
							valor={nome}
							valorMudou={setNome}
							className="col-span-12"
						/>
						<Entrada
							texto="Cod. de Barra"
							valor={codigoBarra}
							valorMudou={setcodigoBarra}
							tipo="text"
							className="col-span-4"
						/>
						<Entrada
							texto="Preço"
							valor={preco}
							valorMudou={setPreco}
							tipo="number"
							className="col-span-4"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4">
						<Selecao
							options={categoriasOptions}
							valorMudou={setCategoria}
							valor={categoria}
							texto="Categoria"
							className="col-span-4"
						/>
						<Selecao
							options={unidadesOptions}
							valorMudou={setUnidade}
							valor={unidade}
							texto="Unidade"
							className="col-span-4"
						/>
						<Selecao
							options={tipoProdutoOptions}
							valorMudou={setTipo}
							valor={tipo}
							texto="Tipo"
							isMulti={true}
							className="col-span-4"
						/>
						{optionToValue(tipo, true).includes("Insumo") && (
							<Selecao
								options={localEstoqueOptions}
								valorMudou={setLocalEstoque}
								valor={localEstoque}
								texto="Local Estoque"
								className="col-span-4"
							/>
						)}
						{!optionToValue(tipo, true).includes("Insumo") && (
							<ToggleButton check={composicao} valorMudou={setComposicao} />
						)}
					</div>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<div className="col-span-2">
						<Selecao
							options={produtoOptions}
							valorMudou={setProdutoInsumo}
							valor={produtoInsumo}
							texto="Produto Insumo"
							className="col-span-2"
							require
						/>
						<Entrada
							texto="Quantidade"
							valor={quantidade}
							valorMudou={setQuantidade}
							tipo="number"
							className="col-span-2"
						/>
						<Botao
							cor="indigo-500"
							className="mr-2"
							onClick={() => {
								if (!produtoInsumo) {
									alert("Informe o produto");
									return;
								}
								if (quantidade === 0) {
									alert("Informe a quantidade");
									return;
								}
								setInsumo((composicao) => [
									...composicao,
									{
										...produtoInsumo,
										quantidade,
									},
								]);
								setProdutoInsumo("");
								setQuantidade(0);
							}}
						>
							{"Adicionar"}
						</Botao>
					</div>
					<div className="mt-5">
						<table className="max-width: 100% divide-y divide-gray-200 border">
							<thead className="bg-gray-100">
								<tr>
									<th colSpan={4}>{"Insumos"}</th>
								</tr>
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Produto
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Quantidade
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Unidade Medida
									</th>
									<th></th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{insumo?.map((itens, i) => {
									
									return (
										<tr key={i} className={i % 2 === 0 ? "" : "bg-gray-100"}>
											<td className="px-6  whitespace-nowrap">
												{retornaProduto(itens?.idProduto)}
											</td>
											<td className="px-6 whitespace-nowrap">
												{itens.quantidade}
											</td>
											<td className="px-6  whitespace-nowrap">
												{retornaUnidade(itens?.idProduto)}
											</td>
											<td className="px-6  whitespace-nowrap">
												<Tooltip title="Excluir" placement="top">
													<button
														onClick={() => {
															removeInsumo(i);
														}}
														className={`
														text-red-600
														rounded-full
														hover:bg-purple-50 
														p-3
													`}
													>
														{IconeLixo}
													</button>
												</Tooltip>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</TabPanel>
			</Box>

			<div className="flex justify-end mt-4">
				<Botao
					cor="indigo-500"
					className="mr-2"
					onClick={() =>
						salvarProduto?.({
							codigo,
							codigoBarra,
							composicao,
							id,
							nome,
							categoria: optionToValue(categoria),
							tipo: optionToValue(tipo, true),
							unidade: optionToValue(unidade),
							preco,
							localEstoque,
							insumo,
						})
					}
				>
					{id ? "Alterar" : "Salvar"}
				</Botao>
				<Botao cor="red-600" onClick={exibirTabela}>
					Voltar
				</Botao>
			</div>
		</>
	);
}
