import { IconeEdicao, IconeLixo, IconeDuplicar } from "../../../icons/index";

import React from "react";
import SelectColumnFilter from "../../SelectColumnFilter";
import Tabela from "../Tabela";
import {
	renderizaDateTime,
	renderizaLabelSelect,
	trataArrayNull,
	renderizaSituacao
} from "../../../Util";
import { Tooltip } from "@mui/material";

export default function TabelaProduto(props) {
	function renderizarAcoesTable({ row }) {
		const produto = row.original;

		return (
			<div>
				{props.produtoEditar && (
					<Tooltip title="Editar" placement="top">
						<button
						onClick={() => props.produtoEditar(produto)}
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
				) 
				}
				{props.produtoExcluir && (
					
					<Tooltip title="Excluir" placement="top">
						<button
						onClick={() => props.produtoExcluir(produto)}
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
				) }
				{props.produtoDuplicar &&(
					<Tooltip title="Duplicar" placement="top">
						<button
						onClick={() => props.produtoDuplicar(produto)}
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
				) }
			</div>
		);
	}
	const flagExibeAcoes = props?.produtoEditar || props?.produtoExcluir;
	const Produtos = props?.produtos?.json;
	const getData = () => {
		const data = trataArrayNull(Produtos);
		return [...data];
	};

	const data = getData();
	const columns = [
		{
			Header: "Id",
			accessor: "id",
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
			accessor: row => renderizaLabelSelect(row.categoria, props.categoriasOptions),
			Cell: ({ row }) =>
				renderizaLabelSelect(row.original.categoria, props.categoriasOptions),
		},
		{
			Header: "Unidade",
			accessor: row => renderizaLabelSelect(row.unidade, props.unidadesOptions),
			Cell: ({ row }) =>
				renderizaLabelSelect(row.original.unidade, props.unidadesOptions),
		},
		{
			Header: "Preço",
			accessor: "preco",
		},
		{
			Header: "Dt criação",
			accessor: row => renderizaDateTime(row.createdAt),
			Cell: ({ row }) => renderizaDateTime(row.original.createdAt),
		},
		{
			Header: "Situação",
			accessor: row => renderizaSituacao(row.ativo),
			Cell: ({ row }) =>
			renderizaSituacao(row.original.ativo),
		},
		{
			Header: "Ações",
			Cell: ({ row }) => renderizarAcoesTable({ row }),
		},
	];

	return <Tabela columns={columns} data={data} />;
}
