import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {renderizaSituacao, trataArrayNull} from "../../../Util"
import { Tooltip } from "@mui/material";
export default function TabelaUsuario(props){
 
  function renderizarAcoesTable({row}){
    const usuario = row?.values;
    return (
        <div>
            { props.usuarioEditar && (
              <Tooltip title="Editar" arrow placement="top">
                <button  onClick = {() => props.usuarioEditar(usuario)} className = {`
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
            { props.usuarioExcluir && (
              <Tooltip title="Excluir" arrow placement="top">
                    <button onClick = {() => props.usuarioExcluir(usuario)} className = {`
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
            { props.usuarioDuplicar &&  (
              <Tooltip title="Duplicar" arrow placement="top">
                    <button  onClick = {() => props.usuarioDuplicar(usuario)} className = {`
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

  const flagExibeAcoes    = props.usuariooEditar || props.usuarioExcluir;
  const Usuarios          = props?.usuarios?.json
  const getData = () => {
    const data = trataArrayNull(Usuarios)
    return [...data]
  }
  
  const data = getData();

  const columns = React.useMemo(
    () => [
      
      {
        Header: "Código",
        accessor: "id",
      },
      {
        Header: "Nome",
        accessor: "nome",
        Filter: SelectColumnFilter,  // new
        filter: 'includes',  // new
      },
      {
        Header: "Email",
        accessor: "email",

      },
      {
        Header: "Cargo",
        accessor: "cargo",
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