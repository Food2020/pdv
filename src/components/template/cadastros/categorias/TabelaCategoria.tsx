import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {trataArrayNull} from "../../../Util"

export default function TabelaCategoria(props){

  function renderizarAcoesTable({row}){
      
    const categoria = row.original;
   
    return (
        <div>
            { props.categoriaEditar ? (
                <button onClick = {() => props.categoriaEditar(categoria)} className = {`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}>
                    { IconeEdicao }
                </button>
            ) : false 
            }
            { props.categoriaExcluir ? (
                    <button onClick = {() => props.categoriaExcluir(categoria)} className = {`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeLixo }
                    </button>
                ) : false
            }
            { props.categoriaDuplicar ? (
                    <button onClick = {() => props.categoriaDuplicar(categoria)} className = {`
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