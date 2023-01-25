import { useState } from "react";
import Cliente from "../../../../core/Cliente";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada"
interface FormularioClienteProps{
    cliente: Cliente
    categoriaMudou?:(cliente: Cliente) => void
    cancelado?: () => void
}

export default function FormularioCliente(props){
    const id                       = trataNull(props.cliente?.id)
    const [nome,setNome]           = useState((props.cliente?.nome || props.clienteDup?.nome) ?? '');

    return (
        <div>
            <div className = "grid grid-cols-12">
                 <Entrada 
                    texto = "Nome" 
                    valor = {nome} 
                    valorMudou = {setNome} 
                    className = "col-span-4"
                />
            </div>
            <div className = "flex justify-end mt-4">
                <Botao 
                    cor = "indigo-500" className = "mr-2" 
                    onClick = {() => props.salvarCliente?.({id,nome})} >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor = "red-600"  onClick = {props.exibirTabela} >
                    Voltar
                </Botao>
            </div>
        </div>
        )
}