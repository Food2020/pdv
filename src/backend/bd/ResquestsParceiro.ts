const url = "/api/parceiro/";

export async function PostParceiro(data) {
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

export async function GetParceiro() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de Parceiros!");
		});
}

export async function GetFornecedores() {
	return fetch(`${url}/fornecedor`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de Parceiros!");
		});
}

export async function UpdateParceiro(data) {
	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response)
		.catch(() => {
			alert("Erro ao editar Parceiro !");
		});
}

export async function ExcluirParceiro(id: Number) {
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
			alert("Erro ao deletar Parceiro !");
		});
}
