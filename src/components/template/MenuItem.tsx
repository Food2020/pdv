import Link from 'next/link'
import { Dropdown } from "flowbite-react";

interface MenuItemProps{
    urls?:string
    texto:string
    icone:any
    onClick?: (evento: any) => void
    className?:string
}

export default function MenuItem(props) {
    function renderizarLink(urls){
        return(
            <Dropdown
                arrowIcon={true}
                inline={true}
                label ={props.icone}
                >
                <Dropdown.Header>
                {props.texto}
                </Dropdown.Header>
                {urls.map((obj, i) => {
                    return <Dropdown.Item>
                                <Link href ={obj.url}>
                                    {obj.texto}
                                </Link>
                           </Dropdown.Item>;
                })}
            </Dropdown>
        )
    }
    return(
        <li onClick = {props.onClick} className = {`
            hover:bg-indigo-400 
            cursor-pointer
            text-white
            justify-center items-center
            h-18 w-20
            ${props.className}
        `}>
         {renderizarLink(props.urls)}
        </li>
    )
}