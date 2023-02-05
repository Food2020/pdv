import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {renderizaSituacao, trataArrayNull} from "../../../Util"

export default function TabelaFuncao(props){

  function renderizarAcoesTable({row}){
      
    const funcao = row.original;
   
    return (
        <div>
            { props.funcaoEditar ? (
                <button onClick = {() => props.funcaoEditar(funcao)} className = {`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}>
                    { IconeEdicao }
                </button>
            ) : false 
            }
            { props.funcaoExcluir ? (
                    <button onClick = {() => props.funcaoExcluir(funcao)} className = {`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeLixo }
                    </button>
                ) : false
            }
            { props.funcaoDuplicar ? (
                    <button onClick = {() => props.funcaoDuplicar(funcao)} className = {`
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

  const flagExibeAcoes    = props.funcaoEditar || props.funcaoExcluir;
  const Funcoes          = props.funcoes

  const getData = () => {
    const data = trataArrayNull(Funcoes)
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