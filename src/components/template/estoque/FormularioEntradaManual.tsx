import { useState } from "react";
import { trataNull } from "../../../components/Util";
import Entrada from "../cadastros/Entrada";
import { Button, Divider, Grid } from "@mui/material";

export default function FormularioEntradaManual(props) {
	const id = trataNull(props.produto?.id);

	return (
		<>
			<Grid item xs={12} md={3}>
				{id ? (
					<Entrada
						somenteLeitura
						texto="Id"
						valor={id}
						className="col-span-12"
					/>
				) : (
					false
				)}
			</Grid>
			<Grid item xs={12}>
				<Button type="button" variant="contained" color="primary">
					Salvar
				</Button>
			</Grid>
		</>
	);
}
