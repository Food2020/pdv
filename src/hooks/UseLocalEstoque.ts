import { useState, useEffect, useMemo } from "react";
import useTabelaOuForm from "./UseTabelaOuForm";
import useAuth from "../data/hook/useAuth";
import Alert from '@mui/material/Alert'
import {
	PostLocalEstoque,
	GetLocalEstoque,
	ExcluirLocalEstoque,
	UpdateLocalEstoque,
} from "../backend/bd/RequestsLocalEstoque";

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

	const [LocalEstoque, setLocalEstoque] = useState([]);
	const [LocalEstoqueDup, setLocalEstoqueDup] = useState([]);
	const [LocalEstoques, setLocalEstoques] = useState([]);
	const [LocalEstoquesOptions, setLocalEstoquesOptions] = useState([]);



	useEffect(obterTodos, []);

	function obterTodos() {
		setCarregando(true);
		GetLocalEstoque()
		.then((local_estoque) => {
			setLocalEstoques(local_estoque);
			setLocalEstoquesOptions(ArrayToOption(local_estoque));
			exibirTabela();
			setCarregando(false);
		})
		.catch((e)=>e)
	}

	function ArrayToOption(local_estoque) {
		let funcoesOptions = local_estoque.json.map((local_estoque) => {
			let properties = {
				value: local_estoque.id,
				label: local_estoque.nome,
			};
			return properties;
		});

		return funcoesOptions;
	}

	function editarLocalEstoque(LocalEstoque) {
		setLocalEstoque(LocalEstoque);
		setLocalEstoqueDup([]);
		exibirFormulario();
	}

	async function excluirLocalEstoque(LocalEstoque) {
		await ExcluirLocalEstoque(LocalEstoque.id);
		obterTodos();
	}

	function duplicarLocalEstoque(LocalEstoque) {
		setLocalEstoqueDup(LocalEstoque);
		setLocalEstoque([]);
		exibirFormulario();
	}

	async function salvarLocalEstoque({ id, nome,descricao, ativo}) {
	
		if(id){
			const response = await UpdateLocalEstoque({ id, nome,descricao,ativo })
				setCarregando(false);
				setTimeout(()=>{
					obterTodos();
				},500)
				return response;
		}
		else{
			PostLocalEstoque({ nome,descricao }).then((resp) => {
				setCarregando(false);
				setTimeout(()=>{
					obterTodos();
				},500)
		  });
				
		}

		
	}

	function novoLocalEstoque() {
		setLocalEstoque([]);
		setLocalEstoqueDup([]);
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
		LocalEstoque,
		LocalEstoques,
		LocalEstoquesOptions,
		novoLocalEstoque,
		salvarLocalEstoque,
		excluirLocalEstoque,
		editarLocalEstoque,
		duplicarLocalEstoque,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		LocalEstoqueDup,
	};
}
