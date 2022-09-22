import { useState } from "react";
import Produto from "../../../../core/Produto";
import Botao from "../Botao";
import Entrada from "../Entrada"

interface FormularioProdutoProps{
    produto: Produto
    produtoMudou?:(produto: Produto) => void
    cancelado?: () => void
}

export default function FormularioProduto(props: FormularioProdutoProps){
    const id                       = props.produto?.id
    const [nome,setNome]           = useState(props.produto?.nome ?? '');
    const [codigo,setCodigo]       = useState(props.produto?.codigo ?? '');
    const [unidade,setUnidade]     = useState(props.produto?.unidade ?? '');
    const [categoria,setCategoria] = useState(props.produto?.categoria ?? '');
    const [preco,setPreco]         = useState(props.produto?.preco ?? 0);

    return (
        <div>
            {
                id ? (
                <Entrada 
                    somenteLeitura 
                    texto = "Id" 
                    valor = {id}
                    className = "mb-4" />
                ) : false
            }
            <Entrada 
                texto = "Código" 
                valor = {codigo}
                valorMudou = {setCodigo} />
            <Entrada 
                texto = "Nome" 
                valor = {nome} 
                valorMudou = {setNome} 
                className = "mb-4"/>
            <div className = "flex justify-end mt-4">
                <Botao 
<<<<<<< HEAD
                    cor = "indigo" className = "mr-2"
                    onClick = {() => props.produtoMudou?.(new Produto(codigo,nome,unidade,categoria,preco,id))} >
=======
                    cor = "indigo-500" className = "mr-2" 
                    onClick = {() => props.salvarProduto?.(codigo,nome,preco)}
                    >
>>>>>>> 9ccbca1 (Cadastro de produto sincronizado com o back)
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor = "red"  onClick = {props.cancelado} >
                    Voltar
                </Botao>
            </div>
        </div>
        )
}