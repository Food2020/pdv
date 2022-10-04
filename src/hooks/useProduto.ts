import Produto from "../core/Produto"
import { useState,useEffect,useMemo  } from 'react'
import ColecaoProduto from '../backend/bd/ColecaoProduto'
import useTabelaOuForm from './useTabelaOuForm'
import {PostProduto,GetProduto, ExcluirProduto, UpdateProduto} from '../backend/bd/ResquestsProdutos'

export default function useProduto(){

    const { 
        exibirTabela,
        exibirFormulario,
        formularioVisivel,
        tabelaVisivel,
        ordenacao,
        setOrdenacao,
        alterarOrdenacao,
        getClassNamesFor
      } = useTabelaOuForm()

    //const repo = new ColecaoProduto()

    const [Produto,setProduto]   = useState([])
    const [Produtos,setProdutos] = useState([])

    useEffect(obterTodos, [])
  
    function obterTodos(){
        GetProduto().then(prods => {
          setProdutos(prods)
          exibirTabela()
        })
    }
  
    function editarProduto(Produto){
      setProduto(Produto)
      exibirFormulario()
    }
  
    async function excluirProduto(Produto){
      await ExcluirProduto(Produto.id)
      obterTodos();
    }
    
    async function salvarProduto(id,codigo,nome,preco,categoria,unidade){
      console.log('id edit',id)
        id? 
          (UpdateProduto(id,codigo,nome,preco,categoria,unidade) .then(resp => {
            obterTodos();
          })):(
          PostProduto(codigo,nome,preco,categoria,unidade)
        .then(resp => {
          obterTodos();
        }))
    }
  
    function novoProduto(){
      setProduto([])
      exibirFormulario()
    }

    function TratarVariavel(variavel){
      console.log(variavel+" - tipo : "+typeof variavel)
      if(typeof variavel == "string") {
        return variavel.toLowerCase();
      } 
      else {
        return variavel;
      }
    }

    const ProdutosOrdenados = useMemo(() => {
      let ProdutosOrdenadosAux = [...Produtos];
      if (ordenacao !== null) {
        ProdutosOrdenadosAux.sort((a, b) => {
          if (TratarVariavel(a[ordenacao.chave]) < TratarVariavel(b[ordenacao.chave])) {
            return ordenacao.direcao === 'ascending' ? -1 : 1;
          }
          if (TratarVariavel(a[ordenacao.chave]) > TratarVariavel(b[ordenacao.chave])) {
            return ordenacao.direcao === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return ProdutosOrdenadosAux;
  }, [Produtos, ordenacao]);

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
        exibirTabela,
        ordenacao,
        setOrdenacao,
        alterarOrdenacao,
        ProdutosOrdenados,
        getClassNamesFor
    }
}