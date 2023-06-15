import Produto from "../core/Produto";
import { useState, useEffect, useMemo } from "react";
import ColecaoProduto from "../backend/bd/ColecaoProduto";
import useTabelaOuForm from "./UseTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
	PostProduto,
	GetProduto,
	ExcluirProduto,
	UpdateProduto,
	GetProdutoInsumo,
} from "../backend/bd/ResquestsProdutos";

export default function UseProduto() {
	const { usuario, setCarregando } = useAuth();

	const {
		exibirTabela,
		exibirFormulario,
		formularioVisivel,
		tabelaVisivel,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
	} = useTabelaOuForm();

	const [Produto, setProduto] = useState([]);
	const [ProdutoDup, setProdutoDup] = useState([]);
	const [Produtos, setProdutos] = useState([]);
	const [ProdutosOptions, setProdutosOptions] = useState([]);
	const [InsumosOptions, setInsumoOptions] = useState([]);

	useEffect(obterTodos, []);

	function ArrayToOption(Produto) {
		let produtosOptions = Produto.json.map((produto) => {
			let properties = {
				value: produto.idProduto,
				label: produto.nome,
				unidade: produto.unidade,
			};
			return properties;
		});

		return produtosOptions;
	}

	function obterTodos() {
		setCarregando(true);
		GetProduto()
			.then((prods) => {
				setProdutos(prods.json);
				setProdutosOptions(ArrayToOption(prods));
				exibirTabela();
				setCarregando(false);
			})
			.catch((e) => {
				return e;
			});

		GetProdutoInsumo()
			.then((response) => setInsumoOptions(ArrayToOption(response)))
			.catch((e) => {
				console.log(e);
			});
	}

	function obterInsumos() {
		GetProdutoInsumo()
			.then((response) => setInsumoOptions(ArrayToOption(response)))
			.catch((e) => {
				console.log(e);
			});
	}

	function editarProduto(Produto) {
		setProduto(Produto);
		setProdutoDup([]);
		exibirFormulario();
	}

	async function excluirProduto(Produto) {
		await ExcluirProduto(Produto.idProduto);
		obterTodos();
	}

	function duplicarProduto(Produto) {
		setProdutoDup(Produto);
		setProduto([]);
		exibirFormulario();
	}

	async function salvarProduto(produto) {
		setCarregando(true);
		produto.id
			? UpdateProduto(produto).then((resp) => {
					setCarregando(false);
					obterTodos();
			  })
			: PostProduto(produto).then((resp) => {
					setCarregando(false);
					obterTodos();
			  });
	}

	function novoProduto() {
		setProduto([]);
		setProdutoDup([]);
		exibirFormulario();
	}

	function TratarVariavel(variavel) {
		if (typeof variavel == "string") {
			return variavel.toLowerCase();
		} else {
			return variavel;
		}
	}

	return {
		alterarOrdenacao,
		duplicarProduto,
		editarProduto,
		excluirProduto,
		exibirTabela,
		formularioVisivel,
		getClassNamesFor,
		InsumosOptions,
		novoProduto,
		obterInsumos,
		obterTodos,
		ordenacao,
		Produto,
		ProdutoDup,
		Produtos,
		ProdutosOptions,
		salvarProduto,
		setOrdenacao,
		tabelaVisivel,
	};
}
