import Unidade from "../../core/Unidade";

export default class ColecaoUnidade{
    
    async salvar(Unidade: Unidade): Promise<Unidade> {
        
        if(Unidade?.id){
            await this.editarUnidade(Unidade)
            return Unidade;
        }
        else{
            const unidade = await this.salvarUnidade(Unidade)
            return unidade;
        }
    }

    async excluir(Unidade: Unidade): Promise<void> {
        return this.deletarUnidade(Unidade.id)
    }

    async obterTodos(): Promise<Unidade[]> {
        return this.retornarUnidade()
    }

    editarUnidade(Unidade: Unidade){
        
    }

    async salvarUnidade(Unidade: Unidade): Promise<Unidade>{
        return Unidade
    }
    deletarUnidade(id:string){
        
    }
    async retornarUnidade(): Promise<Unidade[]>{
        return []
    }
}