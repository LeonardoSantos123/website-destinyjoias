document.addEventListener("DOMContentLoaded", function() {
    var loader = document.querySelector('.profile-main-loader');

    setTimeout(function () {
        loader.classList.add('fade-out');
        loader.addEventListener('animationend', function() {
            loader.remove();
        });
        document.getElementById('loading-page').style.display = 'block';
    }, 1000);
});
