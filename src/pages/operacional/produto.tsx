import FormularioProduto from "../../components/template/cadastros/produtos/FormularioProduto";
import TabelaProduto from "../../components/template/cadastros/produtos/TabelaProduto";
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout";
import Produto from "../../core/Produto";
import UsePoduto from "../../hooks/UseProduto";
import Botao from "../../components/template/cadastros/Botao";
import UseCategoria from "../../hooks/UseCategoria";
import UseUnidade from "../../hooks/UseUnidade";
import UseLocalEstoque from "../../hooks/UseLocalEstoque";

export default function telaProduto() {
	const {
		exibirTabela,
		tabelaVisivel,
		novoProduto,
		salvarProduto,
		Produtos,
		Produto,
		editarProduto,
		excluirProduto,
		duplicarProduto,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		ProdutoDup,
		ProdutosOptions,
		InsumosOptions,
	} = UsePoduto();
	const { CategoriasOptions } = UseCategoria();
	const { Unidades,UnidadesOptions } = UseUnidade();
	const { LocalEstoquesOptions } = UseLocalEstoque();

	return (
		<Layout titulo="Produto" subtitulo="Gerenciamento de produtos">
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Botao
								cor="indigo-500"
								className="mb-4"
								onClick={() => novoProduto()}
							>
								Novo Produto
							</Botao>
						</div>
						<TabelaProduto
							produtos={Produtos}
							produtoEditar={editarProduto}
							categoriasOptions={CategoriasOptions}
							unidadesOptions={UnidadesOptions}
							produtoExcluir={excluirProduto}
							produtoDuplicar={duplicarProduto}
							ordenacao={ordenacao}
							setOrdenacao={setOrdenacao}
							alterarOrdenacao={alterarOrdenacao}
							getClassNamesFor={getClassNamesFor}
						/>
					</>
				) : (
					<>
						<FormularioProduto
							produtos={Produtos}
							produto={Produto}
							localEstoqueOptions={LocalEstoquesOptions}
							categoriasOptions={CategoriasOptions}
							produtoOptions={InsumosOptions}
							unidadesOptions={UnidadesOptions}
							unidades={Unidades}
							produtoDup={ProdutoDup}
							salvarProduto={salvarProduto}
							exibirTabela={() => exibirTabela()}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
