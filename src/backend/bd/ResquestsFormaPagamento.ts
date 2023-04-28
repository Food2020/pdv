import { json } from "stream/consumers";
import { Alert } from "flowbite-react";
import 'regenerator-runtime/runtime';

const url = "/api/formaPagamento";

export async function PostFormaPagamento({ nome }) {
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

export async function GetFormaPagamento() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro ao consulta Forma de Pagamento!");
		});
}

export async function UpdateFormaPagamento({ id, nome }) {
	let data = {
		id,
		nome
	};
	return fetch(`${url}	`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao editar Forma de Pagamento !");
		});
}

export async function ExcluirFormaPagamento(id) {
	let data = {
		id,
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
			alert("Erro ao deletar Forma de Pagamento !");
		});
}
