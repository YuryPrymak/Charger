export default (() => {
  const slider = document.querySelector('.projects .slider');
  const sliderRows = document.querySelectorAll('.projects .slider .row');
  let isMouseClick = false;

  class Slider {
    constructor(row) {
      this.row = row;
      this.mouseClickX;
      this.sliderShift;
      this.maxShift;
      this.currentShift = 0;
    }

    countMaxShift() {
      this.maxShift = this.row.offsetWidth - slider.offsetWidth;
    }

    moveRow(pageX) {
      if(isMouseClick) {
        this.sliderShift = pageX - this.mouseClickX + this.currentShift;
        if(this.sliderShift < 0 && this.maxShift > Math.abs(this.sliderShift)) {
          this.row.style.transform = `translateX(${this.sliderShift}px)`;
        }
      }
    }

    mouseDown(e) {
      this.mouseClickX = e;
      isMouseClick = true;
      this.moveRow(e);
    }

    mouseUp(e) {
      this.currentShift += e - this.mouseClickX;
      if(this.currentShift > 0) {
        this.currentShift = 0;
      } else if(Math.abs(this.currentShift) >= this.maxShift) {
        this.currentShift = -this.maxShift;
      }
      isMouseClick = false;
      this.moveRow(e);
    }
  }

  const sliderRow1 = new Slider(sliderRows[0]);
  const sliderRow2 = new Slider(sliderRows[1]);

  sliderRows[0].addEventListener('mousedown', e => sliderRow1.mouseDown(e.pageX));
  sliderRows[0].addEventListener('mouseup', e => sliderRow1.mouseUp(e.pageX));
  sliderRows[0].addEventListener('mousemove', e => sliderRow1.moveRow(e.pageX));
  sliderRows[0].addEventListener('mouseleave', () => { isMouseClick = false; });

  sliderRows[0].addEventListener('touchstart', e => {
    sliderRow1.mouseDown(e.targetTouches[0].clientX);
    sliderRow1.moveRow(e.targetTouches[0].clientX);
  });
  sliderRows[0].addEventListener('touchend', e => {
    sliderRow1.mouseUp(e.changedTouches[0].clientX);
  });
  sliderRows[0].addEventListener('touchmove', e => {
    sliderRow1.moveRow(e.targetTouches[0].clientX);
  });

  sliderRows[1].addEventListener('mousedown', e => sliderRow2.mouseDown(e.pageX));
  sliderRows[1].addEventListener('mouseup', e => sliderRow2.mouseUp(e.pageX));
  sliderRows[1].addEventListener('mousemove', e => sliderRow2.moveRow(e.pageX));
  sliderRows[1].addEventListener('mouseleave', () => { isMouseClick = false; });

  sliderRows[1].addEventListener('touchstart', e => {
    sliderRow2.mouseDown(e.targetTouches[0].clientX);
    sliderRow2.moveRow(e.targetTouches[0].clientX);
  });
  sliderRows[1].addEventListener('touchend', e => {
    sliderRow2.mouseUp(e.changedTouches[0].clientX);
  });
  sliderRows[1].addEventListener('touchmove', e => {
    sliderRow2.moveRow(e.targetTouches[0].clientX);
  });

  window.addEventListener('load', () => {
    sliderRow1.countMaxShift();
    sliderRow2.countMaxShift();
  });
  window.addEventListener('resize', () => {
    sliderRow1.countMaxShift();
    sliderRow2.countMaxShift();
  });
  slider.ondragstart = () => false;
})();
