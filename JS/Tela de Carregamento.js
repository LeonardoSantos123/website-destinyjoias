document.addEventListener("DOMContentLoaded", function() {
    var loader = document.querySelector('.profile-main-loader');

    // Configura um temporizador para adicionar a classe 'fade-out' após 2 segundos
    setTimeout(function () {
        loader.classList.add('fade-out');
        document.getElementById('loading-page').style.display = 'block';
    }, 1000); // Tempo ajustado para 2 segundos (você pode ajustar conforme necessário)
});
