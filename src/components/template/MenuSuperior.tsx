import MenuItem from "./MenuItem";
import MenuItemFixo from "./MenuItemFixo";
import Logo from "./Logo";
import {
	IconeConfig,
	IconeEstoque,
	IconeGlobo,
	IconeRelatorio,
} from "../icons/index";

export default function MenuSuperior() {
	const urlsOperacional = [
		{
			url: "/operacional/produto",
			texto: "Cadastro Produtos",
		},
		{
			url: "/operacional/categoria",
			texto: "Cadastro Categorias",
		},
		{
			url: "/operacional/usuario",
			texto: "Cadastro Usuarios",
		},
		{
			url: "/operacional/unidade",
			texto: "Cadastro Unidade de Medidas",
		},
		{
			url: "/operacional/formaPagamento",
			texto: "Cadastro Forma de Pagamentos",
		},
		{
			url: "/operacional/parceiro",
			texto: "Cadastro Parceiro",
		},
		{
			url: "/operacional/cargo",
			texto: "Cadastro Funções",
		},
		{
			url: "/operacional/local_estoque",
			texto: "Cadastro Local Estoque",
		},
	];

	const urlsConfig = [
		{
			url: "../ajustes",
			texto: "Configuração y",
		},
	];
	const urlsEstoque = [
		{
			url: "/estoque/entrada_manual",
			texto: "Entrada manual",
		},
	];
	const urlsRelatorios = [
		{
			url: "../notificacoes",
			texto: "Relatorio x",
		},
	];

	return (
		<nav
			className={` 
            bg-indigo-500	 
            border-gray-200 
        `}
		>
			<div
				className={` 
                flex 
                items-center 
                mx-auto 
                max-w-screen-xl  
                py-2.5
            `}
			>
				<Logo></Logo>
				<div
					className={`  
                    flex justify-between w-full items-center
                `}
				>
					<ul
						className={` 
                        flex 
                    `}
					>
						<MenuItem
							urls={urlsOperacional}
							texto="Operacional"
							icone={IconeGlobo}
							className="p-4"
						></MenuItem>
						<MenuItem
							urls={urlsConfig}
							texto="Configurações"
							icone={IconeConfig}
							className="p-4"
						></MenuItem>
						<MenuItem
							urls={urlsEstoque}
							texto="Estoque"
							icone={IconeEstoque}
							className="p-4"
						></MenuItem>
						<MenuItem
							urls={urlsRelatorios}
							texto="Relatórios"
							icone={IconeRelatorio}
							className="p-4"
						></MenuItem>
					</ul>
					<MenuItemFixo />
				</div>
			</div>
		</nav>
	);
}
