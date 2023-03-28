import Router from "../../../node_modules/next/router";
import { createContext, useEffect, useState } from "react";
import Usuario from "../../core/Usuario";
import Cookies from "js-cookie";
import { checkUser } from "../../backend/bd/ResquestsUsuarios";

interface AuthContextProps {
	usuario?: Usuario;
	carregando?: boolean;
	login?: (email: string, senha: string) => Promise<void>;
	cadastrar?: (email: string, senha: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext({});

export function AuthProvider(props) {
	const [usuario, setUsuario] = useState<Usuario>(null);
	const [carregando, setCarregando] = useState(true);

	async function configurarSessao(usuarioLogado) {
		if (usuarioLogado) {
			 setUsuario(usuarioLogado);
			 setCarregando(false);
			sessionStorage.setItem('usuario',JSON.stringify(usuarioLogado))
			return;
		} 
			setUsuario(null);
			setCarregando(false);

			return;
	}

	async function login(email, senha) {
		try {
			setCarregando(true);
			const usuarioLogado = await checkUser(email, senha);
			await configurarSessao(usuarioLogado);
			Router.push("/");
		} catch (e) {
			console.log(e);
		} finally {
			setCarregando(false);
		}
	}

	async function cadastrar(email, senha) {
		try {
			setCarregando(true);

			Router.push("/");
		} finally {
			setCarregando(false);
		}
	}

	async function logout() {
		try {
			setCarregando(true);
			configurarSessao(null);
			sessionStorage.removeItem('usuario')

		} finally {
			setCarregando(false);
		}
	}
	
	useEffect(() => {
		if (sessionStorage.getItem("usuario")) {
			 configurarSessao(JSON.parse(sessionStorage.getItem("usuario")));
		} 
	}, []);

	return (
		<AuthContext.Provider
			value={{
				usuario,
				login,
				cadastrar,
				logout,
				carregando,
				setCarregando,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
