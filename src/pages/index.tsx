import Layout from "../components/template/Layout";
import useAuth from "../data/hook/useAuth";

export default function Home() {
	const { usuario } = useAuth();
	return (
		<Layout titulo="Inicio" subtitulo="Estamos construindo um template">
			<h3>Olá {usuario?.nome} seja Bem Vindo!</h3>
		</Layout>
	);
}
