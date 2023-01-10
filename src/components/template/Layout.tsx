import MenuLateral from "./MenuLateral"
import MenuSuperior from "./MenuSuperior"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import useAppData from "../../data/hook/useAppData"
import ForcarAutenticacao from "../auth/ForcarAutenticacao"

interface LayoutProps {
    titulo:string
    subtitulo:string
    children?:any
}

export default function Layout(props: LayoutProps){
    const dados = useAppData();
    return(
        <ForcarAutenticacao>
            <div className={`h-screen w-screen´`}>
                <MenuSuperior/>
                <div className={` 
                        w-full p-7
                        bg-gray-100  dark:bg-gray-800
                    `}>
                    <Cabecalho titulo = {props.titulo} subtitulo = {props.subtitulo} />
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
            </div>
        </ForcarAutenticacao>
    )
}