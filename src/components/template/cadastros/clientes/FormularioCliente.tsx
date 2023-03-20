import { useState } from "react";
import Cliente from "../../../../core/Cliente";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada";
interface FormularioClienteProps {
	cliente: Cliente;
	categoriaMudou?: (cliente: Cliente) => void;
	cancelado?: () => void;
}

export default function FormularioCliente(props) {
	const id = trataNull(props.cliente?.id);
	const [nome, setNome] = useState(
		(props.cliente?.nome || props.clienteDup?.nome) ?? ""
	);
	const [enderecos, setEnderecos] = useState(
		(props.cliente?.enderecos || props.clienteDup?.enderecos) ?? []
	);

	const [cep, setCep] = useState(
		(props.cliente?.cep || props.clienteDup?.cep) ?? ""
	);
	const [logradouro, setLogradouro] = useState(
		(props.cliente?.logradouro || props.clienteDup?.logradouro) ?? ""
	);
	const [bairro, setBairro] = useState(
		(props.cliente?.bairro || props.clienteDup?.bairro) ?? ""
	);
	const [cidade, setCidade] = useState(
		(props.cliente?.cidade || props.clienteDup?.cidade) ?? ""
	);
	const [estado, setEstado] = useState(
		(props.cliente?.estado || props.clienteDup?.estado) ?? ""
	);
    const [numero, setNumero] = useState(
		(props.cliente?.numero || props.clienteDup?.numero) ?? ""
	);
	const [complemento, setComplemento] = useState(
		(props.cliente?.complemento || props.clienteDup?.complemento) ?? ""
	);
	const [obs, setObs] = useState(
		(props.cliente?.obs || props.clienteDup?.obs) ?? ""
	);

	return (
		<div>
			<div className="grid grid-cols-12">
				<Entrada
					texto="Nome"
					valor={nome}
					valorMudou={setNome}
					className="col-span-4"
				/>
			</div>
			<div className="grid grid-cols-12">
				<Entrada
					texto="Cep"
					valor={cep}
					valorMudou={setCep}
					className="col-span-2"
				/>
				<Entrada
					texto="Logradouro"
					valor={logradouro}
					valorMudou={setLogradouro}
					className="col-span-2"
				/>
                <Entrada
					texto="Bairro"
					valor={bairro}
					valorMudou={setBairro}
					className="col-span-2"
				/>
                <Entrada
					texto="Cidade"
					valor={cidade}
					valorMudou={setCidade}
					className="col-span-2"
				/>
			</div>
			<div className="grid grid-cols-12">
				<table>
					<thead>
						<tr>
							<th>CEP</th>
							<th>LOGRADOURO</th>
							<th>BAIRRO</th>
							<th>CIDADE</th>
							<th>ESTADO</th>
							<th>COMPLEMENTO</th>
							<th>OBS</th>
						</tr>
					</thead>
					<tbody>
						{enderecos.map((item, index) => (
							<tr key={index}>
								<td>{item.cep}</td>
								<td>{item.logradouro}</td>
								<td>{item.bairro}</td>
								<td>{item.cidade}</td>
								<td>{item.estado}</td>
								<td>{item.complemento}</td>
								<td>{item.obs}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-end mt-4">
				<Botao
					cor="indigo-500"
					className="mr-2"
					onClick={() => props.salvarCliente?.({ id, nome })}
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
