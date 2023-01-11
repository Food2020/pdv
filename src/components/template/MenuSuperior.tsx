
import MenuItem from "./MenuItem";
import MenuItemFixo from "./MenuItemFixo";
import Logo from "./Logo";
import {  IconeConfig,
         IconeGlobo,
         IconeRelatorio
         } from "../icons/index";
         
export default function MenuSuperior(){

    return ( 
        <nav className={` 
            bg-indigo-500	 
            border-gray-200 
        `}>
            <div className={` 
                flex 
                items-center 
                mx-auto 
                max-w-screen-xl  
                py-2.5
            `}>
                <Logo></Logo> 
                <div className={`  
                    flex justify-between w-full items-center
                `}>
                    <ul className={` 
                        flex 
                    `}>
                        <MenuItem url = "/operacional/produto" texto = "Operacional" icone = {IconeGlobo}></MenuItem>
                        <MenuItem url = "../ajustes" texto = "Configurações" icone = {IconeConfig}></MenuItem>
                        <MenuItem url = "../notificacoes" texto = "Relatórios" icone = {IconeRelatorio}></MenuItem>
                    </ul>
                    <MenuItemFixo />
                </div>
            </div>
        </nav>
    )

}