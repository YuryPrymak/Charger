export default (() => {
  const slider = document.querySelector('.testimonials .slider');
  const slides = document.querySelectorAll('.testimonials .slider .slide');
  const btnPrevSlide = document.querySelector('.testimonials .btn-prev-slide');
  const btnNextSlide = document.querySelector('.testimonials .btn-next-slide');
  let currentSlide = 0;
  let xDown = null;
  let yDown = null;

  const changeSlide = function(direction) {
    const removeClasses = function(val) {
      slides[currentSlide].classList.remove(`testimonials-prev-slide-${val}`);
      slides[currentSlide].classList.remove(`testimonials-next-slide-${val}`);
    };

    removeClasses('show');
    slides[currentSlide].classList.add(`testimonials-${direction}-slide-hide`);

    if(direction === 'prev') {
      currentSlide === 0 ? currentSlide = slides.length - 1 : currentSlide--;
    } else if(direction === 'next') {
      currentSlide === slides.length - 1 ? currentSlide = 0 : currentSlide++;
    }

    removeClasses('hide');
    slides[currentSlide].classList.remove('hidden-slide');
    slides[currentSlide].classList.add(`testimonials-${direction}-slide-show`);
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
      xDiff > 0 ? changeSlide('next') : changeSlide('prev');
    }
    xDown = null;
    yDown = null;
  };

  btnPrevSlide.addEventListener('click', () => changeSlide('prev'));
  btnNextSlide.addEventListener('click', () => changeSlide('next'));
  slider.addEventListener('touchstart', touchStart);
  slider.addEventListener('touchmove', touchMove);
})();
