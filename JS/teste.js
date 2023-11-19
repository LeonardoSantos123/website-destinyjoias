document.addEventListener("DOMContentLoaded", function() {
    var loader = document.querySelector('.profile-main-loader');

    // Configura um temporizador para adicionar a classe 'fade-out' após 2 segundos
    setTimeout(function () {
        loader.classList.add('fade-out');
        document.getElementById('wrapper').style.display = 'block';
    }, 800); // Tempo ajustado para 2 segundos (você pode ajustar conforme necessário)
});
