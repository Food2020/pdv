import FormularioCategoria from "../../components/template/cadastros/categorias/FormularioCategoria"
import TabelaCategoria from "../../components/template/cadastros/categorias/TabelaCategoria"
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout"
import Categoria from "../../core/categoria";
import UseCategoria from '../../hooks/useCategoria'
import Botao from '../../components/template/cadastros/Botao'

export default function telaCategoria() {

  const { 
    exibirTabela,
    tabelaVisivel,
    novoCategoria,
    salvarCategoria,
    Categorias,
    Categoria,
    editarCategoria,
    excluirCategoria,
    duplicarCategoria,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor,
    CategoriaDup
  } = UseCategoria()

  return (
    <Layout titulo = "Categoria" subtitulo = "Grenciamento de categorias">
      <LayoutCadastros>
      {tabelaVisivel ? (
        <>
        <div className = "flex justify-end">
          <Botao 
            cor = "indigo-500" 
            className ="mb-4" 
            onClick = {() => novoCategoria()}>
            Novo Categoria</Botao>
        </div>
        <TabelaCategoria categorias = {Categorias} 
                       categoriaEditar = {editarCategoria}
                       categoriaExcluir = {excluirCategoria}
                       categoriaDuplicar = {duplicarCategoria}
                       ordenacao = {ordenacao}
                       setOrdenacao = {setOrdenacao}
                       alterarOrdenacao = {alterarOrdenacao}
                       getClassNamesFor = {getClassNamesFor}
        />

        </>
      ):(
        <>
        <FormularioCategoria categoria ={Categoria} 
                           categoriaDup = {CategoriaDup}
                           salvarCategoria = {salvarCategoria} 
                           exibirTabela = {() => exibirTabela()}
        />
        </>
      )}
      </LayoutCadastros>
    </Layout>
  )
}
