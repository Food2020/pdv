import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import FormularioEntradaManual from "../../components/template/estoque/FormularioEntradaManual";
import Layout from "../../components/template/Layout";
import { format } from "date-fns";
import UseEstoque from "../../hooks/estoque/UseEstoque";
import { Button } from "@mui/material";
import TabelaEntradaManual from "../../components/template/estoque/TabelaEntradaManual";

export default function telaEntradaManual() {

	const {
		detalheEntradaManual,
		EntradasManuais,
		FornecedoresOptions,
		novoEntradaManual,
		salvarEntradaManual,
		excluirEntradaManual,
		detalhe,
		tabelaVisivel,
		exibirTabela,
		values,
		setValues,
	} = UseEstoque();

	return (
		<Layout titulo="Entrada manual" subtitulo="Entrada manual de estoque">
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Button
								type="button"
								variant="contained"
								color="primary"
								onClick={() => novoEntradaManual()}
							>
							Nova Entrada
							</Button>
						</div>
						<TabelaEntradaManual
							entradasManuais={EntradasManuais}
							detalheEntradaManual={detalheEntradaManual}
							excluirEntradaManual={excluirEntradaManual}
						/>
					</>
				) : (
					<>
						<FormularioEntradaManual
							detalhe={detalhe}
							FornecedoresOptions={FornecedoresOptions}
							salvarEntradaManual={salvarEntradaManual}
							exibirTabela={() => exibirTabela()}
							values={values}
							setValues={setValues}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
