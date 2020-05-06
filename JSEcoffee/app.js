const logo = document.querySelector('#logo');
const navLinks = document.querySelector('.nav-links');
const hero = document.querySelector('.hero');
const jackThumbnail = document.querySelector('#jackThumbnail');
const headline = document.querySelector('.headline');

const tl = new TimelineMax();

tl.fromTo(hero, 1.4, {height:'0%'}, {height:'80%', ease: "power3.inOut"})
  .fromTo(hero, 1.4, {width: '80%'}, {width:'100%', ease: "power3.inOut"}, "-=0.5")
  .fromTo(navLinks, 0.6, {opacity: 0, x: 30}, {opacity: 1, x:0}, "-=1")
  .fromTo(logo, 0.6, {opacity: 0, x: -30}, {opacity: 1, x:0}, "-=1")
  .fromTo(headline, 0.6, {opacity: 0}, {opacity: 1}, "-=0.8")
  .fromTo(jackThumbnail, 1, {opacity: 0, y: 30, scaleY: -1}, {opacity: 1, y:0, scaleY: -1}, "-=1");

function scrollAppear(){
  const coffeeArticle = document.querySelector('.coffee-article');
  const articlePosition = coffeeArticle.getBoundingClientRect().top;
  const screenposition = window.innerHeight;

  if(articlePosition < screenposition/2){
    coffeeArticle.classList.add('coffee-article-appear');
  }

}

document.addEventListener('scroll',scrollAppear);
