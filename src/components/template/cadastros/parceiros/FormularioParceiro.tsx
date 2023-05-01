import { useState } from "react";
import Parceiro from "../../../../core/Parceiro";
import { trataNull, optionToValue, valueToOption } from "../../../Util";
import Entrada from "../Entrada";
import { Button, Divider, Grid } from "@mui/material";
import EntradaCpfCnpj from "../EntradaCpfCnpj";
import EntradaCep from "../EntradaCep";
import Selecao from "../Selecao";

interface FormularioParceiroProps {
	parceiro: Parceiro;
	categoriaMudou?: (parceiro: Parceiro) => void;
	cancelado?: () => void;
}

export default function FormularioParceiro(props) {
	const id = trataNull(props.parceiro?.id);
	const [nome, setNome] = useState(
		(props.parceiro?.nome || props.parceiroDup?.nome) ?? ""
	);
	const [razaoSocial, setRazaoSocial] = useState(
		(props.parceiro?.razaoSocial || props.parceiroDup?.razaoSocial) ?? ""
	);
	const [cep, setCep] = useState(
		(props.parceiro?.cep || props.parceiroDup?.cep) ?? ""
	);
	const [cpfCnpj, setCpfCnpj] = useState(
		(props.parceiro?.cpfCnpj || props.parceiroDup?.cpfCnpj) ?? ""
	);
	const [ie, setIe] = useState(
		(props.parceiro?.ie || props.parceiroDup?.ie) ?? ""
	);
	const [im, setIm] = useState(
		(props.parceiro?.im || props.parceiroDup?.im) ?? ""
	);
	const [endereco, setEndereco] = useState(
		(props.parceiro?.endereco || props.parceiroDup?.endereco) ?? ""
	);
	const [bairro, setBairro] = useState(
		(props.parceiro?.bairro || props.parceiroDup?.bairro) ?? ""
	);
	const [cidade, setCidade] = useState(
		(props.parceiro?.cidade || props.parceiroDup?.cidade) ?? ""
	);
	const [fone, setFone] = useState(
		(props.parceiro?.fone || props.parceiroDup?.fone) ?? ""
	);
	const [uf, setUf] = useState(
		(props.parceiro?.uf || props.parceiroDup?.uf) ?? ""
	);
	const [numero, setNumero] = useState(
		(props.parceiro?.numero || props.parceiroDup?.numero) ?? ""
	);
	const [complemento, setComplemento] = useState(
		(props.parceiro?.complemento || props.parceiroDup?.complemento) ?? ""
	);
	const [tipo, setTipo] = useState(
		(valueToOption(props.parceiro?.tipo, true) ||
			valueToOption(props.parceiroDup?.tipo, true)) ??
			null
	);

	const changeAddress = (data) => {
		setEndereco(data.logradouro);
		setBairro(data.bairro);
		setCidade(data.localidade);
		setUf(data.uf);
	};

	const tipoParceiroOptions = [
		{
			value: "Parceiro",
			label: "Parceiro",
		},
		{
			value: "Fornecedor",
			label: "Fornecedor",
		},
	];

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
				<Selecao
					options={tipoParceiroOptions}
					valorMudou={setTipo}
					valor={tipo}
					texto="Tipo"
					isMulti={true}
					className="col-span-4"
				/>
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
						props.salvarParceiro?.({
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
							tipo: optionToValue(tipo, true),
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
