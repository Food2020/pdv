import FormaPagamento from "../../core/FormaPagamento";

export default class ColecaoFormaPagamento{
    
    async salvar(FormaPagamento: FormaPagamento): Promise<FormaPagamento> {
        
        if(FormaPagamento?.id){
            await this.editarFormaPagamento(FormaPagamento)
            return FormaPagamento
        } else {
            const formaPagamento = await this.salvarFormaPagamento(FormaPagamento)

            return formaPagamento
        }
    }

    async excluir(FormaPagamento: FormaPagamento): Promise<void> {
        return this.deletarFormaPagamento(FormaPagamento.id)
    }

    async obterTodos(): Promise<FormaPagamento[]> {
        return this.retornarFormaPagamento()
    }

    editarFormaPagamento(FormaPagamento: FormaPagamento){
        
    }

    async salvarFormaPagamento(FormaPagamento: FormaPagamento): Promise<FormaPagamento>{
        return FormaPagamento
    }
    deletarFormaPagamento(id:string){
        
    }
    async retornarFormaPagamento(): Promise<FormaPagamento[]>{
        return []
    }
}