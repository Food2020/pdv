import { json } from "stream/consumers";
import { Alert } from "flowbite-react";

const url = "/api/usuario";

export async function PostUsuario({ nome, email, senha, cargo }) {
	let data = {
		nome,
		email,
		senha,
		cargo,
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
		.catch((response) => {
			return response.status.jso({message:'Erro ao cadastrar Usuario!'});
		});
}

export async function GetUsuario() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de usuario!");
		});
}

export async function UpdateUsuario({ id, nome, email, senha, cargo, ativo }) {
	let data = {
		id,
		nome,
		email,
		senha,
		cargo,
		ativo,
	};
	return await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao editar Usuario !");
		});
}

export async function ExcluirUsuario(id) {
	let data = {
		id
	};
	return await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((data) => data)
		.catch(() => {
			alert("Erro ao deletar usuario !");
		});
}

export async function checkUser(email, senha) {
	let data = {
		email,
		senha,
	};

	return  fetch(`${url}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
	.then((response) => response.json())
	.catch((erro) => {
		return erro;
	});
}
