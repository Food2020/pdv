import Produto from "../core/Produto"
import { useState,useEffect  } from 'react'
import ColecaoProduto from '../backend/bd/ColecaoProduto'
import useTabelaOuForm from './useTabelaOuForm'

export default function useProduto(){

    const { 
        exibirTabela,
        exibirFormulario,
        formularioVisivel,
        tabelaVisivel
      } = useTabelaOuForm()

    const repo = new ColecaoProduto()

    const [Produto,setProduto]   = useState([])
    const [Produtos,setProdutos] = useState<Produto[]>([])

    useEffect(obterTodos, [])
  
    function obterTodos(){
      repo.obterTodos().then(Produtos => {
        setProdutos(Produtos)
        exibirTabela()
      })
    }
  
    function editarProduto(Produto){
      setProduto(Produto)
      exibirFormulario()
    }
  
    async function excluirProduto(Produto){
      await repo.excluir(Produto)
      obterTodos();
    }
    
    async function salvarProduto(Produto){
      await repo.salvar(Produto)
      obterTodos();
      exibirTabela()
    }
  
    function novoProduto(){
      setProduto([])
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