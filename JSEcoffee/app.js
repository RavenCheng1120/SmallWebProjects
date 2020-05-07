const logo = document.querySelector('#logo');
const navLinks = document.querySelector('.nav-links');
const hero = document.querySelector('.hero');
const jackThumbnail = document.querySelector('#jackThumbnail');
const headline = document.querySelector('.headline');

const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//fade in image
const tl = new TimelineMax();

tl.fromTo(hero, 1.4, {height:'0%'}, {height:'80%', ease: "power3.inOut"})
  .fromTo(hero, 1.4, {width: '80%'}, {width:'100%', ease: "power3.inOut"}, "-=0.5")
  .fromTo(navLinks, 0.6, {opacity: 0, x: 30}, {opacity: 1, x:0}, "-=1")
  .fromTo(logo, 0.6, {opacity: 0, x: -30}, {opacity: 1, x:0}, "-=1")
  .fromTo(headline, 0.6, {opacity: 0}, {opacity: 1}, "-=0.8")
  .fromTo(jackThumbnail, 1, {opacity: 0, y: 30, scaleY: -1}, {opacity: 1, y:0, scaleY: -1}, "-=1");


//scroll appear
function scrollAppear(){
  const coffeeArticle = document.querySelector('.coffee-article');
  const articlePosition = coffeeArticle.getBoundingClientRect().top;
  const screenposition = window.innerHeight;

  if(articlePosition < screenposition/2){
    coffeeArticle.classList.add('coffee-article-appear');
  }
}

document.addEventListener('scroll',scrollAppear);


//image slider
let counter = 1;
let carouselSize = carouselImages[0].clientWidth;
carouselSlide.style.transform = 'translateX(' + (-carouselSize * counter) + 'px)';

nextBtn.addEventListener('click', ()=>{
  if(counter >= carouselImages.length-1) return;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-carouselSize * counter) + 'px)';
  clearInterval(sliderTimer);
  sliderTimer = setInterval(()=>{nextBtn.click();}, 4000);
});

prevBtn.addEventListener('click', ()=>{
  if(counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-carouselSize * counter) + 'px)';
  clearInterval(sliderTimer);
  sliderTimer = setInterval(()=>{nextBtn.click();}, 4000);
});

carouselSlide.addEventListener('transitionend', ()=>{
  if(carouselImages[counter].id === 'lastClone'){
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-carouselSize * counter) + 'px)';
  }
  if(carouselImages[counter].id === 'firstClone'){
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + (-carouselSize * counter) + 'px)';
  }
});

//image slider自動換頁
let sliderTimer = setInterval(()=>{nextBtn.click();}, 4000);

//slider根據視窗大小縮放
function reportWindowSize() {
  carouselSize = carouselImages[0].clientWidth;
  carouselSlide.style.transform = 'translateX(' + (-carouselSize * counter) + 'px)';
}
window.onresize = reportWindowSize;

//閃爍
function blink() {
  const blinkText = document.querySelector('.typing-line');
	TweenLite.to(blinkText, 0.3, {
		autoAlpha: 0,
		delay: 0.2,
		onComplete: function() {
			TweenLite.to(blinkText, 0.3, {
				autoAlpha: 1,
				delay: 0.2,
				onComplete: blink
			});
		}
	});
}
blink();

//打字效果
const typeTexts = ['Coffee', 'Jacksepticeye', 'Laughter'];
let typeCount = 0;
let typeIndex = 0;
let currentText ='';;
let letter = '';

function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

(async function typeOut(){
  if(typeCount === typeTexts.length)
    typeCount = 0;
  currentText = typeTexts[typeCount];
  letter = currentText.slice(0, ++typeIndex);

  document.querySelector('.typing').textContent = letter;
  if(letter.length === currentText.length){
    typeCount++;
    typeIndex = 0;
    await sleep(1000);
  }
  setTimeout(typeOut, 300);
}());
