import { IconeEdicao, IconeLixo, IconeDuplicar } from "../../../icons/index";

import React from "react";
import SelectColumnFilter from "../../SelectColumnFilter";
import Tabela from "../Tabela";
import {
	renderizaDateTime,
	renderizaLabelSelect,
	trataArrayNull,
} from "../../../Util";

export default function TabelaProduto(props) {
	function renderizarAcoesTable({ row }) {
		const produto = row.original;

		return (
			<div>
				{props.produtoEditar ? (
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
				) : (
					false
				)}
				{props.produtoExcluir ? (
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
				) : (
					false
				)}
				{props.produtoDuplicar ? (
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
				) : (
					false
				)}
			</div>
		);
	}
	const flagExibeAcoes = props.produtoEditar || props.produtoExcluir;
	const Produtos = props.produtos;

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
			accessor: "createdAt",
			Cell: ({ row }) => renderizaDateTime(row.original.createdAt),
		},
		{
			Header: "Ações",
			Cell: ({ row }) => renderizarAcoesTable({ row }),
		},
	];

	return <Tabela columns={columns} data={data} />;
}
