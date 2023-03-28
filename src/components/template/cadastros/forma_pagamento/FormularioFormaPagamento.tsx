import { useState } from "react";
import FormaPagamento from "../../../../core/FormaPagamento";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada"
interface FormularioFormaPagamentoProps{
    formaPagamento: FormaPagamento
    formaPagamentoMudou?:(formaPagamento: FormaPagamento) => void
    cancelado?: () => void
}

export default function FormularioFormaPagamento(props){
    const id                       = trataNull(props.formaPagamento?.id)
    const [nome,setNome]           = useState((props.formaPagamento?.nome || props.formaPagamentoDup?.nome) ?? '');

    return (
        <div>
            <div className = "grid grid-cols-1 md:grid-cols-4">
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
                    onClick = {() => props.salvarFormaPagamento?.({id,nome})} >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor = "red-600"  onClick = {props.exibirTabela} >
                    Voltar
                </Botao>
            </div>
        </div>
        )
}