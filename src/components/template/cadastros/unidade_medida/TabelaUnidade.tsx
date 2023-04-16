import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {renderizaSituacao, trataArrayNull} from "../../../Util"
import { Tooltip } from "@mui/material";

export default function TabelaUnidade(props){

  function renderizarAcoesTable({row}){
    const unidade = row.values;
   
    return (
        <div>
            { props.unidadeEditar && (
               <Tooltip title="Editar" placement="top">
                 <button onClick = {() => props.unidadeEditar(unidade)} className = {`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}>
                    { IconeEdicao }
                </button>
               </Tooltip>
            )  
            }
            { props.unidadeExcluir && (
                    <Tooltip title="Excluir" placement="top">
                      <button onClick = {() => props.unidadeExcluir(unidade)} className = {`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeLixo }
                    </button>
                    </Tooltip>
                ) 
            }
            { props.unidadeDuplicar && (
                    <Tooltip title="Duplicar" placement="top">
                      <button onClick = {() => props.unidadeDuplicar(unidade)} className = {`
                        text-black
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeDuplicar }
                    </button>
                    </Tooltip>
                ) 
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