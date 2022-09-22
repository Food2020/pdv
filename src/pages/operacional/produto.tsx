import FormularioProduto from "../../components/template/cadastros/produtos/FormularioProduto"
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout"
import Produto from "../../core/Produto";
<<<<<<< HEAD

export default function telaProduto() {
  
  return (
    <Layout titulo = "Produto" subtitulo = "Grenciamento de produtos">
      <LayoutCadastros>
        <FormularioProduto produto ={new Produto('','','','',0)} />
=======
import useProduto from '../../hooks/useProduto'
import Botao from '../../components/template/cadastros/Botao'

export default function telaProduto() {

  const { 
    exibirTabela,
    tabelaVisivel,
    novoProduto,
    salvarProduto
  } = useProduto()

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
            Novo cliente</Botao>
        </div>
        <TabelaProduto produtos ={[]}/>
        </>
      ):(
        <>
        <FormularioProduto produto ={[]} salvarProduto = {salvarProduto} exibirTabela = {() => exibirTabela()}/>
        </>
      )}
>>>>>>> 9ccbca1 (Cadastro de produto sincronizado com o back)
      </LayoutCadastros>
    </Layout>
  )
}
