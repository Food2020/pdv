import { useState } from "react";
import Produto from "../../../../core/Produto";
import { trataNull } from "../../../Util";
import Botao from "../Botao";
import Entrada from "../Entrada"

interface FormularioProdutoProps{
    produto: Produto
    produtoMudou?:(produto: Produto) => void
    cancelado?: () => void
}

export default function FormularioProduto(props){
    const id                       = trataNull(props.produto?.id)
    const [nome,setNome]           = useState((props.produto?.nome || props.produtoDup?.nome) ?? '');
    const [codigo,setCodigo]       = useState((props.produto?.codigo || props.produtoDup?.codigo) ?? '');
    const [unidade,setUnidade]     = useState((props.produto?.unidade || props.produtoDup?.unidade) ?? '');
    const [categoria,setCategoria] = useState((props.produto?.categoria || props.produtoDup?.categoria) ?? '');
    const [preco,setPreco]         = useState((props.produto?.preco || props.produtoDup?.preco) ?? 0);

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