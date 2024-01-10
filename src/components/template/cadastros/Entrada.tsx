interface EntradaProps{
    tipo?: 'text' | 'number' | 'password' | 'email'|'textarea',
    texto: string,
    valor: any,
    somenteLeitura?:boolean
    valorMudou?: (valor: any) => void
    onKeyUp?: (valor: any) => void
    className?: string
}

export default function Entrada({
    className,
    onKeyUp,
    somenteLeitura,
    texto,
    tipo,
    valor,
    valorMudou
}: EntradaProps){
    return (
        <div>
            <div className = {`px-3 mb-4 ${className}`}>
                <label className = "block mb-2">
                    {texto}
                </label>
                <input 
                    type = {tipo ?? "text" } 
                    value = {valor}
                    readOnly = {somenteLeitura}
                    onKeyUp = {onKeyUp}
                    onChange = {e => valorMudou?.(e.target.value)}
                    className = {`w-full
                        border border-blue-500 border-md rounded-lg
                        focus: outline-none bg-gray-50 px-4 py-2
                        ${somenteLeitura ? '' : 'focus:bg-white'}
                    `}     
                />
            </div>
        </div>
        )
}