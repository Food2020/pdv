import FormularioFuncao from "../../components/template/cadastros/funcao/FormularioFuncao"
import TabelaFuncao from "../../components/template/cadastros/funcao/TabelaFuncao"
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout"
import Funcao from "../../core/Funcao";
import UseFuncao from '../../hooks/useFuncao'
import Botao from '../../components/template/cadastros/Botao'

export default function telaFuncao() {

  const { 
    exibirTabela,
    tabelaVisivel,
    novoFuncao,
    salvarFuncao,
    Funcoes,
    Funcao,
    editarFuncao,
    excluirFuncao,
    duplicarFuncao,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor,
    FuncaoDup
  } = UseFuncao()

  return (
    <Layout titulo = "Funcao" subtitulo = "Grenciamento de Funções">
      <LayoutCadastros>
      {tabelaVisivel ? (
        <>
        <div className = "flex justify-end">
          <Botao 
            cor = "indigo-500" 
            className ="mb-4" 
            onClick = {() => novoFuncao()}>
            Nova Função</Botao>
        </div>
        <TabelaFuncao funcoes = {Funcoes} 
                       funcaoEditar = {editarFuncao}
                       funcaoExcluir = {excluirFuncao}
                       funcaoDuplicar = {duplicarFuncao}
                       ordenacao = {ordenacao}
                       setOrdenacao = {setOrdenacao}
                       alterarOrdenacao = {alterarOrdenacao}
                       getClassNamesFor = {getClassNamesFor}
        />

        </>
      ):(
        <>
        <FormularioFuncao funcao ={Funcao} 
                           funcaoDup = {FuncaoDup}
                           salvarFuncao = {salvarFuncao} 
                           exibirTabela = {() => exibirTabela()}
        />
        </>
      )}
      </LayoutCadastros>
    </Layout>
  )
}
