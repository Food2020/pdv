import { IconeEdicao, IconeLixo, IconeDuplicar } from "../../../icons/index";

import React from "react";
import SelectColumnFilter from "../../SelectColumnFilter";
import Tabela from "../Tabela";
import {
	renderizaDateTime,
	renderizaLabelSelect,
	trataArrayNull,
	renderizaSituacao,
	renderizarSimOuNao,
} from "../../../Util";
import { Tooltip } from "@mui/material";

export default function TabelaProduto({
	categoriasOptions,
	produtoDuplicar,
	produtoEditar,
	produtoExcluir,
	produtos,
	unidadesOptions,
}) {
	function renderizarAcoesTable({ row }) {
		const produto = row.original;
		return (
			<div>
				{produtoEditar && (
					<Tooltip title="Editar" placement="top">
						<button
							onClick={() => produtoEditar(produto)}
							className={`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}
						>
							{IconeEdicao}
						</button>
					</Tooltip>
				)}
				{produtoExcluir && (
					<Tooltip title="Excluir" placement="top">
						<button
							onClick={() => produtoExcluir(produto)}
							className={`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}
						>
							{IconeLixo}
						</button>
					</Tooltip>
				)}
				{produtoDuplicar && (
					<Tooltip title="Duplicar" placement="top">
						<button
							onClick={() => produtoDuplicar(produto)}
							className={`
                        text-black
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}
						>
							{IconeDuplicar}
						</button>
					</Tooltip>
				)}
			</div>
		);
	}

	const flagExibeAcoes = produtoEditar || produtoExcluir;
	const Produtos = produtos;

	const getData = () => {
		const data = trataArrayNull(Produtos);
		return [...data];
	};

	const data = getData();
	const columns = [
		{
			Header: "Id",
			accessor: "idProduto",
		},
		{
			Header: "Código",
			accessor: "codigo",
		},
		{
			Header: "Nome",
			accessor: "nome",
		},
		{
			Header: "Cod. Barra",
			accessor: "codigoBarra",
		},
		{
			Header: "Categoria",
			accessor: (row) =>
				renderizaLabelSelect(row.categoria, categoriasOptions),
			Cell: ({ row }) =>
				renderizaLabelSelect(row.original.categoria, categoriasOptions),
		},
		{
			Header: "Unidade",
			accessor: (row) =>
				renderizaLabelSelect(row.unidade, unidadesOptions),
			Cell: ({ row }) =>
				renderizaLabelSelect(row.original.unidade, unidadesOptions),
		},
		{
			Header: "Preço",
			accessor: "preco",
		},
		{
			Header: "Composicao",
			accessor: (row) => renderizarSimOuNao(row.composicao),
		},
		{
			Header: "Venda",
			accessor: (row) => renderizarSimOuNao(row.venda),
		},
		{
			Header: "Insumo",
			accessor: (row) => renderizarSimOuNao(row.insumo),
		},
		{
			Header: "Dt criação",
			accessor: (row) => renderizaDateTime(row.createdAt),
			Cell: ({ row }) => renderizaDateTime(row.original.createdAt),
		},
		{
			Header: "Situação",
			accessor: (row) => renderizaSituacao(row.ativo),
			Cell: ({ row }) => renderizaSituacao(row.original.ativo),
		},
		{
			Header: "Ações",
			Cell: ({ row }) => renderizarAcoesTable({ row }),
		},
	];

	return <Tabela columns={columns} data={data} />;
}
