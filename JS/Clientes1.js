const moveLeft = document.getElementById("moveLeft");
    const moveRight = document.getElementById("moveRight");
    const carouselParts = document.querySelectorAll(".carousel-part");
    const carouselImages = [
      "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/ImagemPulseiraDiamond.jpg?raw=true",
      "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/CorrenteDiamond.jpg?raw=true",
      "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/ImagemPulseiraDiamond.jpg?raw=true",
      "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/ImagemPulseiraDiamond.jpg?raw=true",
      "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/ImagemPulseiraDiamond.jpg?raw=true",
    ];

    let activePart = 0;
    let isAnimating = false;

    const animateTransition = (currentPart, nextPart, nextImage) => {
      currentPart.style.opacity = 0;
      currentPart.style.transform = "translateY(10px)";

      const currentImage = document.getElementById("carouselImage");
      currentImage.style.opacity = 0;

      setTimeout(() => {
        carouselParts.forEach((part) => {
          part.classList.remove("ativo");
        });

        nextPart.classList.add("ativo");
        nextPart.style.opacity = 1;
        nextPart.style.transform = "translateY(0)";
        animateImageTransition(nextImage);
        activePart = Array.from(carouselParts).indexOf(nextPart);
        isAnimating = false;
      }, 300);
    };

    const animateImageTransition = (nextImage) => {
      const currentImage = document.getElementById("carouselImage");
      currentImage.style.opacity = 0;

      const preloadedImage = new Image();
      preloadedImage.src = nextImage;

      preloadedImage.onload = () => {
        currentImage.src = nextImage;
        currentImage.style.opacity = 1;
      };
    };

    moveRight.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;

      const currentPart = carouselParts[activePart];
      const nextPart = carouselParts[(activePart + 1) % carouselParts.length];
      const nextImage = carouselImages[(activePart + 1) % carouselImages.length];

      animateTransition(currentPart, nextPart, nextImage);
    });

    moveLeft.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;

      const currentPart = carouselParts[activePart];
      const prevPart = carouselParts[(activePart - 1 + carouselParts.length) % carouselParts.length];
      const prevImage = carouselImages[(activePart - 1 + carouselImages.length) % carouselImages.length];

      animateTransition(currentPart, prevPart, prevImage);
    });

    const initialImage = carouselImages[0];
    document.getElementById("carouselImage").src = initialImage;
    carouselParts[0].classList.add("ativo");