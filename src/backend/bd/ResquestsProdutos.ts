import { json } from "stream/consumers";

const url = "http://localhost:4001/products";

export function PostProduto(codigo,nome,preco){
    let data = {
        "nome":nome,
        "preco":preco,
        "codigo":codigo
    }
    console.log(data)
    console.log(JSON.stringify(data))
    //    mode: 'cors',
    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }).then(response => {
        console.log(response)
    }).catch(() => {
   
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
