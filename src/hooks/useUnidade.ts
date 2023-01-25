import Unidade from "../core/unidade";
import { useState, useEffect, useMemo } from "react";
import ColecaoUnidade from "../backend/bd/ColecaoUnidade";
import useTabelaOuForm from "./useTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
  PostUnidade,
  GetUnidade,
  ExcluirUnidade,
  UpdateUnidade,
} from "../backend/bd/ResquestsUnidade";

export default function useUnidade() {

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

  const [Unidade, setUnidade]                 = useState([]);
  const [UnidadeDup, setUnidadeDup]           = useState([]);
  const [Unidades, setUnidades]               = useState([]);
  const [UnidadesOptions, setUnidadesOptions] = useState([]);

  useEffect(obterTodos, []);

  function obterTodos() {
    setCarregando(true)
    GetUnidade().then((unidade) => {
      setUnidades(unidade);
      setUnidadesOptions(ArrayToOption(unidade))
      exibirTabela();
      setCarregando(false)
    });
  }

  function ArrayToOption(unidade){
    let unidadesOptions = unidade.map(unidade => {
      let properties = {
        "value": unidade.id,
        "label": unidade.nome
      };
      return properties;
     });
     
    return unidadesOptions
  }

  function editarUnidade(Unidade) {
    setUnidade(Unidade);
    setUnidadeDup([]);
    exibirFormulario();
  }

  async function excluirUnidade(Unidade) {
    await ExcluirUnidade(Unidade.id);
    obterTodos();
  }

  function duplicarUnidade(Unidade) {
    setUnidadeDup(Unidade);
    setUnidade([]);
    exibirFormulario();
  }

  async function salvarUnidade({id,nome, ativo}) {
    setCarregando(true)
    id? UpdateUnidade({ id,nome}).then(
          (resp) => {
            setCarregando(false)
            obterTodos();
          }
        )
      : PostUnidade({ nome }).then(
          (resp) => {
            setCarregando(false)
            obterTodos();
          }
        );
  }

  function novoUnidade() {
    setUnidade([]);
    setUnidadeDup([]);
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
    Unidade,
    Unidades,
    UnidadesOptions,
    novoUnidade,
    salvarUnidade,
    excluirUnidade,
    editarUnidade,
    duplicarUnidade,
    obterTodos,
    formularioVisivel,
    tabelaVisivel,
    exibirTabela,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor,
    UnidadeDup,
  };
}
