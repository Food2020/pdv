import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {trataArrayNull} from "../../../Util"

export default function TabelaUnidade(props){

  function renderizarAcoesTable({row}){
    const unidade = row.values;
   
    return (
        <div>
            { props.unidadeEditar ? (
                <button onClick = {() => props.unidadeEditar(unidade)} className = {`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}>
                    { IconeEdicao }
                </button>
            ) : false 
            }
            { props.unidadeExcluir ? (
                    <button onClick = {() => props.unidadeExcluir(unidade)} className = {`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeLixo }
                    </button>
                ) : false
            }
            { props.unidadeDuplicar ? (
                    <button onClick = {() => props.unidadeDuplicar(unidade)} className = {`
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

  const flagExibeAcoes    = props.unidadeEditar || props.unidadeExcluir;
  const Unidades          = props.unidades

  const getData = () => {
    const data = trataArrayNull(Unidades)
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
        Header:"Ativo",
        accessor: "ativo",
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