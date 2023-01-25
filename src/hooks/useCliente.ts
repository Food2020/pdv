import Cliente from "../core/Cliente";
import { useState, useEffect, useMemo } from "react";
import ColecaoCliente from "../backend/bd/ColecaoCliente";
import useTabelaOuForm from "./useTabelaOuForm";
import useAuth from "../data/hook/useAuth";

import {
  PostCliente,
  GetCliente,
  ExcluirCliente,
  UpdateCliente,
} from "../backend/bd/ResquestsCliente";

export default function useCliente() {

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

  const [Cliente, setCliente]                 = useState([]);
  const [ClienteDup, setClienteDup]           = useState([]);
  const [Clientes, setClientes]               = useState([]);
  const [ClientesOptions, setClientesOptions] = useState([]);

  useEffect(obterTodos, []);

  function obterTodos() {
    setCarregando(true)
    GetCliente().then((cliente) => {
      setClientes(cliente);
      setClientesOptions(ArrayToOption(cliente))
      exibirTabela();
      setCarregando(false)
    });
  }

  function ArrayToOption(cliente){
    let clientesOptions = cliente.map(cliente => {
      let properties = {
        "value": cliente.id,
        "label": cliente.nome
      };
      return properties;
     });
     
    return clientesOptions
  }

  function editarCliente(Cliente) {
    setCliente(Cliente);
    setClienteDup([]);
    exibirFormulario();
  }

  async function excluirCliente(Cliente) {
    await ExcluirCliente(Cliente.id);
    obterTodos();
  }

  function duplicarCliente(Cliente) {
    setClienteDup(Cliente);
    setCliente([]);
    exibirFormulario();
  }

  async function salvarCliente({id,nome, ativo}) {
    setCarregando(true)
    id? UpdateCliente({ id,nome}).then(
          (resp) => {
            setCarregando(false)
            obterTodos();
          }
        )
      : PostCliente({ nome }).then(
          (resp) => {
            setCarregando(false)
            obterTodos();
          }
        );
  }

  function novoCliente() {
    setCliente([]);
    setClienteDup([]);
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
    Cliente,
    Clientes,
    ClientesOptions,
    novoCliente,
    salvarCliente,
    excluirCliente,
    editarCliente,
    duplicarCliente,
    obterTodos,
    formularioVisivel,
    tabelaVisivel,
    exibirTabela,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor,
    ClienteDup,
  };
}
