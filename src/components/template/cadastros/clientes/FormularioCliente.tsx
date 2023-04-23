import { useState } from "react";
import Cliente from "../../../../core/Cliente";
import { trataNull } from "../../../Util";
import Entrada from "../Entrada";
import {
	Button,
	Divider,
	Grid,
} from "@mui/material";
import EntradaCpfCnpj from "../EntradaCpfCnpj";
import EntradaCep from "../EntradaCep";

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
	const [razaoSocial, setRazaoSocial] = useState(
		(props.cliente?.razaoSocial || props.clienteDup?.razaoSocial) ?? ""
	);
	const [cep, setCep] = useState(
		(props.cliente?.cep || props.clienteDup?.cep) ?? ""
	);
	const [cpfCnpj, setCpfCnpj] = useState(
		(props.cliente?.cpfCnpj || props.clienteDup?.cpfCnpj) ?? ""
	);
	const [ie, setIe] = useState(
		(props.cliente?.ie || props.clienteDup?.ie) ?? ""
	);
	const [im, setIm] = useState(
		(props.cliente?.im || props.clienteDup?.im) ?? ""
	);
	const [endereco, setEndereco] = useState(
		(props.cliente?.endereco || props.clienteDup?.endereco) ?? ""
	);
	const [bairro, setBairro] = useState(
		(props.cliente?.bairro || props.clienteDup?.bairro) ?? ""
	);
	const [cidade, setCidade] = useState(
		(props.cliente?.cidade || props.clienteDup?.cidade) ?? ""
	);
	const [fone, setFone] = useState(
		(props.cliente?.fone || props.clienteDup?.fone) ?? ""
	);
	const [uf, setUf] = useState(
		(props.cliente?.uf || props.clienteDup?.uf) ?? ""
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
		setEndereco(data.logradouro);
		setBairro(data.bairro);
		setCidade(data.localidade);
		setUf(data.uf);
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
				<Entrada
					texto="Razão social"
					valor={razaoSocial}
					valorMudou={setRazaoSocial}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Tipo" valor={tipo} valorMudou={setTipo} />
			</Grid>
			<Grid item xs={12} md={3}>
				<EntradaCpfCnpj
					texto="CPF/CNPJ"
					valor={cpfCnpj}
					valorMudou={setCpfCnpj}
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="IE" valor={ie} valorMudou={setIe} />
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="IM" valor={im} valorMudou={setIm} />
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="Fone" valor={fone} valorMudou={setFone} />
			</Grid>
			<Grid item xs={12}>
				<Divider textAlign="left">Endereço</Divider>
			</Grid>
			<Grid item xs={12} md={2}>
				<EntradaCep
					valor={cep}
					valorMudou={setCep}
					changeAddress={changeAddress}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Endereço" valor={endereco} valorMudou={setEndereco} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Bairro" valor={bairro} valorMudou={setBairro} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Entrada texto="Cidade" valor={cidade} valorMudou={setCidade} />
			</Grid>
			<Grid item xs={12} md={2}>
				<Entrada texto="UF" valor={uf} valorMudou={setUf} />
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
					onClick={() =>
						props.salvarCliente?.({
							bairro,
							cep,
							cidade,
							complemento,
							cpfCnpj,
							endereco,
							fone,
							uf,
							id,
							ie,
							im,
							nome,
							numero,
							razaoSocial,
							tipo,
						})
					}
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
