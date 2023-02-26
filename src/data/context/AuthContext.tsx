import Router from "../../../node_modules/next/router";
import { createContext, useEffect, useState } from "react";
import Usuario from "../../core/Usuario";
import Cookies from "js-cookie";
import {checkUser} from "../../backend/bd/ResquestsUsuarios";

interface AuthContextProps{
    usuario?:Usuario
    carregando?: boolean
    login?: (email:string,senha:string) => Promise<void>
    cadastrar?: (email:string,senha:string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext({});

function gerenciarCookie(logado: boolean){
    if(logado){
        Cookies.set('pdv',logado,{expires:7})
    } else {
        Cookies.remove('pdv')
    }
}

export function AuthProvider(props) {
    const [usuario,setUsuario]       = useState<Usuario>(null)
    const [carregando,setCarregando] = useState(true)

    async function configurarSessao(usuario){

        if(usuario?.email){
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
    async function login(email,senha){
        try {
            setCarregando(true)
            let user ={
                email: email,
                senha:senha
            }
              checkUser(email,senha);
             configurarSessao(user)
       
            Router.push('/')
        } finally {
            setCarregando(false)
        }
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
            carregando,
            setCarregando
        }}>
        {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext