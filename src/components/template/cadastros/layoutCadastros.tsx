interface LayoutCadastrosProps{
    children: any;
}
export default function LayoutCadastros(props: LayoutCadastrosProps){

    return (
        <div className = 'flex flex-col w-2/3 bg-white text-gray-800 rounded-md' >
            <div className = "p-3"> 
                {props.children}
            </div>
        </div>
    )
}