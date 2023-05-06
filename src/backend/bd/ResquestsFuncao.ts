import { json } from "stream/consumers";
import { Alert } from "flowbite-react";

const url = "/api/funcao";

export async function PostFuncao({ nome }) {
	let data = {
		nome: nome,
		ativo: 1,
	};
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao cadastrar !");
		});
}

export async function GetFuncao() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de funções!");
		});
}

export async function UpdateFuncao({ id, nome }) {
	let data = {
		id,
		nome,
	};
	const resultado = await fetch(`${url}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((response) => response.json())
	  .catch((err) => {
			alert("Erro ao editar Função !");
		});
		return resultado;
}

export async function ExcluirFuncao(id) {
	let data = {
		id
	};
	return fetch(`${url}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro ao deletar Função !");
		});
}
