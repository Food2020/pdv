import { IconeLua, IconeSol } from "../icons/index"

interface BotaoAlterarTemaProps{
    tema?:string
    alternarTema: () => void    
}

export default function BotaoAlterarTema(props) {

    return props.tema === 'dark' ? (
            <div onClick = {props.alternarTema} className={` 
                hidden sm:flex items-center cursor-pointer
                bg-gradient-to-r from-yellow-300 to-yellow-600
                w14 lg:w-24 h-8 p-1 rounded-full
                `}>
                <div className={`   
                    flex items-center justify-center
                    bg-white text-yellow-600 w-6 h-6 rounded-full
                `}>
                    {IconeSol("h-4 w-4")}
                </div>
                <div className={`   
                    hidden lg:flex items-center ml-4
                    text-white
                `}>
                    <span>Claro</span>
                </div>
            </div>
    ) : (
        <div onClick = {props.alternarTema} className={` 
            hidden sm:flex items-center justify-end cursor-pointer
            bg-gradient-to-r from-gray-600 to-gray-900
            w14 lg:w-24 h-8 p-1 rounded-full
            `}>
            <div className={`   
                hidden lg:flex items-center mr-2
                text-white
            `}>
                <span>Escuro</span>
            </div>
            <div className={`   
                flex items-center justify-center
                bg-black text-yellow-300 w-6 h-6 rounded-full
            `}>
                {IconeLua("h-4 w-4")}
            </div>
        </div>
    )
}