import { json } from "stream/consumers";
import { Alert } from "flowbite-react";
import SuperJSON from "superjson";

const url = "/api/unidade_medida";

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
		id,
		nome,
	};
	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: SuperJSON.stringify(data),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao editar Unidade de Medida !");
		});
}

export async function ExcluirUnidade(id) {
	let data = {
		id:id
	};
	return fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),

	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro ao deletar Unidade de medida !");
		});
}
