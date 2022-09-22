import Produto from "../core/Produto"
import { useState,useEffect  } from 'react'
<<<<<<< HEAD
import ProdutoRepositorio from '../core/ProdutoRepositorio'
import ColecaoProduto from '../firebase/bd/ColecaoProduto'
=======
import ColecaoProduto from '../backend/bd/ColecaoProduto'
import PostProduto from '../backend/bd/ResquestsProdutos'
>>>>>>> 9ccbca1 (Cadastro de produto sincronizado com o back)
import useTabelaOuForm from './useTabelaOuForm'

export default function useProduto(){

    const { 
        exibirTabela,
        exibirFormulario,
        formularioVisivel,
        tabelaVisivel
      } = useTabelaOuForm()

    const repo: ProdutoRepositorio = new ColecaoProduto()

    const [Produto,setProduto]   = useState<Produto>(Produto.vazio())
    const [Produtos,setProdutos] = useState<Produto[]>([])

    useEffect(obterTodos, [])
  
    function obterTodos(){
      /*repo.obterTodos().then(Produtos => {
        setProdutos(Produtos)
        exibirTabela()
      })*/
    }
  
    function editarProduto(Produto: Produto){
      setProduto(Produto)
      exibirFormulario()
    }
  
    async function excluirProduto(Produto: Produto){
      await repo.excluir(Produto)
      obterTodos();
    }
    
<<<<<<< HEAD
    async function salvarProduto(Produto: Produto){
      await repo.salvar(Produto)
=======
    async function salvarProduto(codigo,nome,preco){
      await PostProduto(codigo,nome,preco)
>>>>>>> 9ccbca1 (Cadastro de produto sincronizado com o back)
      obterTodos();
      exibirTabela()
    }
  
    function novoProduto(){
      setProduto(Produto.vazio)
      exibirFormulario()
    }

    return{
        Produto,
        Produtos,
        novoProduto,
        salvarProduto,
        excluirProduto,
        editarProduto,
        obterTodos,
        formularioVisivel,
        tabelaVisivel,
        exibirTabela
    }
}