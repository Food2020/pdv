import { json } from "stream/consumers";
import { Alert } from "flowbite-react";
import SuperJSON from "superjson";

const url = "/api/produto/";

export async function PostProduto(produto) {
	
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(produto),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao cadastrar produto!");
		});
}

export async function GetProduto() {
	return await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.then((response) => {return response})
		.catch(() => {
			alert("Erro na consulta de produtos!");
		});
}

export async function UpdateProduto(produto) {
	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(produto),
	})
		.then((response) => response)
		.catch((error) => {
			alert("Erro ao editar Produto !");
		});
}

export async function ExcluirProduto(id: number) {
	let data = {
		id: id,
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
			alert("Erro ao deletar produto !");
		});
}

export async function GetProdutoInsumo() {
	return await fetch(`/api/produto/insumo`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => {
			return data.json();
		})
		.catch(() => {
			alert("Erro na consulta de produtos insumos!");
		});
}