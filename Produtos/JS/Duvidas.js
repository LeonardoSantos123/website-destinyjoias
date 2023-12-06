const items = document.querySelectorAll(".questoes button");

    function togglequestoes() {
      const itemToggle = this.getAttribute('aria-expanded');

      for (i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
      }

      if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }

    items.forEach(item => item.addEventListener('click', togglequestoes));