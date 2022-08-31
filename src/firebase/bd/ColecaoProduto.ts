import Produto from "../../core/Produto";
import ProdutoRepositorio from "../../core/ProdutoRepositorio";
import firebase from "../config";

export default class ColecaoProduto implements ProdutoRepositorio{
    
    /*
        id:string
    codigo:string
    nome:string
    unidade:string
    categoria:string
    preco:number

    (codigo:string,nome:string,unidade:string,categoria:string,preco:number,id:string = null)
    */
    #conversor = {
        toFirestore(Produto: Produto){
            return {
                nome: Produto.nome,
                codigo: Produto.codigo,
                unidade: Produto.unidade,
                categoria: Produto.categoria,
                preco: Produto.preco
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Produto {
            const dados = snapshot.data(options)
            return new Produto(dados.codigo,dados.idade,snapshot.id)
        }
    }
    
    async salvar(Produto: Produto): Promise<Produto> {
        
        if(Produto?.id){
            await this.colecao().doc(Produto.id).set(Produto)
            return Produto
        } else {
            const docRef = await this.colecao().add(Produto)
            const doc = await docRef.get()

            return doc.data()
        }
    }

    async excluir(Produto: Produto): Promise<void> {
        return this.colecao().doc(Produto.id).delete()
    }

    async obterTodos(): Promise<Produto[]> {
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colecao(){
        return firebase
               .firestore().collection('Produtos')
               .withConverter(this.#conversor)
    }
}