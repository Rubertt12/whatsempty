$(document).ready(function() {
    // URL da API para buscar os códigos de países
    const apiUrl = 'https://restcountries.com/v3.1/all';

    // Função para popular o select com os códigos de países
    function populateCountryCodes() {
        $.get(apiUrl, function(data) {
            const select = $('#codigo-pais');
            data.forEach(country => {
                if (country.idd && country.idd.root && country.idd.suffixes) {
                    const code = country.idd.root + country.idd.suffixes[0];
                    const option = $('<option></option>')
                        .attr('value', code)
                        .text(`+${code} (${country.name.common})`);
                    select.append(option);
                }
            });
        });
    }

    // Chama a função para popular o select ao carregar a página
    populateCountryCodes();

    // Função para abrir o WhatsApp
    $("#botao-abrir-whatsapp").click(function() {
        const codigoPais = $("#codigo-pais").val();
        const numero = $("#numero").val();
        const mensagem = $("#mensagem").val();
        
        // Validação dos campos
        if (!codigoPais || !numero || isNaN(Number(codigoPais)) || isNaN(Number(numero))) {
            alert("Preencha todos os campos corretamente");
            return;
        }
        
        // Formatação do número para o link do WhatsApp
        let linkWhatsapp = `https://api.whatsapp.com/send?phone=${codigoPais}${numero}`;
        // Adiciona a mensagem se fornecida
        if (mensagem) {
            linkWhatsapp += `&text=${encodeURIComponent(mensagem)}`;
        }
        window.location.href = linkWhatsapp;
    });

    // Adiciona um evento de seleção para o campo de código do país
    document.getElementById("codigo-pais").addEventListener("change", function() {
        // Obtém o valor selecionado no campo de código do país
        var selectedCountryCode = this.value;
        // Preenche o campo com o código selecionado
        document.getElementById("codigo-pais").value = selectedCountryCode;
    });
    
    // Armazena o valor selecionado no campo de código do país
    var selectedCountryCode = "";

    // Adiciona um evento de seleção para o campo de código do país
    document.getElementById("codigo-pais").addEventListener("change", function() {
        // Verifica se o usuário selecionou uma opção
        if (this.value !== "") {
            // Atualiza o valor selecionado
            selectedCountryCode = this.value;
        }
        // Preenche o campo com o código selecionado
        document.getElementById("codigo-pais").value = selectedCountryCode;
    });
});

//codigo de teste

// Função para adicionar um contato à lista de contatos já chamados
function adicionarContatoALista(numero) {
    const listaContatosUl = document.getElementById("lista-contatos-ul");
    const li = document.createElement("li");
    li.textContent = numero;
    listaContatosUl.appendChild(li);
}

// Função para carregar os contatos já chamados do armazenamento local
function carregarContatosSalvos() {
    const contatosSalvos = JSON.parse(localStorage.getItem("contatos"));
    if (contatosSalvos) {
        contatosSalvos.forEach(contato => {
            adicionarContatoALista(contato);
        });
    }
}

// Função para salvar os contatos na lista de contatos já chamados no armazenamento local
function salvarContato(contato) {
    let contatosSalvos = JSON.parse(localStorage.getItem("contatos")) || [];
    contatosSalvos.push(contato);
    localStorage.setItem("contatos", JSON.stringify(contatosSalvos));
}

// Função para abrir o WhatsApp
$("#botao-abrir-whatsapp").click(function() {
    const codigoPais = $("#codigo-pais").val();
    const numero = $("#numero").val();
    const mensagem = $("#mensagem").val();
    
    // Validação dos campos
    if (!codigoPais || !numero || isNaN(Number(codigoPais)) || isNaN(Number(numero))) {
        alert("Preencha todos os campos corretamente");
        return;
    }
    
    // Adiciona o contato à lista de contatos já chamados
    adicionarContatoALista(numero);
    // Salva o contato no armazenamento local
    salvarContato(numero);
    
    // Formatação do número para o link do WhatsApp
    let linkWhatsapp = `https://api.whatsapp.com/send?phone=${codigoPais}${numero}`;
    // Adiciona a mensagem se fornecida
    if (mensagem) {
        linkWhatsapp += `&text=${encodeURIComponent(mensagem)}`;
    }
    window.location.href = linkWhatsapp;
});

// Carrega os contatos já chamados ao carregar a página
carregarContatosSalvos();
