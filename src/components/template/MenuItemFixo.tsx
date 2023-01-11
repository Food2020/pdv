import Link from 'next/link'

interface MenuItemFixoProps{
    url?:string
    icone:any
    onClick?: (evento: any) => void
    className?:string
}

export default function MenuItemFixo(props) {
    function renderizarLink(){
        return(
            <a className={`
                    flex flex-col 
                    justify-center 
                    items-center 
                    text-white
                    p-1
                    ${props.className}
                `}>
                {props.icone}
            </a>
        )
    }
    return(
        <li onClick = {props.onClick} className = {`
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