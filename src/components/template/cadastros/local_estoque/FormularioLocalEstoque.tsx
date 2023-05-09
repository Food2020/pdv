import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Funcao from "../../../../core/Funcao";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada";

interface MessageProps {
	ativo?: boolean;
	message?: String;
}

export default function FormularioLocalEstoque({
    local_estoque,
    local_estoqueDup,
    salvarLocalEstoque,
    exibirTabela
}) {
	const id = trataNull(local_estoque?.id);
	const [nome, setNome] = useState(
		(local_estoque?.nome || local_estoqueDup?.nome) ?? ""
	);
	const [descricao, setDescricao] = useState(
		(local_estoque?.descricao || local_estoqueDup.descricao) ?? ""
	)

	const [mostrarMensagem, setMostrarMensagem] = useState<MessageProps>({
		ativo: false,
		message: "",
	});

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		salvarLocalEstoque?.({ id, nome,descricao })
			.then((response) => {
				const msg =
					response?.method === "PUT"
						? "Editado com Sucesso!"
						: "Cadastrado com Sucesso!";
				setMostrarMensagem({
					ativo: true,
					message: msg,
				});
		setOpen(true);

			})
			.catch((err) => err);


		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<div>
			{mostrarMensagem.ativo && (
				<>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert severity="success" sx={{ width: "100%" }}>
						{mostrarMensagem.message}
					</Alert>
				</Snackbar>
				</>
			)}
			<div className="grid grid-cols-1 md:grid-cols-4">
				<Entrada
					texto="Nome"
					valor={nome}
					valorMudou={setNome}
					className="col-span-4"
				/>
				<Entrada
					texto="Descricao"
					tipo="textarea"
					valor={descricao}
					valorMudou={setDescricao}
					className="col-span-4"
				/>
			</div>
			<div className="flex justify-end mt-4">
				<Botao
					cor="indigo-500"
					className="mr-2"
					onClick={() => {
						handleClick();
					}}
				>
					{id ? "Alterar" : "Salvar"}
				</Botao>
				<Botao cor="red-600" onClick={exibirTabela}>
					Voltar
				</Botao>
			</div>
		</div>
	);
}
