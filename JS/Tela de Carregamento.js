document.addEventListener("DOMContentLoaded", function() {
    var loader = document.querySelector('.profile-main-loader');
    
    setTimeout(function () {
        loader.classList.add('fade-out');
        document.getElementById('wrapper').style.display = 'block';
    }, 800);
});
