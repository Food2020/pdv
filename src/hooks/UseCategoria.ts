import Categoria from "../core/Categoria";
import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import ColecaoCategoria from "../backend/bd/ColecaoCategoria";
import useTabelaOuForm from "./UseTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
	PostCategoria,
	GetCategoria,
	ExcluirCategoria,
	UpdateCategoria,
} from "../backend/bd/ResquestsCategoria";
import AuthContext from "../data/context/AuthContext";

export default function useCategoria() {
	const { setCarregando } = useContext(AuthContext);

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

	const [Categoria, setCategoria] = useState([]);
	const [CategoriaDup, setCategoriaDup] = useState([]);
	const [Categorias, setCategorias] = useState([]);
	const [CategoriasOptions, setCategoriasOptions] = useState([]);

	const obterTodos = useCallback(() => {
		setCarregando(true);
		GetCategoria().then((categoria) => {
			setCategorias(categoria);
			setCategoriasOptions(ArrayToOption(categoria));
			exibirTabela();
			setCarregando(false);
		});
	}, [exibirTabela, setCarregando]);

	useEffect(() => {
		obterTodos();
	}, []);

	function ArrayToOption(categoria) {
		let categoriasOptions = categoria.map((categoria) => {
			let properties = {
				value: categoria.id,
				label: categoria.nome,
			};
			return properties;
		});

		return categoriasOptions;
	}

	const editarCategoria = useCallback(
		(Categoria) => {
			setCategoria(Categoria);
			setCategoriaDup([]);
			exibirFormulario();
		},
		[exibirFormulario]
	);

	async function excluirCategoria(Categoria: any) {
		await ExcluirCategoria(Categoria.id);
		obterTodos();
	}

	const duplicarCategoria = useCallback(
		(Categoria) => {
			setCategoriaDup(Categoria);
			setCategoria([]);
			exibirFormulario();
		},
		[exibirFormulario]
	);

	const salvarCategoria = useCallback(
		({ id, nome, ativo }) => {
			setCarregando(true);
			id
				? UpdateCategoria({ id, nome }).then((resp) => {
						setCarregando(false);
						obterTodos();
				  })
				: PostCategoria({ nome }).then((resp) => {
						setCarregando(false);
						obterTodos();
				  });
		},
		[obterTodos, setCarregando]
	);

	const novoCategoria = useCallback(() => {
		setCategoria([]);
		setCategoriaDup([]);
		exibirFormulario();
	}, [exibirFormulario]);

	function TratarVariavel(variavel) {
		if (typeof variavel == "string") {
			return variavel.toLowerCase();
		} else {
			return variavel;
		}
	}

	return {
		Categoria,
		Categorias,
		CategoriasOptions,
		novoCategoria,
		salvarCategoria,
		excluirCategoria,
		editarCategoria,
		duplicarCategoria,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		CategoriaDup,
	};
}
