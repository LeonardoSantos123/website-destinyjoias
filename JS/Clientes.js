document.addEventListener("DOMContentLoaded", function () {
    var currentSlide = 1;

    function showSlide(slideIndex) {
        var slides = document.querySelectorAll(".slide-clientes");
        var images = document.querySelectorAll(".imagem-clientes");

        if (slides.length === 0 || images.length === 0) {
            // Verifique se há elementos antes de prosseguir
            return;
        }

        if (slideIndex > slides.length) {
            currentSlide = 1;
        }

        if (slideIndex < 1) {
            currentSlide = slides.length;
        }

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            images[i].style.display = "none";
            slides[i].classList.remove("fade");
        }

        slides[currentSlide - 1].style.display = "block";
        images[currentSlide - 1].style.display = "block";
        // Use setTimeout para adicionar a classe fade após um pequeno intervalo
        setTimeout(function () {
            slides[currentSlide - 1].classList.add("fade");
        }, 10);
    }

    function changeSlide(n) {
        showSlide(currentSlide += n);
    }

    showSlide(currentSlide);
    window.changeSlide = changeSlide;
});
