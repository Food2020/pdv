interface LayoutCadastrosProps{
    children: any;
}
export default function LayoutCadastros(props: LayoutCadastrosProps){

    return (
        <div className = 'p-3 bg-white text-gray-800 rounded-md' >
             {props.children}
        </div>
    )
}