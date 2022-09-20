interface ConteudoProps {
    children?:any
}

export default function Conteudo(props: ConteudoProps){

    return(
        <div className={`
             mt-7
            dark:text-gray-200
        `}>
            {props.children}
        </div>
    )
}