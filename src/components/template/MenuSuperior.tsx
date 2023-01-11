import useAuth from "../../data/hook/useAuth";
import MenuItem from "./MenuItem";
import MenuItemFixo from "./MenuItemFixo";
import Logo from "./Logo";
import { IconeCasa, 
         IconeConfig,
         IconeGlobo,
         IconeRelatorio,
         IconeSair,
         IconeUsuario,
         IconeSino } from "../icons/index";
import AvatarUsuario from "./AvatarUsuario";

export default function MenuSuperior(){

    const {logout} = useAuth();

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
                    <ul className={` 
                        flex 
                    `}>
                        <MenuItemFixo url = "../perfil" texto = "" icone = {IconeSino} />
                        <MenuItemFixo url = "../perfil" texto = "" icone = {IconeUsuario} />
                        <MenuItemFixo className = {`  
                            text-red-600 hover:text-white 
                        `} onClick = {logout} texto = "" icone = {IconeSair} />
                    </ul>
                </div>
            </div>
        </nav>
    )

}