import FormularioProduto from "../../components/template/cadastros/produtos/FormularioProduto"
import TabelaProduto from "../../components/template/cadastros/produtos/TabelaProduto"
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout"
import Produto from "../../core/Produto";
import usePoduto from '../../hooks/useProduto'
import Botao from '../../components/template/cadastros/Botao'

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
    ProdutoDup
  } = usePoduto()

  return (
    <Layout titulo = "Produto" subtitulo = "Grenciamento de produtos">
      <LayoutCadastros>
      {tabelaVisivel ? (
        <>
        <div className = "flex justify-end">
          <Botao 
            cor = "indigo-500" 
            className ="mb-4" 
            onClick = {() => novoProduto()}>
            Novo Produto</Botao>
        </div>
        <TabelaProduto produtos = {Produtos} 
                       produtoEditar = {editarProduto}
                       produtoExcluir = {excluirProduto}
                       produtoDuplicar = {duplicarProduto}
                       ordenacao = {ordenacao}
                       setOrdenacao = {setOrdenacao}
                       alterarOrdenacao = {alterarOrdenacao}
                       getClassNamesFor = {getClassNamesFor}
        />

        </>
      ):(
        <>
        <FormularioProduto produto ={Produto} 
                           produtoDup = {ProdutoDup}
                           salvarProduto = {salvarProduto} 
                           exibirTabela = {() => exibirTabela()}
        />
        </>
      )}
      </LayoutCadastros>
    </Layout>
  )
}
