document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menu-icon');
  const menuOverlay = document.getElementById('menu-overlay');
  const overlayRight = document.getElementById('overlay-right');

  menuIcon.addEventListener('click', function () {
      console.log('Menu icon clicked'); // Verifique se este log aparece no console
      menuOverlay.classList.toggle('show-menu-overlay');
      overlayRight.classList.toggle('show-overlay-right');

      if (overlayRight.classList.contains('show-overlay-right')) {
          overlayRight.style.display = 'block';
          setTimeout(function () {
              overlayRight.style.opacity = '1';
          }, 10);
      } else {
          overlayRight.style.opacity = '0';
          setTimeout(function () {
              overlayRight.style.display = 'none';
          }, 300);
      }
  });

  overlayRight.addEventListener('click', function () {
      console.log('Overlay right clicked'); // Verifique se este log aparece no console
      menuOverlay.classList.remove('show-menu-overlay');
      overlayRight.classList.remove('show-overlay-right');
  });
});
