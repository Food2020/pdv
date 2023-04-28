import FormaPagamento from "../core/FormaPagamento";
import { useState, useEffect, useMemo } from "react";
import ColecaoFormaPagamento from "../backend/bd/ColecaoFormaPagamento";
import useTabelaOuForm from "./UseTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
	PostFormaPagamento,
	GetFormaPagamento,
	ExcluirFormaPagamento,
	UpdateFormaPagamento,
} from "../backend/bd/ResquestsFormaPagamento";

export default function useFormaPagamento() {
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

	const [FormaPagamento, setFormaPagamento] = useState([]);
	const [FormaPagamentoDup, setFormaPagamentoDup] = useState([]);
	const [FormaPagamentos, setFormaPagamentos] = useState([]);
	const [FormaPagamentosOptions, setFormaPagamentosOptions] = useState([]);

	useEffect(obterTodos, []);

	function obterTodos() {
		setCarregando(true);
		GetFormaPagamento().then((formaPagamento) => {
			setFormaPagamentos(formaPagamento);
			setFormaPagamentosOptions(ArrayToOption(formaPagamento));
			exibirTabela();
			setCarregando(false);
		});
	}

	function ArrayToOption(formaPagamento) {
		let formaPagamentosOptions = formaPagamento.json.map((formaPagamento) => {
			let properties = {
				value: formaPagamento.id,
				label: formaPagamento.nome,
			};
			return properties;
		});

		return formaPagamentosOptions;
	}

	function editarFormaPagamento(FormaPagamento) {
		setFormaPagamento(FormaPagamento);
		setFormaPagamentoDup([]);
		exibirFormulario();
	}

	async function excluirFormaPagamento(FormaPagamento) {
		await ExcluirFormaPagamento(FormaPagamento.id);
		obterTodos();
	}

	function duplicarFormaPagamento(FormaPagamento) {
		setFormaPagamentoDup(FormaPagamento);
		setFormaPagamento([]);
		exibirFormulario();
	}

	async function salvarFormaPagamento({ id, nome, ativo }) {
		setCarregando(true);
		id
			? UpdateFormaPagamento({ id, nome }).then((resp) => {
					setCarregando(false);
					obterTodos();
			  })
			: PostFormaPagamento({ nome }).then((resp) => {
					setCarregando(false);
					obterTodos();
			  });
	}

	function novoFormaPagamento() {
		setFormaPagamento([]);
		setFormaPagamentoDup([]);
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
		FormaPagamento,
		FormaPagamentos,
		FormaPagamentosOptions,
		novoFormaPagamento,
		salvarFormaPagamento,
		excluirFormaPagamento,
		editarFormaPagamento,
		duplicarFormaPagamento,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		FormaPagamentoDup,
	};
}
