import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";
import { IconeLixo } from "../../../components/icons/index";
import { makeStyles } from "@mui/styles";

function ccyFormat(num: number) {
	return `${num.toFixed(2)}`;
}

function totalProd(qtd: number, valor_unit: number) {
	return Number(qtd) * Number(valor_unit);
}

function subtotal(items) {
	return items
		.map(({ qtd, valor_unit }) => totalProd(qtd, valor_unit))
		.reduce((sum, i) => sum + i, 0);
}
const useStyles = makeStyles({
	tableHeader: {
		backgroundColor: "#6366F1",
	},
	whiteText: {
		color: "white", // Defina a cor do texto como branco
	},
	tableRowStriped: {
		backgroundColor: "#f5f5f5",
	},
});

export default function TabelaProdutos({ detalhe,itens, setItens }) {
	const invoiceSubtotal = subtotal(itens);
	const classes = useStyles();

	function excluirProduto(itens, index) {
		if (index !== -1) {
			const newItens = [...itens]; // Crie uma cópia do array existente
			newItens.splice(index, 1);
			setItens(newItens);
		} else {
			alert("Erro ao excluir !");
		}
	}
	console.log("itens", itens);
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 500 }} aria-label="spanning table">
				<TableHead>
					<TableRow className={classes.tableHeader}>
						<TableCell align="left" colSpan={3} className={classes.whiteText}>
							Detalhe
						</TableCell>
						<TableCell align="right" colSpan={2} className={classes.whiteText}>
							Preço
						</TableCell>
					</TableRow>
					<TableRow className={classes.tableHeader}>
						<TableCell></TableCell>
						<TableCell className={classes.whiteText}>Produto</TableCell>
						<TableCell align="right" className={classes.whiteText}>
							Qtd
						</TableCell>
						<TableCell align="right" className={classes.whiteText}>
							Valor unit
						</TableCell>
						<TableCell align="right" className={classes.whiteText}>
							Valor
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{itens.map(({ produto, qtd, valor_unit }, index) => (
						<TableRow
							key={produto.value}
							className={index % 2 === 0 ? classes.tableRowStriped : ""}
						>
							<TableCell>
								{!detalhe && (
								<Tooltip title="Excluir" placement="top">
									<button
										onClick={() => excluirProduto(itens, index)}
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
							</TableCell>
							<TableCell>{produto.label}</TableCell>
							<TableCell align="right">{qtd}</TableCell>
							<TableCell align="right">{valor_unit}</TableCell>
							<TableCell align="right">{totalProd(qtd, valor_unit)}</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell colSpan={4}>Total</TableCell>
						<TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
