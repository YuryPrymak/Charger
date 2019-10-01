export default (() => {
  const headerNav = document.querySelector('header .nav');
  const footerNav = document.querySelector('footer .nav');
  const btnScrollDown = document.querySelector('.btn-scroll-down');
  const scrollDownTo = document.querySelectorAll('section')[0];

  const smoothScroll = function(el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  const scrollTo = function(e) {
    if(e.target && e.target.nodeName === 'A') {
      e.preventDefault();
      const scrollToEl = document.querySelector(e.target.getAttribute('href'));
      smoothScroll(scrollToEl);
    }
  };

  headerNav.addEventListener('click', e => scrollTo(e));
  footerNav.addEventListener('click', e => scrollTo(e));
  btnScrollDown.addEventListener('click', () => smoothScroll(scrollDownTo));
})();
