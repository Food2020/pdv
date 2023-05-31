import { useState, useEffect } from "react";
import useTabelaOuForm from "../UseTabelaOuForm";
import useAuth from "../../data/hook/useAuth";

import {
	PostEntradaManual,
	GetEntradaManual,
	UpdateEntradaManual,
	ExcluirEntradaManual,
} from "../../backend/bd/RequestsEstoque";
import { format } from "date-fns";
import UseParceiro from "../UseParceiro";

export default function UseEstoque() {
	const dataAtual = new Date();

	const initialValues = {
		numNota: "",
		dataEmissao: format(dataAtual, "dd/MM/yyyy"),
		dataEntrada: format(dataAtual, "dd/MM/yyyy"),
		fornecedor: [],
		idFornecedor: "",
	};

	const { setCarregando } = useAuth();
	const { exibirTabela, exibirFormulario, formularioVisivel, tabelaVisivel } =
		useTabelaOuForm();

	const { FornecedoresOptions } = UseParceiro();
	const [EntradasManuais, setEntradasManuais] = useState([]);
	const [detalhe, setDetalhe] = useState(false);
	const [values, setValues] = useState(initialValues);

	useEffect(obterTodos, []);

	function obterTodos() {
		setCarregando(true);
		GetEntradaManual().then((entradas) => {
			setEntradasManuais(entradas.json);
			exibirTabela();	
			setCarregando(false);
		});
	}

	function detalheEntradaManual(entradaManual) {
		setDetalhe(true);
		setValues({
			...entradaManual,
			dataEmissao: format(new Date(entradaManual?.dataEmissao), "dd/MM/yyyy"),
			dataEntrada: format(new Date(entradaManual?.dataEntrada), "dd/MM/yyyy"),
			fornecedor: FornecedoresOptions.find(
				(option) => option.value === entradaManual?.idFornecedor
			),
		});
		exibirFormulario();
	}

	async function excluirEntradaManual(entradaManual) {
		await ExcluirEntradaManual(entradaManual.idEntradaManual);
		obterTodos();
	}

	async function salvarEntradaManual(
		{ idEntradaManual, numNota, dataEmissao, dataEntrada, idFornecedor },
		itens
	) {
		setCarregando(true);
		idEntradaManual
			? UpdateEntradaManual(
					{
						idEntradaManual,
						numNota,
						dataEmissao,
						dataEntrada,
						idFornecedor,
					},
					itens
			  ).then((resp) => {
					obterTodos();
					setCarregando(false);
			  })
			: PostEntradaManual(
					{
						numNota,
						dataEmissao,
						dataEntrada,
						idFornecedor,
					},
					itens
			  ).then((resp) => {
					obterTodos();
					setCarregando(false);
			  });
	}

	function novoEntradaManual() {
		setDetalhe(false);
		setValues(initialValues);
		exibirFormulario();
	}

	return {
		FornecedoresOptions,
		values,
		setValues,
		EntradasManuais,
		novoEntradaManual,
		salvarEntradaManual,
		excluirEntradaManual,
		detalheEntradaManual,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		detalhe,
	};
}
