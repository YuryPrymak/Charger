export default (() => {
  const btnNavOpen = document.querySelector('.btn-mobile-nav-default');
  const btnNavClose = document.querySelector('.btn-mobile-nav-close');
  const nav = document.querySelector('header nav');
  const social = document.querySelector('header .social');

  const navToggle = function() {
    nav.classList.toggle('nav-toggle');
    social.classList.toggle('social-toggle');
    btnNavOpen.classList.toggle('btn-hidden');
    btnNavClose.classList.toggle('btn-hidden');
  };

  const closeNav = function() {
    nav.classList.remove('nav-toggle');
    social.classList.remove('social-toggle');
    btnNavOpen.classList.remove('btn-hidden');
    btnNavClose.classList.add('btn-hidden');
  };

  btnNavOpen.addEventListener('click', navToggle);
  btnNavClose.addEventListener('click', closeNav);
  nav.addEventListener('click', closeNav);
  social.addEventListener('click', closeNav);
  window.addEventListener('scroll', closeNav);
  window.addEventListener('resize', closeNav);
})();
