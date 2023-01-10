import useAppData from "../../data/hook/useAppData";

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
        </div>
    )
}