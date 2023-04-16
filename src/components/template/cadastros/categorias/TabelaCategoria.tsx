import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {renderizaSituacao, trataArrayNull} from "../../../Util"
import { Tooltip } from "@mui/material";

export default function TabelaCategoria(props){

  function renderizarAcoesTable({row}){
      
    const categoria = row.original;
   
    return (
        <div>
            { props.categoriaEditar && (
                <Tooltip title="Editar" placement="top">
                  <button  onClick = {() => props.categoriaEditar(categoria)} className = {`
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
            { props.categoriaExcluir && (
              <Tooltip title="Excluir" placement="top">
                    <button onClick = {() => props.categoriaExcluir(categoria)} className = {`
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
            { props.categoriaDuplicar && (
              <Tooltip title="Duplicar" placement="top">
                    <button onClick = {() => props.categoriaDuplicar(categoria)} className = {`
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

  const flagExibeAcoes    = props.categoriaEditar || props.categoriaExcluir;
  const Categorias          = props.categorias

  const getData = () => {
    const data = trataArrayNull(Categorias)
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