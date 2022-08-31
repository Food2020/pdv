interface BotaoProps{
    cor?: 'green' | 'indigo' | 'amber' | 'sky'
    className?: string;
    children:any,
    onClick?: () => void
}

export default function Botao(props){
    const cor = props.cor ?? 'indigo';

    return (
        <button onClick = {props.onClick} className={` 
            text-white
            bg-${cor}-500
            px-4 py-2 rounded-md
            ${props.className}    
        `}>
            {props.children}
        </button>
    )
}