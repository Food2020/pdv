interface EntradaProps{
    tipo?: 'text' | 'number' | 'password' | 'email',
    texto: string,
    valor: any,
    somenteLeitura?:boolean
    valorMudou?: (valor: any) => void
    onKeyUp?: (valor: any) => void
    className?: string
}

export default function Entrada(props: EntradaProps){
    return (
        <div>
            <div className = {`px-3 mb-4 ${props.className}`}>
                <label className = "block mb-2">
                    {props.texto}
                </label>
                <input 
                    type = {props.tipo ?? "text" } 
                    value = {props.valor}
                    readOnly = {props.somenteLeitura}
                    onKeyUp = {props.onKeyUp}
                    onChange = {e => props.valorMudou?.(e.target.value)}
                    className = {`w-full
                        border border-blue-500 border-md rounded-lg
                        focus: outline-none bg-gray-50 px-4 py-2
                        ${props.somenteLeitura ? '' : 'focus:bg-white'}
                    `}     
                />
            </div>
        </div>
        )
}