import Produto from "./Produto"

export default interface ProdutoRepositorio{
    salvar(Produto: Produto): Promise<Produto>
    excluir(Produto: Produto): Promise<void>
    obterTodos(): Promise<Produto[]>

}