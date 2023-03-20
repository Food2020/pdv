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
			<div className="grid grid-cols-4">
				<Entrada
					texto="Nome"
					valor={nome}
					valorMudou={setNome}
					className="col-span-4"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-5">
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
				<Entrada
					texto="Estado"
					valor={estado}
					valorMudou={setEstado}
					className="col-span-2"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-5">
				<Entrada
					texto="Número"
					valor={numero}
					valorMudou={setNumero}
					className="col-span-2"
					/>
				<Entrada
					texto="Complemento"
					valor={complemento}
					valorMudou={setComplemento}
					className="col-span-2"
					/>
				<Entrada
					texto="Obs"
					valor={obs}
					valorMudou={setObs}
					className="col-span-2"
					/>
			</div>
			<div className="grid grid-cols-1">
				<div>
					<table className="table-auto border border-gray-300 border-collapse">
						<thead>
							<tr>
								<th className="px-4 py-2 border border-gray-300">CEP</th>
								<th className="px-4 py-2 border border-gray-300">LOGRADOURO</th>
								<th className="px-4 py-2 border border-gray-300">BAIRRO</th>
								<th className="px-4 py-2 border border-gray-300">CIDADE</th>
								<th className="px-4 py-2 border border-gray-300">ESTADO</th>
								<th className="px-4 py-2 border border-gray-300">COMPLEMENTO</th>
								<th className="px-4 py-2 border border-gray-300">OBS</th>
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
							{enderecos.length === 0 && (
								<tr key={1} >
									<td colSpan={7}>Nenhum registro adicionado</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
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
