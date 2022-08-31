import Link from 'next/link'

interface MenuItemProps{
    url?:string
    texto:string
    icone:any
    onClick?: (evento: any) => void
    className?:string

}

export default function MenuItem(props) {
    function renderizarLink(){
        return(
            <a className={`
                    flex flex-col justify-center items-center text-gray-600
                    h-20 w-20 
                    dark:text-gray-200
                    ${props.className}
                `}>
                {props.icone}
                <span className = {`
                    text-xs font-light
                `}>
                    {props.texto}
                </span>
            </a>
        )
    }
    return(
        <li onClick = {props.onClick} className = {`
            hover:bg-gray-200 
            dark:hover:bg-gray-800
            cursor-pointer
        `}>
            {props.url ? ( 
                <Link href ={props.url}>
                    {renderizarLink()} 
                </Link>
            ) : (
                renderizarLink()
            )}
        </li>
    )
}