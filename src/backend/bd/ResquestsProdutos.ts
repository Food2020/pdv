import { json } from "stream/consumers";

const url = "http://localhost:4001/products";

export async function PostProduto(codigo,nome,preco,categoria,unidade){
    let data = {
        "nome":nome,
        "preco":preco,
        "codigo":codigo,
        "categoria":categoria,
        "unidade":unidade
    }
    return fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }).then(response => response )
    .catch(() => {
        console.log("Eroooo 121")     
    });
}

export async function GetProduto(){
     return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(data => data.json())
    .catch(() => {
        console.log("Eroooo 121")     
    });
}

export async function ExcluirProduto(id){
    return fetch(url+"/"+id, {
        method: 'DELETE'
    }).then(data => data.json())
    .catch(() => {
        console.log("Eroooo 121")     
    });
}
