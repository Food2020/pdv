import Produto from "../core/Produto";
import { useState, useEffect, useMemo } from "react";
import ColecaoProduto from "../backend/bd/ColecaoProduto";
import useTabelaOuForm from "./useTabelaOuForm";
import {
  PostProduto,
  GetProduto,
  ExcluirProduto,
  UpdateProduto,
} from "../backend/bd/ResquestsProdutos";

export default function useProduto() {
  const {
    exibirTabela,
    exibirFormulario,
    formularioVisivel,
    tabelaVisivel,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor,
  } = useTabelaOuForm();

  const [Produto, setProduto] = useState([]);
  const [ProdutoDup, setProdutoDup] = useState([]);
  const [Produtos, setProdutos] = useState([]);

  useEffect(obterTodos, []);

  function obterTodos() {
    GetProduto().then((prods) => {
      setProdutos(prods);
      exibirTabela();
    });
  }

  function editarProduto(Produto) {
    setProduto(Produto);
    setProdutoDup([]);
    exibirFormulario();
  }

  async function excluirProduto(Produto) {
    await ExcluirProduto(Produto.id);
    obterTodos();
  }

  function duplicarProduto(Produto) {
    setProdutoDup(Produto);
    setProduto([]);
    exibirFormulario();
  }

  async function salvarProduto({
    id,
    codigo,
    nome,
    preco,
    categoria,
    unidade,
  }) {
    console.log("id edit", id);
    id
      ? UpdateProduto({ id, codigo, nome, preco, categoria, unidade }).then(
          (resp) => {
            obterTodos();
          }
        )
      : PostProduto({ codigo, nome, preco, categoria, unidade }).then(
          (resp) => {
            obterTodos();
          }
        );
  }

  function novoProduto() {
    setProduto([]);
    setProdutoDup([]);
    exibirFormulario();
  }

  function TratarVariavel(variavel) {
    console.log(variavel + " - tipo : " + typeof variavel);
    if (typeof variavel == "string") {
      return variavel.toLowerCase();
    } else {
      return variavel;
    }
  }

  return {
    Produto,
    Produtos,
    novoProduto,
    salvarProduto,
    excluirProduto,
    editarProduto,
    duplicarProduto,
    obterTodos,
    formularioVisivel,
    tabelaVisivel,
    exibirTabela,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor,
    ProdutoDup,
  };
}
