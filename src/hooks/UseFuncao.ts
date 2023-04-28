import Funcao from "../core/Funcao";
import { useState, useEffect, useMemo } from "react";
import ColecaoFuncao from "../backend/bd/ColecaoFuncao";
import useTabelaOuForm from "./UseTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
	PostFuncao,
	GetFuncao,
	ExcluirFuncao,
	UpdateFuncao,
} from "../backend/bd/ResquestsFuncao";

export default function useFuncao() {
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

	const [Funcao, setFuncao] = useState([]);
	const [FuncaoDup, setFuncaoDup] = useState([]);
	const [Funcoes, setFuncoes] = useState([]);
	const [FuncoesOptions, setFuncoesOptions] = useState([]);

	useEffect(obterTodos, []);

	function obterTodos() {
		setCarregando(true);
		GetFuncao().then((funcao) => {
			setFuncoes(funcao);
			setFuncoesOptions(ArrayToOption(funcao));
			exibirTabela();
			setCarregando(false);
		});
	}

	function ArrayToOption(funcao) {
		let funcoesOptions = funcao.json.map((funcao) => {
			let properties = {
				value: funcao.id,
				label: funcao.nome,
			};
			return properties;
		});

		return funcoesOptions;
	}

	function editarFuncao(Funcao) {
		setFuncao(Funcao);
		setFuncaoDup([]);
		exibirFormulario();
	}

	async function excluirFuncao(Funcao) {
		await ExcluirFuncao(Funcao.id);
		obterTodos();
	}

	function duplicarFuncao(Funcao) {
		setFuncaoDup(Funcao);
		setFuncao([]);
		exibirFormulario();
	}

	async function salvarFuncao({ id, nome, ativo }) {
		setCarregando(true);
		id
			? UpdateFuncao({ id, nome }).then((resp) => {
					setCarregando(false);
					obterTodos();
			  })
			: PostFuncao({ nome }).then((resp) => {
					setCarregando(false);
					obterTodos();
			  });
	}

	function novoFuncao() {
		setFuncao([]);
		setFuncaoDup([]);
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
		Funcao,
		Funcoes,
		FuncoesOptions,
		novoFuncao,
		salvarFuncao,
		excluirFuncao,
		editarFuncao,
		duplicarFuncao,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		FuncaoDup,
	};
}
