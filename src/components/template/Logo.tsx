import Link from "next/link";

export default function Logo(){
    return (
        <Link href='/'>
        <div className={`
            flex flex-col items-center justify-center
            h-10 w-10 rounded-full
            bg-white
            cursor-pointer
        `}>
            <div className ={`h-3 w-3 rounded-full bg-red-600`}></div>
            <div className = "flex">
                <div className ={`h-3 w-3 rounded-full bg-yellow-500`}></div>
                <div className ={`h-3 w-3 rounded-full bg-green-600`}></div>
            </div>
        </div>     
        </Link>  
    )

}