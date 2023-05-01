import { useState } from "react";
import Produto from "../../../../core/Produto";
import { trataNull, optionToValue, valueToOption, valueToOptionNumber } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada";
import Selecao from "../Selecao";

interface FormularioProdutoProps {
	produto: Produto;
	produtoMudou?: (produto: Produto) => void;
	cancelado?: () => void;
}

export default function FormularioProduto(props) {
	const id = trataNull(props.produto?.id);
	const [nome, setNome] = useState(
		(props.produto?.nome || props.produtoDup?.nome) ?? ""
	);
	const [codigo, setCodigo] = useState(
		(props.produto?.codigo || props.produtoDup?.codigo) ?? ""
	);
	const [unidade, setUnidade] = useState(
		(valueToOptionNumber(props.produto?.unidade, false, props.unidadesOptions) ||
		valueToOptionNumber(props.produtoDup?.unidade, false, props.unidadesOptions)) ??
			null
	);
	const [categoria, setCategoria] = useState(
		(valueToOptionNumber(props.produto?.categoria, false, props.categoriasOptions) ||
		valueToOptionNumber(
				props.produtoDup?.categoria,
				false,
				props.categoriasOptions
			)) ??
			null
	);
	const [preco, setPreco] = useState(
		(props.produto?.preco || props.produtoDup?.preco) ?? 0
	);
	const [codigoBarra, setcodigoBarra] = useState(
		(props.produto?.codigoBarra || props.produtoDup?.codigoBarra) ?? ""
	);

	return (
		<>
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
					options={props.categoriasOptions}
					valorMudou={setCategoria}
					valor={categoria}
					texto="Categoria"
					className="col-span-4"
				/>
				<Selecao
					options={props.unidadesOptions}
					valorMudou={setUnidade}
					valor={unidade}
					texto="Unidade"
					className="col-span-4"
				/>
			</div>
			<div className="flex justify-end mt-4">
				<Botao
					cor="indigo-500"
					className="mr-2"
					onClick={() =>
						props.salvarProduto?.(
							id,
							codigo,
							codigoBarra,
							nome,
							preco,
							optionToValue(categoria),
							optionToValue(unidade)
						)
					}
				>
					{id ? "Alterar" : "Salvar"}
				</Botao>
				<Botao cor="red-600" onClick={props.exibirTabela}>
					Voltar
				</Botao>
			</div>
		</>
	);
}
