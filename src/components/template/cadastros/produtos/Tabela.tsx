import Cliente from "../../../../core/Produto"
import { IconeEdicao, IconeLixo } from "../../../icons/index";

interface TabelaProps{
    clientes:Cliente[]
    clienteEditar?:(cliente:Cliente) => void
    clienteExcluir?:(cliente:Cliente) => void
}

export default function Tabela(props: TabelaProps){

    const flagExibeAcoes = props.clienteEditar || props.clienteExcluir;

    function renderizarDados(){
        return props.clientes?.map((cliente,i) => {
            let color = "";
            if(i % 2 === 0){
                color = 'bg-purple-200'
            }else{

            }
            return (
                <tr key ={cliente.id} className = {` ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-300' } `} >
                    <td className='text-left p-3' >{cliente.id}</td>
                    <td className='text-left p-3' >{cliente.nome}</td>
                    <td className='text-left p-3' >{cliente.idade}</td>
                    { flagExibeAcoes ? ( <td className='p-3 flex items-center justify-center'>{renderizarAcoes(cliente)}</td> ) : false }
                </tr>    
            )
        })
    }

    function renderizarAcoes(cliente:Cliente){

        return (
            <div>
                { props.clienteEditar ? (
                    <button onClick = {() => props.clienteEditar?.(cliente)} className = {`
                        text-green-500
                        rounded-full
                        hover:bg-purple-50 
                        p-3
                    `}>
                        { IconeEdicao }
                    </button>
                ) : false 
                }
                { props.clienteExcluir ? (
                        <button onClick = {() => props.clienteExcluir?.(cliente)} className = {`
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
                    <th className='text-left p-3'>Nome</th>
                    <th className='text-left p-3'>Idade</th>
                    { flagExibeAcoes ? ( <th className='p-3'>Ações</th> ) : false }
                </tr>
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>    
    )
}