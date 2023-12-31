
// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()

const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []   

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} )     

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {   
    evento.preventDefault()            

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento  => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
        }

    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)

        // busca na posição do click  o elemento correto com id correto baseado no click
        itens[itens.findIndex(elemento => elemento.id = existe.id)] =itemAtual

    }else{
        //        *condição                       expressão 1                    expressao 2
        // se a condição for verdadeira  retorna expre 1 se falsa expre 2
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 :  0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    
    }
   
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 

function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    // aqui estamos criando uma propriedade data de nome id
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode)
    })

    return elementoBotao
}

function deletaElemento(tag , id) {

    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1 )
    localStorage.setItem("itens", JSON.stringify(itens))

}