import { IconeBloqueio, IconeDetalhe, IconeLixo } from "../../icons/index";

import React, { useState } from "react";
import Tabela from "../cadastros/Tabela";
import { trataArrayNull } from "../../Util";
import {
	Box,
	Button,
	Chip,
	Divider,
	Grid,
	Modal,
	Tooltip,
} from "@mui/material";
import { format } from "date-fns";

export default function TabelaParceiro({
	entradasManuais,
	detalheEntradaManual,
	excluirEntradaManual,
}) {
	function renderizarAcoesTable({ row }) {
		const entradaManual = row.original;

		return (
			<div>
				{detalheEntradaManual && (
					<Tooltip title="Detalhe" placement="top">
						<button
							onClick={() => detalheEntradaManual(entradaManual)}
							className={`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}
						>
							{IconeDetalhe}
						</button>
					</Tooltip>
				)}
				{excluirEntradaManual && (
					<Tooltip title="Cancelar" placement="top">
						<button
							onClick={handleOpen}
							className={`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}
						>
							{IconeBloqueio}
						</button>
					</Tooltip>
				)}
			</div>
		);
	}

	function renderizarStatus(value) {
		const arrStatus = [
			{
				desc: "",
				color: "default",
			},
			{
				desc: "Pendente",
				color: "primary",
			},
			{
				desc: "Aprovado",
				color: "success",
			},
			{
				desc: "Rejeitado",
				color: "error",
			},
			{
				desc: "Cancelado",
				color: "default",
			},
		];

		return (
			<Tooltip title={arrStatus[value].desc} placement="top">
				<Chip
					label={arrStatus[value].desc}
					color={arrStatus[value].color}
					variant="outlined"
				/>
			</Tooltip>
		);
	}

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const EntradasManuais = trataArrayNull(entradasManuais);
	const data = [...EntradasManuais];

	const columns = React.useMemo(
		() => [
			{
				Header: "Id",
				accessor: "idEntradaManual",
			},
			{
				Header: "Num nota",
				accessor: "numNota",
			},
			{
				Header: "Fornecedor",
				accessor: "idFornecedor",
			},
			{
				Header: "Data Entrada",
				accessor: "dataEntrada",
				Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
			},
			{
				Header: "Data Emissão",
				accessor: "dataEmissao",
				Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ value }) => renderizarStatus(value),
			},
			{
				Header: "Ações",
				Cell: ({ row }) => renderizarAcoesTable({ row }),
			},
		],
		[]
	);
	return (
		<>
			<Tabela columns={columns} data={data} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-8 max-w-md">
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Divider textAlign="left">Cancelar entrada</Divider>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="error" onClick={handleClose}>
								Fechar
							</Button>
							<Button type="submit" variant="contained" color="primary">
								Salvar
							</Button>
						</Grid>
					</div>
				</div>
			</Modal>
		</>
	);
}
