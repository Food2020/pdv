import FormularioProduto from "../../components/template/cadastros/produtos/FormularioProduto"
import LayoutCadastros from "../../components/template/cadastros/layoutCadastros";
import Layout from "../../components/template/Layout"
import Produto from "../../core/Produto";

export default function telaProduto() {
  
  return (
    <Layout titulo = "Produto" subtitulo = "Grenciamento de produtos">
      <LayoutCadastros>
        <FormularioProduto produto ={new Produto('','','','',0)} />
      </LayoutCadastros>
    </Layout>
  )
}
