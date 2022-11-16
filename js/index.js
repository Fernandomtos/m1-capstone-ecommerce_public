
//FUNÇÃO PARA CORRIGIR O CAMINHO DA IMAGEM

function configImg (dataT) {
    for(let i=0; dataT.length>i; i++) {
       dataT[i].img = dataT[i].img.substring(1);
       console.log((dataT[i].img));
    }
    return dataT;
}
configImg(dataT);

// RENDERIZANDO OS ITENS DO DATABASE

let main = document.querySelector('.main');

let secaoVitrine = document.querySelector('.vitrine');
main.appendChild(secaoVitrine);

let asideLateral = document.querySelector('.barraLateral');
main.appendChild(asideLateral);

let ul = document.querySelector('.ulVitrine');
secaoVitrine.appendChild(ul);

let arrayCarrinho = [];
let valorTotal = 0;
let data =[];

mostrarCategorias(dataT, "");

function criarVitrine(data) {
    //console.log(data);

    for(let i=0; data.length>i; i++) {
        let li = document.createElement('li');
        let divCard = document.createElement('div');
        let img = document.createElement('img');
        let divDescricao = document.createElement('div');
        let pCategoria = document.createElement('p');
        let pNomeProduto = document.createElement('p');
        let pDescricao = document.createElement('p');
        let pValorProduto = document.createElement('p');
        let btnAddCarrinho = document.createElement('button');
    
        ul.appendChild(li);
        li.appendChild(divCard);
        divCard.appendChild(img);
        divCard.appendChild(divDescricao);
        divDescricao.appendChild(pCategoria);
        divDescricao.appendChild(pNomeProduto);
        divDescricao.appendChild(pDescricao);
        divDescricao.appendChild(pValorProduto);
        divDescricao.appendChild(btnAddCarrinho);
        
        divCard.classList.add('cardItem');
        divDescricao.classList.add('descricao');
        pCategoria.classList.add('categoria');
        pNomeProduto.classList.add('nomeProduto');
        pValorProduto.classList.add('valorProduto');
        btnAddCarrinho.classList.add('btnAddCarrinho');
        li.classList.add('liVitrine');
        
        img.src = data[i].img;    
        img.setAttribute('alt',`${data[i].nameItem}`);
        pCategoria.innerHTML = data[i].tag;
        pNomeProduto.innerHTML = data[i].nameItem;
        pDescricao.innerHTML = data[i].description;
        pValorProduto.innerHTML = `R$ ${data[i].value}.00`;
        btnAddCarrinho.innerHTML = data[i].addCart;   

    // EVENTO CLICK NO BOTÃO ADD CARRINHO
            btnAddCarrinho.addEventListener('click', function() {
            addCarrinho(data[i], i);
            if (arrayCarrinho.length != 0) {
                divCarrinhoVazio.remove();
                pCarrinho.remove();
                paddItens.remove();
            }
        });    
    }       
}  


// CRIANDO BOX CARRINHO VAZIO

let divCarrinhoVazio = document.createElement('div');
let pCarrinho = document.createElement('p');
let paddItens = document.createElement('p');

function boxCarrinhoVazio () {
    asideLateral.appendChild(divCarrinhoVazio);
    divCarrinhoVazio.appendChild(pCarrinho);
    divCarrinhoVazio.appendChild(paddItens);

    divCarrinhoVazio.classList.add('carrinhoVazio');
    pCarrinho.classList.add('pCarrinho');
    paddItens.classList.add('paddItens');

    pCarrinho.innerHTML = "Carrinho vazio";
    paddItens.innerHTML = "Adicione itens";
}

boxCarrinhoVazio();

// COLOCANDO O ITEM NO CARRINHO DE COMPRA
let divBoxCarrinho = document.querySelector('.BoxCarr');
let ulCarrinho = document.querySelector('.ulCarrinho');

function addCarrinho(data, i) {
    
    let li = document.createElement('li');
    let divCardCarrinho = document.createElement('div');
    let divCarrinhoImg = document.createElement('div');
    let img = document.createElement('img');
    let divCarrinhoId = document.createElement('div');
    let pNomeProduto = document.createElement('p');
    let pValorProduto = document.createElement('p');
    let btnRemover = document.createElement('button');

    asideLateral.appendChild(divBoxCarrinho);
    divBoxCarrinho.appendChild(ulCarrinho);
    ulCarrinho.appendChild(li);
    li.appendChild(divCardCarrinho);
    divCardCarrinho.appendChild(divCarrinhoImg);
    divCarrinhoImg.appendChild(img);
    divCardCarrinho.appendChild(divCarrinhoId);
    divCarrinhoId.appendChild(pNomeProduto);
    divCarrinhoId.appendChild(pValorProduto);
    divCarrinhoId.appendChild(btnRemover);

    divBoxCarrinho.classList.add('BoxCarrinho');
    divCardCarrinho.classList.add('cardCarrinho');
    divCarrinhoImg.classList.add('carrinhoImg');
    img.classList.add('imgCarrinho');
    divCarrinhoId.classList.add('carrinhoId');
    pNomeProduto.classList.add('nomeProduto-carrinho');
    pValorProduto.classList.add('valorProduto-carrinho')
    btnRemover.classList.add('btnRemoverCarrinho');
    
    img.src = data.img; 
    pNomeProduto.innerHTML = data.nameItem;
    pValorProduto.innerHTML = `R$ ${data.value}.00`;
    btnRemover.innerHTML = "Remover Produto";

    arrayCarrinho.push(data.id);
    
    valorTotal += data.value;

    li.id = data.id;

    
    criandoBoxSoma(arrayCarrinho, valorTotal);
    removerItem(li, btnRemover, data);

    return arrayCarrinho, data;
}


