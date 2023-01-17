import Categoria from "../../core/categoria";

export default class ColecaoCategoria{
    
    async salvar(Categoria: Categoria): Promise<Categoria> {
        
        if(Categoria?.id){
            await this.editarCateg(Categoria)
            return Categoria
        } else {
            const categ = await this.salvarCateg(Categoria)

            return categ
        }
    }

    async excluir(Categoria: Categoria): Promise<void> {
        return this.deletarCateg(Categoria.id)
    }

    async obterTodos(): Promise<Categoria[]> {
        return this.retornarCateg()
    }

    editarCateg(Categoria: Categoria){
        
    }

    async salvarCateg(Categoria: Categoria): Promise<Categoria>{
        return Categoria
    }
    deletarCateg(id:string){
        
    }
    async retornarCateg(): Promise<Categoria[]>{
        return []
    }
}