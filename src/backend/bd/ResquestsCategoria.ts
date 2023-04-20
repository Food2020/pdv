import { json } from "stream/consumers";
import { Alert } from "flowbite-react";

const url = "/api/categoria/";

export async function PostCategoria({ nome }) {
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

export async function GetCategoria() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de categorias!");
		});
}

export async function UpdateCategoria({ id, nome ,ativo =1}) {
	let data = {
		id:id,
		nome: nome,
		ativo:ativo
	};
	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao editar Categoria !");
		});
}

export async function ExcluirCategoria(id) {
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
			alert("Erro ao deletar categoria !");
		});
}
