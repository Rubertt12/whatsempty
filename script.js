$(document).ready(function() {
    // Função para abrir o WhatsApp
    $("#botao-abrir-whatsapp").click(function() {
        const numero = $("#numero").val();
        // Valida o número de telefone
        if (!numero || numero.length < 10 || numero.length > 11 || isNaN(Number(numero))) {
            alert("Digite um número de telefone válido");
            return;
        }
        let ddd = "";
        let numeroSemDDD = numero;
        // Verifica se o DDD tem apenas um dígito e adiciona um zero à esquerda
        if (numero.length === 10) {
            ddd = numero.substring(0, 1);
            numeroSemDDD = numero.substring(1);
        } else {
            ddd = numero.substring(0, 2);
            numeroSemDDD = numero.substring(2);
        }
        // Formata o número para o link do WhatsApp
        const linkWhatsapp = `https://api.whatsapp.com/send?phone=55${ddd}${numeroSemDDD}`;
        // Redireciona para o WhatsApp
        window.location.href = linkWhatsapp;
    });

    // Detecta o tema do sistema e aplica o estilo correspondente
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $("body").addClass("dark-theme");
    }
});
