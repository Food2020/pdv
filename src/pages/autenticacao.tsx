import { useState } from "react";
import AuthIpunt from "../components/auth/AuthInput";
import { IconeAtencao } from "../components/icons/index";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {

    const dados = useAuth()

    const [modo,setModo]   = useState<'login' | 'cadastro'>('login')
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [erro,setErro]   = useState(null)

    function exibirErro(msg,tempo = 5){
        setErro(msg)
        setTimeout(() => setErro(null),tempo * 1000)
    }
    async function submeter(){
        try{
            if(modo == 'login'){
                await dados.login(email,senha)
            } else {
                await dados.cadastrar(email,senha)
            }
        } catch(e) {
            console.log(e.message)
            exibirErro(e?.message ?? 'Erro inesperado !')
        }
    }
    return (
        <div className={` flex h-screen items-center justify-center`}>
             <div className ={`  
                    hidden md:block md:w-1/2 lg:w-2/3
                `}>
                <img 
                    src = "https://source.unsplash.com/random"
                    alt = "Imagem Tela de Autenticação"
                    className ={`  
                       h-screen w-full object-cover
                    `}
                />
             </div>
            <div className ={`  
                    w-full md:w-1/2 m-10 lg:w-1/3
                `}>
                <h1 className ={`  
                    text-xl font-semibold mb-5
                `}>{modo === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na Plataforma'}
                
                </h1>
                { erro ? (
                            <div className={`   
                            bg-red-400 text-white py-3 px-5
                            border border-red-700 rounded-lg flex
                            `}>
                            {IconeAtencao("h-7 w-7")}
                            <span className = "ml-3">{erro}</span>
                        </div>
                ) : false}
                
                <AuthIpunt 
                    label = "Email"
                    tipo = "email"
                    valor={email} 
                    valorMudou={setEmail}
                    obrigatorio
                />
                <AuthIpunt 
                    label = "Senha"
                    tipo = "password"
                    valor={senha} 
                    valorMudou={setSenha}
                    obrigatorio
                />
                <button onClick = {submeter} className ={`  
                    w-full
                    bg-indigo-500 hover:bg-indigo-400 text-white
                    rounded-lg px-4 py-3 mt-6
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>
                <hr className="my-6 border-gray-300 w-full"></hr>
                <button onClick = {dados.loginGoogle} className ={`  
                    w-full
                    bg-red-500 hover:bg-red-400 text-white
                    rounded-lg px-4 py-3 mt
                `}>
                    Entrar com Google
                </button>
                {modo === 'login' ? (
                    <p className = "mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className={`  
                          text-blue-500 hover:text-blue-700 font-semibold  
                          cursor-pointer
                        `}> Crie sua conta gratuitamente</a>
                    </p>
                    ) : (
                        <p className = "mt-8">
                            Já tem conta ?
                            <a onClick={() => setModo('login')} className={`  
                            text-blue-500 hover:text-blue-700 font-semibold  
                            cursor-pointer
                            `}> Entre com as suas credenciais</a>
                        </p>
                    )}
            </div>
        </div>
    )
}