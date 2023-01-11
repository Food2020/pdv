import useAuth from "../../data/hook/useAuth";
import { Dropdown } from "flowbite-react";
import { IconeSair,
    IconeUsuario,
    IconeSino } from "../icons/index";

export default function MenuItemFixo(props) {

    const {logout} = useAuth();

    return(
            <ul className={` 
                        flex text-white
                    `}>
            <li className = {`
                cursor-pointer p-1
            `}>
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={IconeSino}
            >
                <Dropdown.Header>
                <span className="block text-sm">
                    Notificações
                </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    Notificação 1
                </Dropdown.Item>
                <Dropdown.Item>
                    Notificação 2
                </Dropdown.Item>
                <Dropdown.Item>
                    Notificação 3
                </Dropdown.Item>
            </Dropdown>
            </li>
            <li className = {`
                cursor-pointer p-1
            `}>
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={IconeUsuario}
            >
                <Dropdown.Header>
                <span className="block text-sm">
                    Configurações do usuário
                </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    Opção 1
                </Dropdown.Item>
                <Dropdown.Item>
                    Opção 2
                </Dropdown.Item>
                <Dropdown.Item>
                    Opção 3
                </Dropdown.Item>
            </Dropdown>
            </li>
            <li className = {`
                cursor-pointer p-1
            `}>
                <a onClick = {logout} className={`
                        text-red-600 hover:text-white
                    `}>
                    {IconeSair}
                </a>
            </li>
        </ul>
    )
}