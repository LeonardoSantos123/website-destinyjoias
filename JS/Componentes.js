document.addEventListener('DOMContentLoaded', function() {
    var imgs = document.querySelectorAll('img');
    imgs.forEach(function(img) {
        // Impedir o clique com o botão direito
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        // Impedir o clique com o botão esquerdo
        img.addEventListener('mousedown', function(e) {
            if (e.button === 0) {
                // Botão esquerdo
                e.preventDefault();
            }
        });
    });
});