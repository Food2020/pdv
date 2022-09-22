import MenuLateral from "./MenuLateral"
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
            <div className={`${dados.tema} flex h-screen w-screen`}>
                <MenuLateral/>
                
                <div className="hidden z-50 peer-hover:flex hover:flex
                w-[200px]
                flex-col bg-white drop-shadow-lg">
                    <a className="px-5 py-3 hover:bg-gray-200" href="#">About Us</a>
                    <a className="px-5 py-3 hover:bg-gray-200" href="#">Contact Us</a>
                    <a className="px-5 py-3 hover:bg-gray-200" href="#">Privacy Policy</a>
                </div>
                
                <div className={` 
                        flex flex-col w-full p-7
                        bg-gray-300  dark:bg-gray-800
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