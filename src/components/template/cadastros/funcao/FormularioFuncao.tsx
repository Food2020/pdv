import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Funcao from "../../../../core/Funcao";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada";
interface FormularioFuncaoProps {
	funcao: Funcao;
	funcaoMudou?: (funcao: Funcao) => void;
	cancelado?: () => void;
}

interface MessageProps {
	ativo?: boolean;
	message?: String;
}

export default function FormularioFuncao(props) {
	const id = trataNull(props.funcao?.id);
	const [nome, setNome] = useState(
		(props.funcao?.nome || props.funcaoDup?.nome) ?? ""
	);

	const [mostrarMensagem, setMostrarMensagem] = useState<MessageProps>({
		ativo: false,
		message: "",
	});

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		props
			.salvarFuncao?.({ id, nome })
			.then((response) => {
				const msg =
					response?.method === "PUT"
						? "Editado com Sucesso!"
						: "Cadastrado com Sucesso!";
						console.log(" ALo123")
				setMostrarMensagem({
					ativo: true,
					message: msg,
				});
		setOpen(true);

			})
			.catch((err) => err);

		console.log("dentro", mostrarMensagem);

		// setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	console.log("fora", mostrarMensagem);
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
				<Botao cor="red-600" onClick={props.exibirTabela}>
					Voltar
				</Botao>
			</div>
		</div>
	);
}
