
const url = "/api/local_estoque";

export async function PostLocalEstoque({ nome,descricao }) {
	let data = {
		nome,
		descricao,
		ativo: 1,
	};
	return await fetch(url, {
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

export async function GetLocalEstoque() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de local estoque!");
		});
}

export async function UpdateLocalEstoque({ id, nome,descricao, ativo }) {
	let data = {
		id,
		nome,
		descricao,
        ativo
	};
	const resultado = await fetch(`${url}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((response) => response.json())
	  .catch((err) => {
			alert("Erro ao editar local estoque !");
		});
		return resultado;
}

export async function ExcluirLocalEstoque(id) {
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
			alert("Erro ao deletar local estoque !");
		});
}
