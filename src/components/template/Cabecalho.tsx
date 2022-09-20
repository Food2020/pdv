import useAppData from "../../data/hook/useAppData";
import AvatarUsuario from "./AvatarUsuario";
//import BotaoAlterarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"

interface CabecalhoProps {
    titulo:string
    subtitulo:string
}

export default function Cabecalho(props: CabecalhoProps){
    
    const dados = useAppData();
    
    //<BotaoAlterarTema tema = {dados.tema} alternarTema ={dados.alternarTema}></BotaoAlterarTema>

    return(
        <div className={`flex`}>
            <Titulo titulo = {props.titulo} subtitulo = {props.subtitulo} />
            <div className = {`flex flex-grow justify-end items-center`}>
                <AvatarUsuario className="ml-3"/>
            </div>
        </div>
    )
}