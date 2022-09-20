interface BotaoProps{
    className?: string;
    children:any,
    onClick?: () => void
}

export default function Botao(props){
    const cor = props.cor ?? 'indigo-500';

    return (
        <button onClick = {props.onClick} className={` 
            text-white
            bg-${cor}
            px-4 py-2 rounded-md
            ${props.className}    
        `}>
            {props.children}
        </button>
    )
}