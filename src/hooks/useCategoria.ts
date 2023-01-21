import Categoria from "../core/categoria";
import { useState, useEffect, useMemo } from "react";
import ColecaoCategoria from "../backend/bd/ColecaoCategoria";
import useTabelaOuForm from "./useTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
  PostCategoria,
  GetCategoria,
  ExcluirCategoria,
  UpdateCategoria,
} from "../backend/bd/ResquestsCategoria";

export default function useCategoria() {

  const {usuario,setCarregando} = useAuth()
  
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

  const [Categoria, setCategoria] = useState([]);
  const [CategoriaDup, setCategoriaDup] = useState([]);
  const [Categorias, setCategorias] = useState([]);
  useEffect(obterTodos, []);

  function obterTodos() {
    setCarregando(true)
    GetCategoria().then((categoria) => {
      setCategorias(categoria);
      exibirTabela();
      setCarregando(false)
    });
  }

  function editarCategoria(Categoria) {
    setCategoria(Categoria);
    setCategoriaDup([]);
    exibirFormulario();
  }

  async function excluirCategoria(Categoria) {
    await ExcluirCategoria(Categoria.id);
    obterTodos();
  }

  function duplicarCategoria(Categoria) {
    setCategoriaDup(Categoria);
    setCategoria([]);
    exibirFormulario();
  }

  async function salvarCategoria({id,nome, ativo}) {
    setCarregando(true)
    id? UpdateCategoria({ id,nome}).then(
          (resp) => {
            setCarregando(false)
            obterTodos();
          }
        )
      : PostCategoria({ nome }).then(
          (resp) => {
            setCarregando(false)
            obterTodos();
          }
        );
  }

  function novoCategoria() {
    setCategoria([]);
    setCategoriaDup([]);
    exibirFormulario();
  }

  function TratarVariavel(variavel) {
    if (typeof variavel == "string") {
      return variavel.toLowerCase();
    } else {
      return variavel;
    }
  }

  return {
    Categoria,
    Categorias,
    novoCategoria,
    salvarCategoria,
    excluirCategoria,
    editarCategoria,
    duplicarCategoria,
    obterTodos,
    formularioVisivel,
    tabelaVisivel,
    exibirTabela,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor,
    CategoriaDup,
  };
}
