import { IconeEdicao,
    IconeLixo,
    IconeDuplicar
   } from "../../../icons/index";

import React from 'react'
import SelectColumnFilter from '../../SelectColumnFilter'
import Tabela from "../Tabela";
import {renderizaSituacao, trataArrayNull} from "../../../Util"
import { Tooltip } from "@mui/material";

export default function TabelaLocalEstoque({
    local_estoqueEditar,
    local_estoqueExcluir,
    local_estoqueDuplicar,
    local_estoque,
    ordenacao,
    setOrdenacao,
    alterarOrdenacao,
    getClassNamesFor
}){

function renderizarAcoesTable({row}){
 
const local_estoque = row.original;

return (
   <div>
       { local_estoqueEditar && (
         <Tooltip title="Editar" placement="top">
           <button onClick = {() => local_estoqueEditar(local_estoque)} className = {`
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
       { local_estoqueExcluir && (
         <Tooltip title="Excluir" placement="top">

               <button onClick = {() => local_estoqueExcluir(local_estoque)} className = {`
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
       { local_estoqueDuplicar && (
         <Tooltip title="Duplicar" placement="top">

               <button onClick = {() => local_estoqueDuplicar(local_estoque)} className = {`
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

const flagExibeAcoes    = local_estoqueEditar || local_estoqueExcluir;
const LocalEstoque          = local_estoque?.json

const getData = () => {
const data = trataArrayNull(LocalEstoque)
return [...data]
}

const data = getData();

const columns = React.useMemo(
() => [
 {
   Header: "Id",
   accessor: "idLocalEstoque",
 },
 {
   Header: "Nome",
   accessor: "nome",
   Filter: SelectColumnFilter,  // new
   filter: 'includes',  // new
 },
 {
    Header: "Descricao",
    accessor: "descricao",
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