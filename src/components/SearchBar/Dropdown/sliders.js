import Splide from "@splidejs/splide";

export function mountSliders() {
  let slidersOptions = {};

  slidersOptions.moviesSliders = {
    type: "loop",
    perPage: 4,
    perMove: 1,
    gap: 24,
    pagination: false,
    breakpoints: {
      1024: {
        perPage: 4,
        gap: 16,
      },
      820: {
        perPage: 3,
        gap: 16,
      },
      650: {
        perPage: 2,
        gap: 16,
      },
      425: {
        fixedWidth: 190,
        perPage: 1.3,
        gap: 8,
      },
    },
  };

  slidersOptions.trendingNav = {
    perPage: 5,
    speed: 300,
    easing: "ease",
    rewind: true,
    pagination: false,
    isNavigation: true,
    arrows: false,
    breakpoints: {
      600: {
        gap: 10,
        pagination: true,
      },
    },
  };

  slidersOptions.thumbnailCarousel = {
    speed: 300,
    easing: "ease",
    type: "fade",
    rewind: true,
    pagination: false,
    arrows: false,
  };

  slidersOptions.castSlider = {
    fixedWidth: 250,
    gap: 16,
    pagination: false,
    rewind: true,
  };

  slidersOptions.trailers = {
    fixedWidth: 530,
    fixedHeight: 300,
    gap: 16,
    rewind: true,
    pagination: false,
    breakpoints: {
      600: {
        fixedHeight: 250,
        fixedWidth: 300,
        arrows: false,
        drag: true,
        freeDrag: true,
        pagination: true,
      },
    },
  };

  slidersOptions.postersSlider = {
    fixedWidth: 200,
    gap: 16,
  };

  slidersOptions.recommendationSlider = {
    fixedWidth: 280,
    gap: 16,
    rewind: true,
  };

  let slidersSyncElements = document.querySelectorAll(`.splide[sync-with]`);

  for (let slider of slidersSyncElements) {
    let syncerEle = document.getElementById(slider.getAttribute("sync-with"));
    let syncerOption = syncerEle.getAttribute("data-option");
    let syncer = new Splide(syncerEle, slidersOptions[syncerOption]);
    let followerOption = slider.getAttribute("data-option");
    let follower = new Splide(slider, slidersOptions[followerOption]);
    follower.sync(syncer);
    follower.mount();
    syncer.mount();
  }
  let slidersElements = document.querySelectorAll(`.splide[sync="0"]`);

  for (let slider of slidersElements) {
    let option = slider.getAttribute("data-option");

    new Splide(slider, slidersOptions[option]).mount();
  }
}

console.log("end slider");
