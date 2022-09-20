interface LayoutCadastrosProps{
    children: any;
}
export default function LayoutCadastros(props: LayoutCadastrosProps){

    return (
        <div className = 'w-2/3 p-3 bg-white text-gray-800 rounded-md' >
             {props.children}
        </div>
    )
}