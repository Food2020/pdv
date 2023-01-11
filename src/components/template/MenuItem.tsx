import Link from 'next/link'
import { Dropdown } from "flowbite-react";

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
                    flex flex-col justify-center items-center text-white
                    h-18 w-20 
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
            hover:bg-indigo-400 
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