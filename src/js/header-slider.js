export default (() => {
  const slider = document.querySelector('.header .slider');
  const slides = document.querySelectorAll('.header .slider .slide');
  const prevSlideBtn = document.querySelector('.header .slider .btn-prev-slide');
  const nextSlideBtn = document.querySelector('.header .slider .btn-next-slide');
  const cntCurrentSlide = document.querySelector('.header .slider .counter .curent-slide');
  const cntQuantitySlides = document.querySelector('.header .slider .counter .quantity-of-slides');
  let currentSlideindex = 1;
  const sliderInterval = 5; // seconds
  let xDown = null;
  let yDown = null;

  const countSlides = function(slideIndex) {
    cntCurrentSlide.classList.add('counter-anim');

    setTimeout(() => {
      if(slideIndex < 10) {
        cntCurrentSlide.innerHTML = `0${slideIndex}`;
      } else {
        cntCurrentSlide.innerHTML = slideIndex;
      }
    }, 350);

    setTimeout(() => {
      cntCurrentSlide.classList.remove('counter-anim');
    }, 700);
  };

  const checkQuantityOfSlides = function() {
    if(slides.length < 10) {
      cntQuantitySlides.innerHTML = `0${slides.length}`;
    } else {
      cntQuantitySlides.innerHTML = slides.length;
    }
  };

  const changeSlide = function(showSlideIndex) {
    countSlides(showSlideIndex);
    slides[currentSlideindex - 1].classList.remove('show-slide');
    slides[currentSlideindex - 1].classList.add('hide-slide');
    setTimeout(() => {
      slides[currentSlideindex - 1].classList.add('hidden-slide');
      slides[showSlideIndex - 1].classList.remove('hide-slide');
      slides[showSlideIndex - 1].classList.remove('hidden-slide');
      slides[showSlideIndex - 1].classList.add('show-slide');
      currentSlideindex = showSlideIndex;
    }, 700);
  };

  const prevSlide = function() {
    let showSlideIndex;
    if(currentSlideindex === 1) {
      showSlideIndex = slides.length;
    } else {
      showSlideIndex = currentSlideindex - 1;
    }
    changeSlide(showSlideIndex);
  };

  const nextSlide = function() {
    let showSlideIndex;
    if(currentSlideindex === slides.length) {
      showSlideIndex = 1;
    } else {
      showSlideIndex = currentSlideindex + 1;
    }
    changeSlide(showSlideIndex);
  };

  const startSlider = function() {
    nextSlide();
    setTimeout(startSlider, sliderInterval * 1000);
  };

  const touchStart = function(e) {
    const firstTouch = e.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const touchMove = function(e) {
    if(!xDown || !yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if(Math.abs(xDiff) > Math.abs(yDiff)) {
      xDiff > 0 ? nextSlide() : prevSlide();
    }
    xDown = null;
    yDown = null;
  };

  prevSlideBtn.addEventListener('click', prevSlide);
  nextSlideBtn.addEventListener('click', nextSlide);
  slider.addEventListener('touchstart', touchStart);
  slider.addEventListener('touchmove', touchMove);
  window.addEventListener('load', checkQuantityOfSlides);
  window.addEventListener('load', () => {
    setTimeout(() => {
      startSlider();
    }, sliderInterval * 1000);
  });
})();
