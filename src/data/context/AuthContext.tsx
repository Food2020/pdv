import Router from "../../../node_modules/next/router";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import Usuario from "../../core/Usuario";
import { checkUser } from "../../backend/bd/ResquestsUsuarios";

interface AuthContextProps {
	usuario?: Usuario;
	carregando?: boolean;
	login?: (email: string, senha: string) => Promise<void>;
	cadastrar?: (email: string, senha: string) => Promise<void>;
	logout?: () => Promise<void>;
	setCarregando?: Dispatch<SetStateAction<boolean>>;
}

const authContext = {
	usuario: { id: "", email: "", senha: "", nome: "", imagemURL: "" },
	carregando: true,
};

const AuthContext = createContext<AuthContextProps>(authContext);

export function AuthProvider(props) {
	const [usuario, setUsuario] = useState(null);
	const [carregando, setCarregando] = useState(true);

	async function configurarSessao(usuarioLogado) {
		if (usuarioLogado) {
			setUsuario(usuarioLogado);
			sessionStorage.setItem("usuario", JSON.stringify(usuarioLogado));
			setCarregando(false);
			return usuarioLogado;
		} else {
			sessionStorage.removeItem("usuario");
			Router.push("/autenticacao");

			setUsuario(null);
			setCarregando(false);
			return false;
		}
	}

	async function login(email, senha) {
		try {
			setCarregando(true);
			const usuarioLogado = await checkUser(email, senha).then(
				(body) => body?.usuarioLogado
							
			);
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
			await configurarSessao(null);
			sessionStorage.removeItem("usuario");
			Router.push("/autenticacao");
		} finally {
			setCarregando(false);
		}
	}

	useEffect(() => {
		if (sessionStorage.getItem("usuario")) {
			configurarSessao(JSON.parse(sessionStorage.getItem("usuario")));
		} else {
			Router.push("/autenticacao");
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				cadastrar,
				carregando,
				login,
				logout,
				setCarregando,
				usuario,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
