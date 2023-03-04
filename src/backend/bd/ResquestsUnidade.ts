import { json } from "stream/consumers";
import { Alert } from "flowbite-react";

const url = "http://pdvfood.kinghost.net:21012/api/unidade";

export async function PostUnidade({ nome }) {
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

export async function GetUnidade() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de unidades de medida!");
		});
}

export async function UpdateUnidade({ id, nome }) {
	let data = {
		nome,
	};
	return fetch(`${url}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao editar Unidade de Medida !");
		});
}

export async function ExcluirUnidade(id) {
	return fetch(`${url}/${id}`, {
		method: "DELETE",
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro ao deletar Unidade de medida !");
		});
}
