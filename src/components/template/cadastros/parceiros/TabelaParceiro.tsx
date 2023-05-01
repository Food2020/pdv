import { IconeEdicao, IconeLixo, IconeDuplicar } from "../../../icons/index";

import React from "react";
import SelectColumnFilter from "../../SelectColumnFilter";
import Tabela from "../Tabela";
import { renderizaSituacao, trataArrayNull } from "../../../Util";
import { Tooltip } from "@mui/material";

export default function TabelaParceiro(props) {
	function renderizarAcoesTable({ row }) {
		const parceiro = row.original;

		return (
			<div>
				{props.parceiroEditar && (
					<Tooltip title="Editar" placement="top">
						<button
							onClick={() => props.parceiroEditar(parceiro)}
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
				{props.parceiroExcluir && (
					<Tooltip title="Excluir" placement="top">
						<button
							onClick={() => props.parceiroExcluir(parceiro)}
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
				{props.parceiroDuplicar && (
					<Tooltip title="Duplicar" placement="top">
						<button
							onClick={() => props.parceiroDuplicar(parceiro)}
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

	const flagExibeAcoes = props.parceiroEditar || props.parceiroExcluir;
	const Parceiros = props.parceiros;

	const getData = () => {
		const data = trataArrayNull(Parceiros);
		return [...data];
	};

	const data = getData();

	const columns = React.useMemo(
		() => [
			{
				Header: "Id",
				accessor: "id",
			},
			{
				Header: "Nome",
				accessor: "nome",
				Filter: SelectColumnFilter, // new
				filter: "includes", // new
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
		],
		[]
	);
	return <Tabela columns={columns} data={data} />;
}
