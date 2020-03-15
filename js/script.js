const menu = document.querySelector('nav ul');

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
const initialString = 'Describe your project in detail...';

let current = 0;
let last = 0;


/** Header */

menu.addEventListener('click', (event) => {
  menu.querySelectorAll('li a').forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
});


/** Slider. Slide switch */

const nextSlide = n => {
  slider[last].classList.remove('show');
  sliderBg.classList.remove('slider-bg-' + (last + 1));
  current += n;
  
  if (current >= slider.length) current = 0;
  if (current < 0) current = slider.length - 1;
  
  last = current;
  slider[current].classList.add('show');
  sliderBg.classList.add('slider-bg-' + (current + 1));
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

const portfolioTab = (value, n) => {
  let content = [];

  for (let i = 0; i < portfolioExamples.length; i++) {
    if ((i + 1) % value === 0)
      content.push('<li>' + portfolioExamples[i - n].innerHTML + '</li>');
  }

  return content.join('');
};

portfolioMenu.forEach(item => item.onclick = () => {
  portfolioMenu.forEach(el => el.classList.remove('active_tab'));
  event.target.classList.add('active_tab');

  if (event.target.innerHTML == 'All') 
    portfolio.innerHTML = portfolioTab(1, 0);

  if (event.target.innerHTML == 'Web Design') 
    portfolio.innerHTML = portfolioTab(2, 0);

  if (event.target.innerHTML == 'Graphic Design') 
    portfolio.innerHTML = portfolioTab(2, 1);

  if (event.target.innerHTML == 'Artwork') 
    portfolio.innerHTML = portfolioTab(3, 1);

  loadPortfolio();
});


/** Portfolio. Image interaction */

const loadPortfolio = () => {
  portfolio.querySelectorAll('li img').forEach(el => el.classList.remove('active_img'));

  portfolio.querySelectorAll('li img').forEach(item => item.onclick = () => {
    portfolio.querySelectorAll('li img').forEach(el => el.classList.remove('active_img'));
    event.target.classList.add('active_img');
  });
}

loadPortfolio();


/** Get a quote */

const messageGeneration  = () => {
  if(document.getElementById('form__subject').value) {
    messageTheme.innerHTML = 'Тема: ' + document.getElementById('form__subject').value;
  } else {
    messageTheme.innerHTML = 'Без темы';
  }

  if(document.getElementById('textarea').value && document.getElementById('textarea').value != initialString) {
    messageDescription.innerHTML = 'Описание: ' + document.getElementById('textarea').value;
  } else {
    messageDescription.innerHTML = 'Без описания';
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
