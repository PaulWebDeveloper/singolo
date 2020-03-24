const menu = document.querySelector('nav ul');
const sections = document.querySelectorAll('main section');
const headerOffset = document.querySelector('header').clientHeight;
const dropMenu = document.getElementById('tab');

const slider = document.querySelectorAll('.slider__content li');
const sliderBg = document.querySelector('.slider');
const btnPrev = document.querySelector('.arrow_left');
const btnNext = document.querySelector('.arrow_right');
const sliderScreens = document.querySelectorAll('.slider__screen');
const sliderBtn = document.querySelectorAll('.slider__btn');

const portfolioMenu = document.querySelectorAll('.portfolio__btn');
const portfolio = document.querySelector('.portfolio__examples');
const portfolioExamples = document.querySelectorAll('.portfolio__examples li');

const submit = document.getElementById('submit');
const message = document.querySelector('.message-block');
const closeMessage = document.querySelector('.message-btn');
const messageTheme = document.getElementById('message__theme');
const messageDescription = document.getElementById('message__description');

let initialString = 'Describe your project in detail...';
let elements = [];
let current = 0;
let last = 0;


/** Header */
  
menu.querySelectorAll('li a').forEach((el,i) => {
  let value = document.getElementById(el.getAttribute('href').substr(1)).offsetHeight;
  elements.push(value);
});

elements = elements.map((el,i) => elements.slice(0, i + 1).reduce((sum, cur) => sum + cur));

const scroll = () => {
  let bodyPosition = Math.abs(document.querySelector('body').getBoundingClientRect().top);

  elements.forEach((el, i, arr) => {
    let min = elements[i-1] || 0;

    if (bodyPosition === 0) {
      menu.querySelectorAll('li a').forEach(item => item.classList.remove('active'));
      menu.querySelectorAll('li a')[0].classList.add('active');
    }

    if (bodyPosition < elements[i] && bodyPosition >= min - 300) {
      menu.querySelectorAll('li a').forEach(item => item.classList.remove('active'));
      menu.querySelectorAll('li a')[i].classList.add('active');
    }

    if (bodyPosition === 2674) {
      menu.querySelectorAll('li a').forEach(item => item.classList.remove('active'));
      menu.querySelectorAll('li a')[elements.length - 1].classList.add('active');
    }
  });
};

const scrollMenu = () => {
  let section = event.target.getAttribute('href').substr(1);
  let element = document.getElementById(section);

  let elementPosition = element.getBoundingClientRect().top;
  let bodyPosition = document.querySelector('body').getBoundingClientRect().top;
  
  let offsetPosition = elementPosition - headerOffset - bodyPosition;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

menu.addEventListener('click', (event) => {
  menu.querySelectorAll('li a').forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
  event.preventDefault();
  scrollMenu();
});

window.addEventListener('scroll', () => scroll());


/** Slider. Slide switch */

const nextSlide = n => {
  document.querySelector('.show').classList.remove('animation__right');
  document.querySelector('.show').classList.remove('animation__left');

  slider[last].classList.remove('show');
  sliderBg.classList.remove('slider-bg-' + (last + 1));
  current += n;

  if (current >= slider.length) current = 0;
  if (current < 0) current = slider.length - 1;
  
  last = current;
  slider[current].classList.add('show');
  sliderBg.classList.add('slider-bg-' + (current + 1));

  if (n == 1) document.querySelector('.show').classList.add('animation__right');
  else document.querySelector('.show').classList.add('animation__left');
};

btnPrev.onclick = () => nextSlide(-1);
btnNext.onclick = () => nextSlide(1);


/** Slider. Activating phone screens */

sliderScreens.forEach(el => el.onclick = () => {
  event.target.classList.toggle('screen');
});

sliderBtn.forEach((el,i) => el.onclick = () => {
  sliderScreens[i].classList.toggle('screen');
});


/** Portfolio. Tab switching */

const portfolioTab = (portfolio, value) => {
  let left = [], right = [];

  portfolio.forEach((el,i) => {
    (i + 1 < value)
    ? right.push('<li>' + el.innerHTML + '</li>')
    : left.push('<li>' + el.innerHTML + '</li>')
  });
 
  return left.concat(right).join('');
};

portfolioMenu.forEach(item => item.onclick = () => {
  portfolioMenu.forEach(el => el.classList.remove('active_tab'));
  event.target.classList.add('active_tab');

  if (event.target.innerHTML == 'All') 
    portfolio.innerHTML = portfolioTab(portfolioExamples, 1);

  if (event.target.innerHTML == 'Web Design') 
    portfolio.innerHTML = portfolioTab(portfolioExamples, 2);

  if (event.target.innerHTML == 'Graphic Design') 
    portfolio.innerHTML = portfolioTab(portfolioExamples, 3);

  if (event.target.innerHTML == 'Artwork') 
    portfolio.innerHTML = portfolioTab(portfolioExamples, 4);

  loadPortfolio();
});


/** Portfolio. Image interaction */

const loadPortfolio = () => {
  portfolio.querySelectorAll('li img').forEach(el => el.classList.remove('active_img'));

  portfolio.querySelectorAll('li img').forEach(item => item.onclick = () => {
    portfolio.querySelectorAll('li img').forEach(el => el.classList.remove('active_img'));
    event.target.classList.add('active_img');
  });
};

loadPortfolio();


/** Get a quote */

const messageGeneration  = () => {
  if(document.getElementById('form__subject').value) {
    messageTheme.innerHTML = 'Subject: ' + document.getElementById('form__subject').value;
  } else {
    messageTheme.innerHTML = 'No subject';
  }

  if(document.getElementById('textarea').value && document.getElementById('textarea').value != initialString) {
    messageDescription.innerHTML = 'Description: ' + document.getElementById('textarea').value;
  } else {
    messageDescription.innerHTML = 'No description';
  }
};

submit.onclick = (event) => {
  if (document.querySelector('form').checkValidity()) {
    event.preventDefault();
    messageGeneration();
    message.classList.remove('hidden');
  }
};

closeMessage.onclick = () => {
  message.classList.add('hidden');
  document.querySelector('form').reset();
};

/** Nav-drop-menu */

dropMenu.onclick = () => {
  menu.classList.toggle('nav-drop-menu');
  dropMenu.classList.toggle('tab-active');
  document.querySelector('.logo').classList.toggle('logo-active');
  document.querySelector('.overlay').classList.toggle('overlay-tint');
};
