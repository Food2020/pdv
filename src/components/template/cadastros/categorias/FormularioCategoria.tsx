import { useState } from "react";
import Categoria from "../../../../core/Categoria";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada";
interface FormularioCategoriaProps {
	categoria: Categoria;
	categoriaMudou?: (categoria: Categoria) => void;
	cancelado?: () => void;
}

export default function FormularioCategoria(props) {
	const id = trataNull(props.categoria?.id);
	const [nome, setNome] = useState(
		(props.categoria?.nome || props.categoriaDup?.nome) ?? ""
	);

	return (
		<div>
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
					onClick={() => props.salvarCategoria?.({ id, nome })}
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
