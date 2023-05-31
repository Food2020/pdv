import { useState, useEffect, useMemo } from "react";
import useTabelaOuForm from "./UseTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
	PostParceiro,
	GetParceiro,
	ExcluirParceiro,
	UpdateParceiro,
	GetFornecedores,
} from "../backend/bd/ResquestsParceiro";

export default function useParceiro() {
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

	const [Parceiro, setParceiro] = useState([]);
	const [ParceiroDup, setParceiroDup] = useState([]);
	const [Parceiros, setParceiros] = useState([]);
	const [ParceirosOptions, setParceirosOptions] = useState([]);
	const [FornecedoresOptions, setFornecedoresOptions] = useState([]);

	useEffect(obterTodos, []);

	function obterTodos() {
		setCarregando(true);
		GetParceiro().then((parceiro) => {
			setParceiros(parceiro.json);
			setParceirosOptions(ArrayToOption(parceiro.json));
			exibirTabela();
			setCarregando(false);
		});
		GetFornecedores().then((fornecedores) => {
			setFornecedoresOptions(ArrayToOption(fornecedores.json));
		});
	}

	function ArrayToOption(parceiro) {
		let parceirosOptions = parceiro.map((parceiro) => {
			let properties = {
				value: parceiro.id,
				label: parceiro.nome,
			};
			return properties;
		});

		return parceirosOptions;
	}

	function editarParceiro(Parceiro) {
		setParceiro(Parceiro);
		setParceiroDup([]);
		exibirFormulario();
	}

	async function excluirParceiro(Parceiro) {
		await ExcluirParceiro(Parceiro.id);
		obterTodos();
	}

	function duplicarParceiro(Parceiro) {
		setParceiroDup(Parceiro);
		setParceiro([]);
		exibirFormulario();
	}

	async function salvarParceiro(data) {
		setCarregando(true);
		data.id
			? UpdateParceiro(data).then((resp) => {
					setCarregando(false);
					obterTodos();
			  })
			: PostParceiro(data).then((resp) => {
					setCarregando(false);
					obterTodos();
			  });
	}

	function novoParceiro() {
		setParceiro([]);
		setParceiroDup([]);
		exibirFormulario();
	}

	return {
		Parceiro,
		Parceiros,
		ParceirosOptions,
		novoParceiro,
		salvarParceiro,
		excluirParceiro,
		editarParceiro,
		duplicarParceiro,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		ParceiroDup,
		FornecedoresOptions
	};
}
