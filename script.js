$(document).ready(function() {

    // Função para abrir o WhatsApp
    function abrirWhatsapp() {
        const ddd = $("#ddd").val();
        const numero = $("#numero").val();
        // Valida o número de telefone
        if (!numero || numero.length > 9) {
            alert("Digite um número de telefone válido");
            return;
        }
        // Formata o número para o link do WhatsApp
        const linkWhatsapp = `https://api.whatsapp.com/send?phone=55${ddd}${numero}`;
        // Redireciona para o WhatsApp
        window.location.href = linkWhatsapp;
    }

    // Adiciona evento de clique ao botão
    $("#botao-abrir-whatsapp").click(abrirWhatsapp);

    // Adiciona evento de tecla Enter ao campo de número
    $("#numero").keypress(function(event) {
        if (event.which === 13) {
            abrirWhatsapp();
        }
    });

});


function forcarRetrato() {
    // Verifica se o dispositivo está em modo paisagem
    if (window.orientation !== 0) {
      // Ajusta o layout para o modo retrato
      document.body.style.width = "100%";
      document.body.style.height = "auto";
    }
  }
  
  // Chama a função quando a página for carregada
  window.onload = forcarRetrato;