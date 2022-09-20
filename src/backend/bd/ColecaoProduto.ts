import Produto from "../../core/Produto";

export default class ColecaoProduto{
    
    async salvar(Produto: Produto): Promise<Produto> {
        
        if(Produto?.id){
            await this.editarProd(Produto)
            return Produto
        } else {
            const prod = await this.salvarProd(Produto)

            return prod
        }
    }

    async excluir(Produto: Produto): Promise<void> {
        return this.deletarProd(Produto.id)
    }

    async obterTodos(): Promise<Produto[]> {
        return this.retornarProds()
    }

    editarProd(Produto: Produto){
        
    }

    async salvarProd(Produto: Produto): Promise<Produto>{
        return Produto
    }
    deletarProd(id:string){
        
    }
    async retornarProds(): Promise<Produto[]>{
        return []
    }
}