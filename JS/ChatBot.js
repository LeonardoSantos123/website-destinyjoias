$(function () {
    var INDEX = 0;

    $("#chat-submit").click(function (e) {
        e.preventDefault();
        var userMsg = $("#chat-input").val().toLowerCase();

        if (userMsg.trim() == '') {
            return false;
        }

        var botResponse = getBotResponse(userMsg);
        generate_message(userMsg, 'self', 'https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/Avatar.png?raw=true');
        setTimeout(function () {
            generate_message(botResponse, 'user', 'https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/Avatar2.png?raw=true');
        }, 1000);
    });

    function generate_message(msg, type, avatar) {
        INDEX++;
        var str = "";
        str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
        str += "          <span class=\"msg-avatar\">";
        str += "            <img src=\"" + avatar + "\">";
        str += "          <\/span>";
        str += "          <div class=\"cm-msg-text\">";
        str += msg;
        str += "          <\/div>";
        str += "        <\/div>";
        $(".chat-logs").append(str);
        $("#cm-msg-" + INDEX).hide().fadeIn(300);
        if (type == 'self') {
            $("#chat-input").val('');
        }
        $(".chat-logs").stop().animate({
            scrollTop: $(".chat-logs")[0].scrollHeight
        }, 1000);
    }

    function getBotResponse(userMsg) {
        userMsg = userMsg.toLowerCase();

        if (userMsg.includes('oi')) {
            return 'Olá! Como posso ajudar?';
        } else if (userMsg.includes('ajuda')) {
            return 'Claro, estou aqui para ajudar! O que você precisa?';
        } else if (userMsg.includes('produto')) {
            if (userMsg.includes('comprar')) {
                return 'Me diga qual é o produto que você deseja comprar.';
            } else {
                return 'Posso fornecer informações sobre produtos. O que você gostaria de saber?';
            }
        } else if (userMsg.includes('informações')) {
            return 'Posso fornecer informações sobre diversos assuntos. O que você gostaria de saber?';
        } else if (userMsg.includes('obrigado')) {
            return 'De nada! Se precisar de mais alguma coisa, estou à disposição.';
        } else {
            return 'Desculpe, não entendi. Pode reformular a pergunta?';
        }
    }

    $("#chat-circle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    });

    $(".chat-box-toggle").click(function () {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    });

    var initialBotMessage = "Olá! Como posso ajudar?";
    generate_message(initialBotMessage, 'user', 'https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/Avatar2.png?raw=true');
});
