import { useState } from "react";
import Usuario from "../../../../core/Usuario";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada"

interface FormularioUsuarioProps{
    Usuario: Usuario
    usuarioMudou?:(usuario: Usuario) => void
    cancelado?: () => void
}

export default function FormularioUsuario(props){
    const id          = (props.usuario?.id || props.usuarioDup?.id) ?? '';
    const [nome,setNome]           = useState((props.usuario?.nome || props.usuarioDup?.nome) ?? '');
    const [email,setEmail]       = useState((props.usuario?.email || props.usuariooDup?.email) ?? '');
    const [senha,setSenha]     = useState((props.usuario?.senha || props.usuarioDup?.senha) ?? '');
    const [cargo,setCargo]         = useState((props.usuario?.cargo || props.usuarioDup?.cargo) ?? 0);

    return (
        <>
            <div className = "grid grid-cols-12">
           
            <Entrada 
                texto = "Email" 
                valor = {email}
                valorMudou = {setEmail}
                className = "col-span-4" />
            <Entrada 
                texto = "Nome" 
                valor = {nome} 
                valorMudou = {setNome} 
                className = "col-span-4"/>
            <Entrada 
                texto = "Senha" 
                valor = {senha} 
                valorMudou = {setSenha} 
                tipo = "password"
                className = "col-span-4" />
             <Entrada 
                texto = "Cargo" 
                valor = {cargo} 
                valorMudou = {setCargo} 
                tipo = "text"
                className = "col-span-4" />
            </div>
            <div className = "flex justify-end mt-4">
                <Botao 
                    cor = "indigo-500" className = "mr-2" 
                    onClick = {() => props.salvarUsuario?.({id,nome,email,senha,cargo})} >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor = "red-600"  onClick = {props.exibirTabela} >
                    Voltar
                </Botao>
            </div>
        </>
        )
}