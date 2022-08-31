import Swiper from "swiper/bundle";

export const initSwiperSlider = () => {
  // init Swiper:
  const colorsSlider = document.querySelector("#colors-slider");

  const sliderOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
      loop: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  const swiper = new Swiper(colorsSlider, sliderOptions);
};
