document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const menuOverlay = document.getElementById('menu-overlay');
    const overlayRight = document.getElementById('overlay-right');
    const body = document.body;
  
    menuIcon.addEventListener('click', function () {
        console.log('Menu icon clicked');
        menuOverlay.classList.toggle('show-menu-overlay');
        overlayRight.classList.toggle('show-overlay-right');
  
        if (menuOverlay.classList.contains('show-menu-overlay')) {
            body.classList.add('no-scroll'); 
            overlayRight.style.display = 'block';
            setTimeout(function () {
                overlayRight.style.opacity = '1';
            }, 10);
        } else {
            body.classList.remove('no-scroll'); 
            overlayRight.style.opacity = '0';
            setTimeout(function () {
                overlayRight.style.display = 'none';
            }, 300);
        }
    });
  
    overlayRight.addEventListener('click', function () {
        console.log('Overlay right clicked');
        menuOverlay.classList.remove('show-menu-overlay');
        overlayRight.classList.remove('show-overlay-right');
        body.classList.remove('no-scroll'); 
    });
  });
