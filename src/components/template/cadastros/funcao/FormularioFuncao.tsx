import { useState } from "react";
import Funcao from "../../../../core/Funcao";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada"
interface FormularioFuncaoProps{
    funcao: Funcao
    funcaoMudou?:(funcao: Funcao) => void
    cancelado?: () => void
}

export default function FormularioFuncao(props){
    const id                       = trataNull(props.funcao?.id)
    const [nome,setNome]           = useState((props.funcao?.nome || props.funcaoDup?.nome) ?? '');

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
                    onClick = {() => props.salvarFuncao?.({id,nome})} >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor = "red-600"  onClick = {props.exibirTabela} >
                    Voltar
                </Botao>
            </div>
        </div>
        )
}