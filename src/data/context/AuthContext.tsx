import Router from "../../../node_modules/next/router";
import { createContext, useEffect, useState } from "react";
import Usuario from "../../core/Usuario";
import Cookies from "js-cookie";

interface AuthContextProps{
    usuario?:Usuario
    carregando?: boolean
    login?: (email:string,senha:string) => Promise<void>
    cadastrar?: (email:string,senha:string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({});

function gerenciarCookie(logado: boolean){
    if(logado){
        console.log("dddddddddd")
        Cookies.set('pdv',logado,{expires:7})
        console.log("pppp")
    } else {
        Cookies.remove('pdv')
    }
}

export function AuthProvider(props) {
    const [usuario,setUsuario]       = useState<Usuario>(null)
    const [carregando,setCarregando] = useState(true)

    async function configurarSessao(usuario:Usuario){

        if(usuario?.email){
            console.log("Entrou no set : "+usuario)
            setUsuario(usuario);
            gerenciarCookie(true); 
            setCarregando(false);
            
            return usuario.email;
        } else {
            setUsuario(null);
            gerenciarCookie(false); 
            setCarregando(false)
            return false;
        }
    }
    async function login (email,senha){
        try {
            setCarregando(true)
            const user = checkUser(email,senha);
            console.log("Entrou no login : "+user)
            await configurarSessao(user)
            /*const resp = await firebase.auth().signInWithEmailAndPassword(email,senha)

            await configurarSessao(resp.user)*/
            Router.push('/')
        } finally {
            setCarregando(false)
        }
    }
    function checkUser(email,senha){
        return {
                email:email,
                senha:senha,
                nome:"xxxx",
                imagemURL:""
                };
    }
    async function cadastrar (email,senha){
        try {
            setCarregando(true)
            /*const resp = await firebase.auth().createUserWithEmailAndPassword(email,senha)

            await configurarSessao(resp.user)*/
            Router.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function logout(){
        try {
            setCarregando(true)
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }
    
     useEffect(() => {
        if(Cookies.get('pdv')){
            return () => configurarSessao(usuario);
        } else {
            setCarregando(false)
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{
            usuario,
            login,
            cadastrar,
            logout,
            carregando
        }}>
        {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext