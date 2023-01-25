import Cliente from "../../core/Cliente";

export default class ColecaoCliente{
    
    async salvar(Cliente: Cliente): Promise<Cliente> {
        
        if(Cliente?.id){
            await this.editarCliente(Cliente)
            return Cliente
        } else {
            const cliente = await this.salvarCliente(Cliente)

            return cliente
        }
    }

    async excluir(Cliente: Cliente): Promise<void> {
        return this.deletarCliente(Cliente.id)
    }

    async obterTodos(): Promise<Cliente[]> {
        return this.retornarCliente()
    }

    editarCliente(Cliente: Cliente){
        
    }

    async salvarCliente(Cliente: Cliente): Promise<Cliente>{
        return Cliente
    }
    deletarCliente(id:string){
        
    }
    async retornarCliente(): Promise<Cliente[]>{
        return []
    }
}