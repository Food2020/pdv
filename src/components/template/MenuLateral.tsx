import useAuth from "../../data/hook/useAuth";
import { IconeCasa, IconeConfig,IconeGlobo,IconeRelatorio,IconeSair,IconeSino } from "../icons/index";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral(){

    const {logout} = useAuth();

    return(
        <aside className = {`
                flex flex-col
                text-gray-200
                text-gray-700
                dark:bg-gray-900
                dark:text-gray-200
            `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo></Logo>
            </div>
            <ul className = "flex-grow">
                <MenuItem url = "/operacional/produto" texto = "Operacional" icone = {IconeGlobo}></MenuItem>
                {/* <MenuItem url = "./ajustes" texto = "Retaguarda" icone = {IconeConfig}></MenuItem> */}
                <MenuItem url = "../ajustes" texto = "Configurações" icone = {IconeConfig}></MenuItem>
                <MenuItem url = "../notificacoes" texto = "Relatórios" icone = {IconeRelatorio}></MenuItem>
            </ul>
            <ul>
                <MenuItem className = {`  
                    text-red-600 hover:bg-red-400 hover:text-white 
                    dark:text-red-400 dark:hover:text-white
                `} onClick = {logout} texto = "Sair" icone = {IconeSair}></MenuItem>
            </ul>
        </aside>
    )
}