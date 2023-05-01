import FormularioParceiro from "../../components/template/cadastros/parceiros/FormularioParceiro";
import TabelaParceiro from "../../components/template/cadastros/parceiros/TabelaParceiro";
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout";
import Parceiro from "../../core/Parceiro";
import UseParceiro from "../../hooks/UseParceiro";
import Botao from "../../components/template/cadastros/Botao";

export default function telaParceiro() {
	const {
		exibirTabela,
		tabelaVisivel,
		novoParceiro,
		salvarParceiro,
		Parceiros,
		Parceiro,
		editarParceiro,
		excluirParceiro,
		duplicarParceiro,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		ParceiroDup,
	} = UseParceiro();

	return (
		<Layout titulo="Parceiro" subtitulo="Grenciamento de Parceiros">
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Botao
								cor="indigo-500"
								className="mb-4"
								onClick={() => novoParceiro()}
							>
								Novo Parceiro
							</Botao>
						</div>
						<TabelaParceiro
							parceiros={Parceiros}
							parceiroEditar={editarParceiro}
							parceiroExcluir={excluirParceiro}
							parceiroDuplicar={duplicarParceiro}
							ordenacao={ordenacao}
							setOrdenacao={setOrdenacao}
							alterarOrdenacao={alterarOrdenacao}
							getClassNamesFor={getClassNamesFor}
						/>
					</>
				) : (
					<>
						<FormularioParceiro
							parceiro={Parceiro}
							parceiroDup={ParceiroDup}
							salvarParceiro={salvarParceiro}
							exibirTabela={() => exibirTabela()}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
