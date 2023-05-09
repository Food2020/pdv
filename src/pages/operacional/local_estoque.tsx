import FormularioLocalEstoque from "../../components/template/cadastros/local_estoque/FormularioLocalEstoque";
import TabelaLocalEstoque from "../../components/template/cadastros/local_estoque/TabelaLocalEstoque";
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout";
import UseLocalEstoque from "../../hooks/UseLocalEstoque";
import Botao from "../../components/template/cadastros/Botao";

export default function telaLocalEstoque() {
	const {
		exibirTabela,
		tabelaVisivel,
		novoLocalEstoque,
		salvarLocalEstoque,
		LocalEstoque,
		LocalEstoques,
		editarLocalEstoque,
		excluirLocalEstoque,
		duplicarLocalEstoque,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		LocalEstoqueDup,
	} = UseLocalEstoque();

	return (
		<Layout titulo="Local Estoque" subtitulo="Grenciamento de Local Estoque">
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Botao
								cor="indigo-500"
								className="mb-4"
								onClick={() => novoLocalEstoque()}
							>
								Nova Função
							</Botao>
						</div>
						<TabelaLocalEstoque
							local_estoque={LocalEstoques}
							local_estoqueEditar={editarLocalEstoque}
							local_estoqueExcluir={excluirLocalEstoque}
							local_estoqueDuplicar={duplicarLocalEstoque}
							ordenacao={ordenacao}
							setOrdenacao={setOrdenacao}
							alterarOrdenacao={alterarOrdenacao}
							getClassNamesFor={getClassNamesFor}
						/>
					</>
				) : (
					<>
						<FormularioLocalEstoque
							local_estoque={LocalEstoque}
							local_estoqueDup={LocalEstoqueDup}
							salvarLocalEstoque={salvarLocalEstoque}
							exibirTabela={() => exibirTabela()}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
