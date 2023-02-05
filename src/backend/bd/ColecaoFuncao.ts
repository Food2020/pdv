import Funcao from "../../core/Funcao";

export default class ColecaoFuncao{
    
    async salvar(Funcao: Funcao): Promise<Funcao> {
        
        if(Funcao?.id){
            await this.editarFuncao(Funcao)
            return Funcao
        } else {
            const funcao = await this.salvarFuncao(Funcao)

            return funcao
        }
    }

    async excluir(Funcao: Funcao): Promise<void> {
        return this.deletarFuncao(Funcao.id)
    }

    async obterTodos(): Promise<Funcao[]> {
        return this.retornarFuncao()
    }

    editarFuncao(Funcao: Funcao){
        
    }

    async salvarFuncao(Funcao: Funcao): Promise<Funcao>{
        return Funcao
    }
    deletarFuncao(id:string){
        
    }
    async retornarFuncao(): Promise<Funcao[]>{
        return []
    }
}