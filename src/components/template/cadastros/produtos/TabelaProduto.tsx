import Produto from "../../../../core/Produto"
import { IconeEdicao, IconeLixo } from "../../../icons/index";

interface TabelaProps{

    produtos:Produto[]
    produtoEditar?:(produto:Produto) => void
    produtoExcluir?:(produto:Produto) => void
}

export default function Tabela(props){

    const flagExibeAcoes = props.produtoEditar || props.produtoExcluir;

    function renderizarDados(){
        return props.produtos?.map((produto,i) => {
            let color = "";
            
            if(i % 2 === 0){
                color = 'bg-purple-200'
            }

            return (
                <tr key ={produto.id} className = {` ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-300' } `} >
                    <td className='text-left p-3' >{produto.id}</td>
                    <td className='text-left p-3' >{produto.nome}</td>
                    <td className='text-left p-3' >{produto.categoria}</td>
                    <td className='text-left p-3' >{produto.unidade}</td>
                    <td className='text-left p-3' >{produto.preco}</td>
                    { flagExibeAcoes ? ( <td className='p-3 flex items-center justify-center'>{renderizarAcoes(produto)}</td> ) : false }
                </tr>    
            )
        })
    }

    function renderizarAcoes(produto){

        return (
            <div>
                { props.produtoEditar ? (
                    <button onClick = {() => props.produtoEditar?.(produto)} className = {`
                        text-green-500
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                        { IconeEdicao }
                    </button>
                ) : false 
                }
                { props.produtoExcluir ? (
                        <button onClick = {() => props.produtoExcluir?.(produto)} className = {`
                            text-red-600
                            rounded-full
                            hover:bg-purple-50 
                            p-3
                        `}>
                        { IconeLixo }
                        </button>
                    ) : false
                }
            </div>
        )
    }

    return (
        <table className='w-full' > 
            <thead className='bg-gradient-to-r from-purple-500 to bg-purple-800 text-white'>
                <tr>
                    <th className='text-left p-3'>Id</th>
                    <th className='text-left p-3'>Código</th>
                    <th className='text-left p-3'>Nome</th>
                    <th className='text-left p-3'>Categoria</th>
                    <th className='text-left p-3'>Unidade</th>
                    <th className='text-left p-3'>Preço</th>
                    { flagExibeAcoes ? ( <th className='p-3'>Ações</th> ) : false }
                </tr>
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>    
    )
}