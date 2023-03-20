import { useState } from "react";
import Unidade from "../../../../core/Unidade";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada";
interface FormularioUnidadeProps {
	unidade: Unidade;
	unidadeMudou?: (unidade: Unidade) => void;
	cancelado?: () => void;
}

export default function FormularioUnidade(props) {
	const id = trataNull(props.unidade?.id);
	const [nome, setNome] = useState(
		(props.unidade?.nome || props.unidadeDup?.nome) ?? ""
	);

	return (
		<div>
			<div className="grid grid-cols-4">
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
					onClick={() => props.salvarUnidade?.({ id, nome })}
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
