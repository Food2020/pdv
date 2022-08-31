export default class Produto {
    id:string
    codigo:string
    nome:string
    unidade:string
    categoria:string
    preco:number

    constructor(codigo:string,nome:string,unidade:string,categoria:string,preco:number,id:string = null){
        this.id        = id
        this.codigo    = codigo
        this.nome      = nome
        this.unidade   = unidade
        this.categoria = categoria
        this.preco     = preco
    }

    static vazio(){
        return new Produto('','','','',0);
    }

    get getId(){
        return this.id;
    }
    get getCodigo(){
        return this.codigo;
    }
    get getNome(){
        return this.nome;
    }
    get getUnidade(){
        return this.unidade;
    }
    get getCategoria(){
        return this.categoria;
    }
    get getPreco(){
        return this.preco;
    }
}