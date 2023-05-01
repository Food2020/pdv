import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import FormularioEntradaManual from "../../components/template/estoque/FormularioEntradaManual";
import Layout from "../../components/template/Layout";

export default function telaEntradaManual() {

	return (
		<Layout titulo="Entrada manual" subtitulo="Entrada manual de estoque">
			<LayoutCadastros>
                <FormularioEntradaManual>
                    
                </FormularioEntradaManual>
			</LayoutCadastros>
		</Layout>
	);
}
