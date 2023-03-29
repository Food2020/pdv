import FormularioUnidade from "../../components/template/cadastros/unidade_medida/FormularioUnidade";
import TabelaUnidade from "../../components/template/cadastros/unidade_medida/TabelaUnidade";
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout";
import Unidade from "../../core/Unidade";
import UseUnidade from "../../hooks/UseUnidade";
import Botao from "../../components/template/cadastros/Botao";

export default function telaUnidade() {
	const {
		exibirTabela,
		tabelaVisivel,
		novoUnidade,
		salvarUnidade,
		Unidades,
		Unidade,
		editarUnidade,
		excluirUnidade,
		duplicarUnidade,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		UnidadeDup,
	} = UseUnidade();

	return (
		<Layout titulo="Unidade" subtitulo="Grenciamento de Unidade de Medida">
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Botao
								cor="indigo-500"
								className="mb-4"
								onClick={() => novoUnidade()}
							>
								Nova Unidade de Medida
							</Botao>
						</div>
						<TabelaUnidade
							unidades={Unidades}
							unidadeEditar={editarUnidade}
							unidadeExcluir={excluirUnidade}
							unidadeDuplicar={duplicarUnidade}
							ordenacao={ordenacao}
							setOrdenacao={setOrdenacao}
							alterarOrdenacao={alterarOrdenacao}
							getClassNamesFor={getClassNamesFor}
						/>
					</>
				) : (
					<>
						<FormularioUnidade
							unidade={Unidade}
							unidadeDup={UnidadeDup}
							salvarUnidade={salvarUnidade}
							exibirTabela={() => exibirTabela()}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
