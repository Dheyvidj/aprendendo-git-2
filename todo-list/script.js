const formulario = document.querySelector('#form-tarefa');
const inputTarefa = document.querySelector('#input-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const contador = document.querySelector('#contador');



let tarefas = JSON.parse(window.localStorage.getItem('tarefas')); 

let proximoId = 1;

function saudacao(nome) {
    return 'Olá '+ nome + ', tudo bem?'
}

const saudacao2 = (nome) => {
    return 'Olá '+ nome + ', tudo bem?'
}

// console.log(saudacao("Dheyvid"));
// console.log(saudacao2("Dheyvid"));

function criarTarefa(texto) {
    return {
        id: proximoId,
        texto: texto,
        concluida: false
    }
}

const atualizarContador = () => {
    const pendentes = tarefas.filter(t => !t.concluida).length
    console.log(pendentes)
    contador.textContent = pendentes + ' tarefas pendentes';
}


const frutas = ["maça", "banana", "melão", "abacaxi"]

// for(let i = 0; i < frutas.length; i++){
//     console.log(frutas[i])
// }

// for(const fruta of frutas){
//     console.log(fruta);
// }

// frutas.forEach(element => {
//     console.log(element);
// });


function renderizarLista() {
    listaTarefas.innerHTML = '';

    tarefas.forEach(tarefa => {
        const li = document.createElement('li')

        if(tarefa.concluida == true){
            li.classList.add('concluida');
        }

        li.innerHTML = `
            <span>${tarefa.texto}</span>
            ${tarefa.concluida == true ? 
            `` 
            : 
            `<button data-id="${tarefa.id}" class="btn-concluir">C</button>`
            }
            
            <button data-id="${tarefa.id}" class="btn-remover">X</button>
        `

        listaTarefas.appendChild(li);
    })

    atualizarContador();
}

// renderizarLista();

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    const texto = inputTarefa.value.trim();

    if( texto === '') return;

    const novaTarefa = criarTarefa(texto);

    proximoId = proximoId + 1;

    tarefas.push(novaTarefa);

    window.localStorage.setItem('tarefas', JSON.stringify(tarefas));

    inputTarefa.value = '';
    inputTarefa.focus();
    renderizarLista();

    // console.log(tarefas)
})


listaTarefas.addEventListener('click', function(evento){
    const alvo = evento.target;

    const id = Number(alvo.dataset.id);

    if(alvo.classList.contains('btn-concluir')){
        alternarConcluida(id)
    }

    if(alvo.classList.contains('btn-remover')){
        removerTarefa(id)
    }
})

function alternarConcluida(id) {
    const tarefa = tarefas.find(t => t.id == id);
    tarefa.concluida = true;
    renderizarLista();
}

function removerTarefa(id) {
    // const tarefa = tarefas.find(t => t.id == id);
    // tarefa.concluida = false;

    tarefas = tarefas.filter( t => t.id !== id);
    
    renderizarLista();
}


renderizarLista();