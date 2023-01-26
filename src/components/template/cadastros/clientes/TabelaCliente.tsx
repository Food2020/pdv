import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {renderizaSituacao, trataArrayNull} from "../../../Util"

export default function TabelaCliente(props){

  function renderizarAcoesTable({row}){
      
    const cliente = row.original;
   
    return (
        <div>
            { props.clienteEditar ? (
                <button onClick = {() => props.clienteEditar(cliente)} className = {`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}>
                    { IconeEdicao }
                </button>
            ) : false 
            }
            { props.clienteExcluir ? (
                    <button onClick = {() => props.clienteExcluir(cliente)} className = {`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeLixo }
                    </button>
                ) : false
            }
            { props.clienteDuplicar ? (
                    <button onClick = {() => props.clienteDuplicar(cliente)} className = {`
                        text-black
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeDuplicar }
                    </button>
                ) : false
            }
        </div>
    )
  }

  const flagExibeAcoes    = props.clienteEditar || props.clienteExcluir;
  const Clientes          = props.clientes

  const getData = () => {
    const data = trataArrayNull(Clientes)
    return [...data]
  }
  
  const data = getData();

  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nome",
        accessor: "nome",
        Filter: SelectColumnFilter,  // new
        filter: 'includes',  // new
      },
      {
        Header: "Situação",
        accessor: row => renderizaSituacao(row.ativo),
        Cell: ({ row }) =>
        renderizaSituacao(row.original.ativo),
      },
      {
        Header: "Ações", 
        Cell: ({ row }) => renderizarAcoesTable({row}),
      },
    ],
    []
  );
  return <Tabela  columns = {columns} data = {data}/>
}