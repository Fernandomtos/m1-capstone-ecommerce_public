
function menuAtivo(tag) {
    if(tag == "todos") {
        btnMenuM1.classList.add('ativo');
        btnMenuM2.classList.remove('ativo');
        btnMenuM3.classList.remove('ativo');
        btnMenuM4.classList.remove('ativo');
    } else if(tag == "acessorios") {
        btnMenuM1.classList.remove('ativo');
        btnMenuM2.classList.add('ativo');
        btnMenuM3.classList.remove('ativo');
        btnMenuM4.classList.remove('ativo');
    } else if(tag == "calcados") {
        btnMenuM1.classList.remove('ativo');
        btnMenuM2.classList.remove('ativo');
        btnMenuM3.classList.add('ativo');
        btnMenuM4.classList.remove('ativo');
    } else if(tag == "camisetas") {
        btnMenuM1.classList.remove('ativo');
        btnMenuM2.classList.remove('ativo');
        btnMenuM3.classList.remove('ativo');
        btnMenuM4.classList.add('ativo');
    }
}

function limparVitrine(){
    let li = document.querySelectorAll('.liVitrine');
    for (let i=0; li.length>i; i++) {
        li[i].remove();
    }
};


function mostrarCategorias(dataT, categoria) {
    data = [];
    if(categoria != "") {
        for(let i=0; dataT.length > i; i++) {
            if(dataT[i].tag == categoria) {
                data.push(dataT[i]);
            }
        }
        if(data.length == 0) {
            let h3 = document.createElement('h3');
            secaoVitrine.appendChild(h3)
            h3.innerHTML = "Categoria não disponível !";
            console.log(document.querySelectorAll('h3').length);
        } else if(document.querySelectorAll('h3').length > 0) {
            let h3Reset = document.querySelectorAll('h3');
            for (let i=0; h3Reset.length>i; i++) {
                h3Reset[i].remove();
            }
        }
        criarVitrine(data);
    } else {
        data = dataT
        criarVitrine(data);
    }
    return data;
};


