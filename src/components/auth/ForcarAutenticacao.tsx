import Image from "../../../node_modules/next/image";
import Router from "../../../node_modules/next/router";
import loading from "../../../public/images/loading.gif";
import useAuth from "../../data/hook/useAuth";

export default function ForcarAutenticacao(props) {
	const { usuario, carregando }: any = useAuth();

	function renderizarConteudo() {
		return <>{props.children}</>;
	}
	function renderizarCarregando() {
		return (
			<div
				className={`  
                flex justify-center items-center h-screen
            `}
			>
				<Image src={loading} alt="" />
			</div>
		);
	}
	if (!carregando && usuario?.nome) {
		return renderizarConteudo();
	} else if (carregando) {
		return renderizarCarregando();
	} else {
		Router.push("/autenticacao");
		return null;
	}
}
