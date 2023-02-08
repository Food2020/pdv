import FormularioCliente from "../../components/template/cadastros/clientes/FormularioCliente";
import TabelaCliente from "../../components/template/cadastros/clientes/TabelaCliente";
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout";
import Cliente from "../../core/Cliente";
import UseCliente from "../../hooks/UseCliente";
import Botao from "../../components/template/cadastros/Botao";

export default function telaCliente() {
	const {
		exibirTabela,
		tabelaVisivel,
		novoCliente,
		salvarCliente,
		Clientes,
		Cliente,
		editarCliente,
		excluirCliente,
		duplicarCliente,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		ClienteDup,
	} = UseCliente();

	return (
		<Layout titulo="Cliente" subtitulo="Grenciamento de Clientes">
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Botao
								cor="indigo-500"
								className="mb-4"
								onClick={() => novoCliente()}
							>
								Novo Cliente
							</Botao>
						</div>
						<TabelaCliente
							clientes={Clientes}
							clienteEditar={editarCliente}
							clienteExcluir={excluirCliente}
							clienteDuplicar={duplicarCliente}
							ordenacao={ordenacao}
							setOrdenacao={setOrdenacao}
							alterarOrdenacao={alterarOrdenacao}
							getClassNamesFor={getClassNamesFor}
						/>
					</>
				) : (
					<>
						<FormularioCliente
							cliente={Cliente}
							clienteDup={ClienteDup}
							salvarCliente={salvarCliente}
							exibirTabela={() => exibirTabela()}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
