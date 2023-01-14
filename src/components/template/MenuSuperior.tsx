import MenuItem from "./MenuItem";
import MenuItemFixo from "./MenuItemFixo";
import Logo from "./Logo";
import { IconeConfig, IconeGlobo, IconeRelatorio } from "../icons/index";

export default function MenuSuperior() {
  const urlsOperacional = [
    {
      url: "/operacional/produto",
      texto: "Cadastro de produtos",
    },
  ];

  const urlsConfig = [
    {
      url: "../ajustes",
      texto: "Configguração y",
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
