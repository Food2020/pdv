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

	useEffect(obterTodos, []);

	function obterTodos() {
		setCarregando(true);
		GetProduto().then((prods) => {
			setProdutos(prods);
			exibirTabela();
			setCarregando(false);
		});
	}

	function editarProduto(Produto) {
		setProduto(Produto);
		setProdutoDup([]);
		exibirFormulario();
	}

	async function excluirProduto(Produto) {
		await ExcluirProduto(Produto.id);
		obterTodos();
	}

	function duplicarProduto(Produto) {
		setProdutoDup(Produto);
		setProduto([]);
		exibirFormulario();
	}

	async function salvarProduto(id, codigo,codigoBarra, nome, preco, categoria, unidade) {
		setCarregando(true);
		id
			? UpdateProduto({ id, codigo,codigoBarra, nome, preco, categoria, unidade }).then(
					(resp) => {
						setCarregando(false);
						obterTodos();
					}
			  )
			: PostProduto({ codigo, nome,codigoBarra, preco, categoria, unidade }).then(
					(resp) => {
						setCarregando(false);
						obterTodos();
					}
			  );
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
		Produto,
		Produtos,
		novoProduto,
		salvarProduto,
		excluirProduto,
		editarProduto,
		duplicarProduto,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		ProdutoDup,
	};
}
