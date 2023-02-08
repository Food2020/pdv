import Usuario from "../core/Usuario";
import { useState, useEffect, useMemo } from "react";
import ColecaoUsuario from "../backend/bd/ColecaoUsuario";
import useTabelaOuForm from "./UseTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
	PostUsuario,
	GetUsuario,
	ExcluirUsuario,
	UpdateUsuario,
} from "../backend/bd/ResquestsUsuarios";

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

	const [Usuario, setUsuario] = useState([]);
	const [UsuarioDup, setUsuarioDup] = useState([]);
	const [Usuarios, setUsuarios] = useState([]);

	useEffect(obterTodos, []);

	function obterTodos() {
		setCarregando(true);
		GetUsuario().then((users) => {
			setUsuarios(users);
			exibirTabela();
			setCarregando(false);
		});
	}

	function editarUsuario(Usuario) {
		setUsuario(Usuario);
		setUsuarioDup([]);
		exibirFormulario();
	}

	async function excluirUsuario(Usuario) {
		await ExcluirUsuario(Usuario.id);
		obterTodos();
	}

	function duplicarUsuario(Usuario) {
		setUsuarioDup(Usuario);
		setUsuario([]);
		exibirFormulario();
	}

	async function salvarUsuario({ id, nome, email, senha, cargo, ativo = 1 }) {
		setCarregando(true);
		id
			? UpdateUsuario({ id, nome, email, senha, cargo, ativo }).then((resp) => {
					setCarregando(false);
					obterTodos();
			  })
			: PostUsuario({ nome, email, senha, cargo, ativo }).then((resp) => {
					setCarregando(false);
					obterTodos();
			  });
	}

	function novoUsuario() {
		setUsuario([]);
		setUsuarioDup([]);
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
		Usuario,
		Usuarios,
		novoUsuario,
		salvarUsuario,
		excluirUsuario,
		editarUsuario,
		duplicarUsuario,
		obterTodos,
		formularioVisivel,
		tabelaVisivel,
		exibirTabela,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		UsuarioDup,
	};
}
