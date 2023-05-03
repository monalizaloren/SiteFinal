$(function () {

    "use strict";

    // inicia o validador
    // os arquivos do validador estão incluídos no pacote de download
    // caso contrário, baixe de http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();


    // quando o formulário é enviado
    $('#contact-form').on('submit', function (e) {

        // se o validador não impedir o envio do formulário
        if (!e.isDefaultPrevented()) {
            var url = "form/contact.php";

            // Valores POST em segundo plano na URL do script
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = objeto JSON que contact.php retorna

                    // recebemos o tipo da mensagem: sucesso x perigo e aplicamos
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // vamos compor o HTML da caixa de alerta de Bootstrap
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // Se tivermos messageAlert e messageText
                    if (messageAlert && messageText) {
                        // injetar o alerta para div .messages em nosso formulário
                        $('#contact-form').find('.messages').html(alertBox);
                        // esvaziar o formulário
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});