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

