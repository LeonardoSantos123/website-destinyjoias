/*
inspiration
https://dribbble.com/shots/4684682-Aquatic-Animals
*/

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: true
  },
  keyboard: {
    enabled: true
  },
  mousewheel: {
    thresholdDelta: 70
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 1
    },
    1024: {
      slidesPerView: 2
    },
    1560: {
      slidesPerView: 3
    }
  }
});

let index = 0,
  interval = 1000;

const rand = (min, max) => 
Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

star.style.animation = "none";
star.offsetHeight;
star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
setTimeout(() => {
  animate(star);
  
  setInterval(() => animate(star), 1000);
}, index++ * (interval / 3))
}