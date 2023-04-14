import FormularioUsuario from "../../components/template/cadastros/usuarios/FormularioUsuario";
import TabelaUsuario from "../../components/template/cadastros/usuarios/TabelaUsuario";
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout";
import Usuario from "../../core/Usuario";
import UseUsuario from "../../hooks/UseUsuario";
import Botao from "../../components/template/cadastros/Botao";
import { prisma } from "../../lib/prisma";
import { useState } from "react";
import { usuarios } from "@prisma/client";
import { type } from "os";
import { GetServerSideProps } from "next";
import superjson from 'superjson';

export default function telaUsuario({usuarios}) {
	const {
		exibirTabela,
		tabelaVisivel,
		novoUsuario,
		salvarUsuario,
		Usuarios,
		Usuario,
		editarUsuario,
		excluirUsuario,
		duplicarUsuario,
		ordenacao,
		setOrdenacao,
		alterarOrdenacao,
		getClassNamesFor,
		UsuarioDup,
	} = UseUsuario();
	

	return (
		<Layout titulo="Usuario" subtitulo="Grenciamento de usuarios">
			<LayoutCadastros>
				{tabelaVisivel ? (
					<>
						<div className="flex justify-end">
							<Botao
								cor="indigo-500"
								className="mb-4"
								onClick={() => novoUsuario()}
							>
								Novo Usuario
							</Botao>
						</div>
						<TabelaUsuario
							usuarios={usuarios}
							usuarioEditar={editarUsuario}
							usuarioExcluir={excluirUsuario}
							usuarioDuplicar={duplicarUsuario}
							ordenacao={ordenacao}
							setOrdenacao={setOrdenacao}
							alterarOrdenacao={alterarOrdenacao}
							getClassNamesFor={getClassNamesFor}
						/>
					</>
				) : (
					<>
						<FormularioUsuario
							usuario={Usuario}
							usuarioDup={UsuarioDup}
							salvarUsuario={salvarUsuario}
							exibirTabela={() => exibirTabela()}
						/>
					</>
				)}
			</LayoutCadastros>
		</Layout>
	);
}
export const getServerSideProps: GetServerSideProps = async()=>{
	
	const usuario = await prisma.usuarios.findMany();
	const usuarios = superjson.stringify(usuario)
	return {
		props: {usuarios},
	}
}