// CRIANDO BOX SOMA E QUANTIDADE DO CARRINHO

let pTituloQuantidade = document.createElement('p');
let pQuantidade = document.createElement('p');
let pTituloSoma = document.createElement('p');
let pSoma = document.createElement('p');

let boxQuantidade = document.querySelector('.quantidade');
let boxSoma = document.querySelector('.valor');

function criandoBoxSoma(arrayCarrinho) {
    // let boxQuantidade = document.querySelector('.quantidade')
    asideLateral.appendChild(boxQuantidade);
    boxQuantidade.appendChild(pTituloQuantidade);
    boxQuantidade.appendChild(pQuantidade);

    boxQuantidade.classList.add('somaQuantidade');

    pTituloQuantidade.innerHTML = "Quantidade:";
    pQuantidade.innerHTML = `${arrayCarrinho.length}`;

    // let boxSoma = document.querySelector('.valor');

    asideLateral.appendChild(boxSoma);
    boxSoma.appendChild(pTituloSoma);
    boxSoma.appendChild(pSoma);

    boxSoma.classList.add('somaValor');

    pTituloSoma.innerHTML = "Total:";
    pSoma.innerHTML = `R$ ${valorTotal}.00`;
}

// REMOVENDO ITEM DO CARRINHO

function removerItem (li, btnRemover, data) {
        //console.log(arrayCarrinho);
        //console.log(data.value);
        btnRemover.addEventListener('click', function() { 
        li.remove(li.id);
        valorTotal = (valorTotal - data.value);    // VERIFICAR AQUI A SOMA DOS VALORES....
        pSoma.innerHTML = `R$ ${valorTotal}.00`;
        for(let i=0; arrayCarrinho.length > i; i++) {
            if(arrayCarrinho[i] == li.id) {
                arrayCarrinho.splice(i,1);
                //console.log(arrayCarrinho);
            }   
        }
        pQuantidade.innerHTML = `${arrayCarrinho.length}`;

        if(arrayCarrinho.length == 0) {
           divBoxCarrinho.classList.remove('BoxCarrinho');
           boxQuantidade.classList.remove('somaQuantidade');
           boxSoma.classList.remove('somaValor');
           pTituloQuantidade.remove();
           pQuantidade.remove();
           pTituloSoma.remove();
           pSoma.remove();
           boxCarrinhoVazio();
        }
    });
}

// ATIVANDO O MENU (MENU ATIVO)
let btnMenuM1 = document.querySelector('.btnMenu.M1');
let btnMenuM2 = document.querySelector('.btnMenu.M2');
let btnMenuM3 = document.querySelector('.btnMenu.M3');
let btnMenuM4 = document.querySelector('.btnMenu.M4');

//MENU TODOS
btnMenuM1.addEventListener('click', function() {
    menuAtivo("todos");
    limparVitrine();
    mostrarCategorias(dataT, "");
});

//MENU ACESSÓRIOS
btnMenuM2.addEventListener('click', function() {
    menuAtivo("acessorios");
    limparVitrine();
    mostrarCategorias(dataT, "Acessórios");
});

//MENU CALÇADOS
btnMenuM3.addEventListener('click', function() {
    menuAtivo("calcados");
    limparVitrine();
    mostrarCategorias(dataT, "Calçados");
});

//MENU CAMISETAS
btnMenuM4.addEventListener('click', function() {
    menuAtivo("camisetas");
    //console.log(li.length);
    limparVitrine();
    mostrarCategorias(dataT, "Camisetas");
});


// CRIANDO FUNÇÃO PESQUISAR (INPUT)

const tag = ["Todos","Acessórios","Calçados","Camisetas"];
let formPesquisa = document.querySelector('input');
let bntPesquisa = document.querySelector('#btnPesquisar');

bntPesquisa.addEventListener('click', function() {
    for(let i=0; tag.length>i; i++) {
        if(formPesquisa.value == "Todos") {
            menuAtivo("todos");
            limparVitrine();
            mostrarCategorias(dataT, ""); 
            formPesquisa.value = '';
            return;   
        } else if(formPesquisa.value == "Acessórios") {
            menuAtivo("acessorios");
            limparVitrine();
            mostrarCategorias(dataT, "Acessórios");
            formPesquisa.value = '';
            return;
        } else if(formPesquisa.value == "Calçados") {
            menuAtivo("calcados");
            limparVitrine();
            mostrarCategorias(dataT, "Calçados");
            formPesquisa.value = '';
            return;
        } else if(formPesquisa.value == "Camisetas") {
            menuAtivo("camisetas");
            limparVitrine();
            mostrarCategorias(dataT, "Camisetas");
            formPesquisa.value = '';
            return;
        } else {
            alert `Categoria não encontrada!`;
            formPesquisa.value = '';
            return;
        }
    }
});
