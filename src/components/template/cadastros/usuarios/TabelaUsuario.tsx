import { IconeEdicao,
         IconeLixo,
         IconeDuplicar
        } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {renderizaSituacao, trataArrayNull} from "../../../Util"

export default function TabelaUsuario(props){
 
  function renderizarAcoesTable({row}){
    const usuario = row?.values;
    return (
        <div>
            { props.usuarioEditar ? (
                <button title="Editar" onClick = {() => props.usuarioEditar(usuario)} className = {`
                    text-green-500
                    rounded-full
                    hover:bg-purple-50 
                    p-3
                `}>
                    { IconeEdicao }
                </button>
            ) : false 
            }
            { props.usuarioExcluir ? (
                    <button title="excluir" onClick = {() => props.usuarioExcluir(usuario)} className = {`
                        text-red-600
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                    { IconeLixo }
                    </button>
                ) : false
            }
            { props.usuarioDuplicar ? (
                    <button title="Duplicar" onClick = {() => props.usuarioDuplicar(usuario)} className = {`
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