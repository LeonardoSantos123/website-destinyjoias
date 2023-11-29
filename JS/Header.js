document.addEventListener('DOMContentLoaded', function () {
    const burgerContainer = document.querySelector('.burger-container');
    const header = document.querySelector('.header-mobile');

    burgerContainer.addEventListener('click', function () {
      header.classList.toggle('menu-opened');
    });
  });
