import { useState } from "react";
import Categoria from "../../../../core/categoria";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada"

interface FormularioProdutoProps{
    categoria: Categoria
    categoriaMudou?:(categoria: Categoria) => void
    cancelado?: () => void
}

export default function FormularioCategoria(props){
    const [nome,setNome]           = useState((props.categoria?.nome || props.categoriaDup?.nome) ?? '');

    return (
        <>
            <div className = "grid grid-cols-12">
            {
                id ? (
                <Entrada 
                    somenteLeitura 
                    texto = "Id" 
                    valor = {id}
                    className = "col-span-4" />
                ) : false
            }
            <Entrada 
                texto = "Código" 
                valor = {codigo}
                valorMudou = {setCodigo}
                className = "col-span-4" />
            <Entrada 
                texto = "Nome" 
                valor = {nome} 
                valorMudou = {setNome} 
                className = "col-span-4"/>
            <Entrada 
                texto = "Preço" 
                valor = {preco} 
                valorMudou = {setPreco} 
                tipo = "number"
                className = "col-span-4" />
             <Entrada 
                texto = "Categoria" 
                valor = {categoria} 
                valorMudou = {setCategoria} 
                tipo = "text"
                className = "col-span-4" />
             <Entrada 
                texto = "Unidade" 
                valor = {unidade} 
                valorMudou = {setUnidade} 
                tipo = "text"
                className = "col-span-4" />
            </div>
            <div className = "flex justify-end mt-4">
                <Botao 
                    cor = "indigo-500" className = "mr-2" 
                    onClick = {() => props.salvarProduto?.({id,codigo,nome,preco,categoria,unidade})} >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor = "red-600"  onClick = {props.exibirTabela} >
                    Voltar
                </Botao>
            </div>
        </>
        )
}