import Layout from "../components/template/Layout"
import useAppData from "../data/hook/useAppData"

export default function Home() {

  const dados = useAppData();
  
  return (
    <Layout titulo = "Notificações" subtitulo = "Grenciamento de notificações">
      <h3>Teste Notificações</h3>
      <h3>{dados.tema}</h3>
    </Layout>
  )
}
