import Produto from "../core/Produto"
import { useState,useEffect  } from 'react'
import ColecaoProduto from '../backend/bd/ColecaoProduto'
import useTabelaOuForm from './useTabelaOuForm'
import {PostProduto,GetProduto} from '../backend/bd/ResquestsProdutos'

export default function useProduto(){

    const { 
        exibirTabela,
        exibirFormulario,
        formularioVisivel,
        tabelaVisivel
      } = useTabelaOuForm()

    const repo = new ColecaoProduto()

    const [Produto,setProduto]   = useState([])
    const [Produtos,setProdutos] = useState([])

    useEffect(obterTodos, [])
  
    function obterTodos(){
        GetProduto().then(prods => {
          console.log(prods)
          setProdutos(prods)
          exibirTabela()
        })
        /*.then(prods => {

          console.log(prods)
      })*/
    }
  
    function editarProduto(Produto){
      setProduto(Produto)
      exibirFormulario()
    }
  
    async function excluirProduto(Produto){
      await repo.excluir(Produto)
      obterTodos();
    }
    
    async function salvarProduto(codigo,nome,preco){
      await PostProduto(codigo,nome,preco)
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