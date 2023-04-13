import { useState } from "react";
import Cliente from "../../../../core/Cliente";
import { trataNull } from "../../../Util";
import Entrada from "../Entrada";
import {
	Button,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import EntradaCpfCnpj from "../EntradaCpfCnpj";

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
	const [razao, setRazao] = useState(
		(props.cliente?.razao || props.clienteDup?.razao) ?? ""
	);
	const [cep, setCep] = useState(
		(props.cliente?.cep || props.clienteDup?.cep) ?? ""
	);
	const [cpf, setCpf] = useState(
		(props.cliente?.cpf || props.clienteDup?.cpf) ?? ""
	);
	const [ie, setIe] = useState(
		(props.cliente?.ie || props.clienteDup?.ie) ?? ""
	);
	const [im, setIm] = useState(
		(props.cliente?.im || props.clienteDup?.im) ?? ""
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
	const [tipo, setTipo] = useState(
		(props.cliente?.tipo || props.clienteDup?.tipo) ?? ""
	);

	const changeAddress = (data) => {
		setLogradouro(data.logradouro)
		setBairro(data.bairro)
		setCidade(data.localidade)
		setEstado(data.uf)
	}

	const handleSearch = () => {
		if(cep.length === 8){
			fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then(response => response.json())
			.then(data => changeAddress(data))
			.catch(error => console.error(error));
		}
	  };
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Divider textAlign="left">Informações</Divider>
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Nome" valor={nome} valorMudou={setNome} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Razão social" valor={razao} valorMudou={setRazao} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Tipo" valor={tipo} valorMudou={setTipo} />
			</Grid>
			<Grid item xs={12} md={3}>
				<EntradaCpfCnpj texto="CPF/CNPJ" valor={cpf} valorMudou={setCpf} />
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="IE" valor={ie} valorMudou={setIe} />
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="IM" valor={im} valorMudou={setIm} />
			</Grid>
			<Grid item xs={12}>
				<Divider textAlign="left">Endereço</Divider>
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="Cep" valor={cep} valorMudou={setCep} onKeyUp = {handleSearch} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada
					texto="Logradouro"
					valor={logradouro}
					valorMudou={setLogradouro}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Bairro" valor={bairro} valorMudou={setBairro} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Cidade" valor={cidade} valorMudou={setCidade} />
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="UF" valor={estado} valorMudou={setEstado} />
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="Número" valor={numero} valorMudou={setNumero} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada
					texto="Complemento"
					valor={complemento}
					valorMudou={setComplemento}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button
					type="button"
					variant="contained"
					color="primary"
					onClick={() => props.salvarCliente?.({ id, nome })}
				>
					{id ? "Alterar" : "Salvar"}
				</Button>
				<Button
					type="button"
					variant="contained"
					color="error"
					onClick={props.exibirTabela}
				>
					Voltar
				</Button>
			</Grid>
		</Grid>
	);
}
