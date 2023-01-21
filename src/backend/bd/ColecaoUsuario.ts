import Usuario from "../../core/Usuario";

export default class ColecaoUsuario{
    
    async salvar(Usuario: Usuario): Promise<Usuario> {
        
        if(Usuario?.id){
            await this.editarUsuario(Usuario)
            return Usuario
        } else {
            const usuario = await this.salvarUsuario(Usuario)

            return usuario
        }
    }

    async excluir(Usuario: Usuario): Promise<void> {
        return this.deletarUsuario(Usuario.id)
    }

    async obterTodos(): Promise<Usuario[]> {
        return this.retornarUsuarios()
    }

    editarUsuario(Usuario: Usuario){
        
    }

    async salvarUsuario(Usuario: Usuario): Promise<Usuario>{
        return Usuario
    }
    deletarUsuario(id:string){
        
    }
    async retornarUsuarios(): Promise<Usuario[]>{
        return []
    }
}