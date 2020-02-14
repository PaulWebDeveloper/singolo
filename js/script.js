const slider = document.querySelectorAll('.slider__content li');
const btnPrev = document.querySelector('.arrow_left');
const btnNext = document.querySelector('.arrow_right');

let current = 0;
let last = 0;

const nextSlide = n => {
  slider[last].className = '';
  current += n;
  
  if (current >= slider.length) current = 0;
  if (current < 0) current = slider.length - 1;
  
  last = current;
  slider[current].className = 'show';
};

btnPrev.onclick = () => nextSlide(-1);
btnNext.onclick = () => nextSlide(1);
