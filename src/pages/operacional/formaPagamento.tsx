import FormularioFormaPagamento from "../../components/template/cadastros/forma_pagamento/FormularioFormaPagamento";
import TabelaFormaPagamento from "../../components/template/cadastros/forma_pagamento/TabelaFormaPagamento";
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout";
import FormaPagamento from "../../core/FormaPagamento";
import UseFormaPagamento from "../../hooks/UseFormaPagamento";
import Botao from "../../components/template/cadastros/Botao";

export default function telaFormaPagamento() {
	const {
		exibirTabela,
		tabelaVisivel,
		novoFormaPagamento,
		salvarFormaPagamento,
		FormaPagamentos,
		FormaPagamento,
		editarFormaPagamento,
		excluirFormaPagamento,
		duplicarFormaPagamento,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		FormaPagamentoDup,
	} = UseFormaPagamento();

	return (
		<Layout
			titulo="Forma Pagamento"
			subtitulo="Grenciamento de Forma de Pagamentos"
		>
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Botao
								cor="indigo-500"
								className="mb-4"
								onClick={() => novoFormaPagamento()}
							>
								Nova Forma de Pagamento
							</Botao>
						</div>
						<TabelaFormaPagamento
							formaPagamentos={FormaPagamentos}
							formaPagamentoEditar={editarFormaPagamento}
							formaPagamentoExcluir={excluirFormaPagamento}
							formaPagamentoDuplicar={duplicarFormaPagamento}
							ordenacao={ordenacao}
							setOrdenacao={setOrdenacao}
							alterarOrdenacao={alterarOrdenacao}
							getClassNamesFor={getClassNamesFor}
						/>
					</>
				) : (
					<>
						<FormularioFormaPagamento
							formaPagamento={FormaPagamento}
							formaPagamentoDup={FormaPagamentoDup}
							salvarFormaPagamento={salvarFormaPagamento}
							exibirTabela={() => exibirTabela()}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
