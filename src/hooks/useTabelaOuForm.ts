import { useState } from "react";

export default function useTabelaOuForm() {
	const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
	const [ordenacao, setOrdenacao] = useState(null);
	const [totalPaginas, setTotalPaginas] = useState(1);
	const [totalRegistros, setTotalRegistros] = useState(1);

	const alterarOrdenacao = (chave) => {
		let direcao = "ascending";
		if (
			ordenacao &&
			ordenacao.chave === chave &&
			ordenacao.direcao === "ascending"
		) {
			direcao = "descending";
		}
		setOrdenacao({ chave, direcao });
	};

	const getClassNamesFor = (nome) => {
		if (!ordenacao) {
			return;
		}
		return ordenacao.chave === nome ? ordenacao.direcao : undefined;
	};

	const exibirTabela = () => setVisivel("tabela");
	const exibirFormulario = () => setVisivel("form");

	return {
		formularioVisivel: visivel === "form",
		tabelaVisivel: visivel === "tabela",
		exibirTabela,
		exibirFormulario,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
	};
}
