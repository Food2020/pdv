const url = "/api/estoque/";

export async function PostEntradaManual({
	numNota,
	dataEmissao,
	dataEntrada,
	idFornecedor,
},itens) {
	let data = {
		numNota: numNota,
		dataEmissao: dataEmissao,
		dataEntrada: dataEntrada,
		idFornecedor: idFornecedor,
		itens: itens
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

export async function GetEntradaManual() {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.catch(() => {
			alert("Erro na consulta de Entrada Manual!");
		});
}

export async function UpdateEntradaManual({
	idEntradaManual,
	numNota,
	dataEmissao,
	dataEntrada,
	idFornecedor,
},itens) {
	let data = {
		idEntradaManual: idEntradaManual,
		numNota: numNota,
		dataEmissao: dataEmissao,
		dataEntrada: dataEntrada,
		idFornecedor: idFornecedor,
		itens: itens
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
			alert("Erro ao editar Entrada Manual !");
		});
}

export async function ExcluirEntradaManual(idEntradaManual) {
	let data = {
		idEntradaManual
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
			alert("Erro ao deletar Entrada Manual !");
		});
}
