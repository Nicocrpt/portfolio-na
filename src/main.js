import './style.css'
import Alpine from 'alpinejs'

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'; // si tu utilises la navigation
import { Navigation } from 'swiper/modules';

import { gsap } from "gsap";
    
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(Flip,ScrollTrigger,Observer,ScrollToPlugin,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase);
window.alpine = Alpine
Alpine.start()


function isMobileDevice(elementRef) {
  const elements = document.querySelectorAll(elementRef);
  console.log(elements);

  const isMobile = /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent) || isIpad();

  elements.forEach(element => {
    if (isMobile) {
      element.setAttribute("onclick", `showInfos(this)`);
    } else {
      element.classList.add('group');
    }
  });
}

function isIpad() {
  return (
    // Détection des anciens iPad (avant iPadOS 13)
    /iPad/.test(navigator.userAgent) ||
    // Détection des iPad exécutant iPadOS 13 ou version ultérieure
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function showInfos(element) {
  const content = element.querySelector('.projectCardContent')
  const text = element.querySelector('.projectCardText')
  content.classList.toggle('!top-0')
  text.classList.toggle('opacity-0')
  text.classList.toggle('blur')
}

function injectImage(element) {
  let wrapper = document.querySelector('#imageReceiver')
  wrapper.innerHTML = element.outerHTML
  let image = wrapper.children[0]
  image.style.width = "auto"
  image.style.maxWidth = window.innerWidth > 450 ? '80%' : '99%'
  image.style.maxHeight = '80%'
  image.style.borderRadius = '2px'
  image.classList.remove('object-cover', 'object-left')
  if (image.classList.contains('aspect-16/9')) {
    image.classList.remove('aspect-16/9')
  }
}

function injectImageTwo(element) {
  let wrapper = document.querySelector('#imageReceiver2')
  wrapper.innerHTML = element.outerHTML
  let image = wrapper.children[0]
  image.style.width = "auto"
  image.style.maxWidth = window.innerWidth > 450 ? '80%' : '99%'
  image.style.maxHeight = '80%'
  image.style.borderRadius = '2px'
  image.classList.remove('object-cover', 'object-left')
  if (image.classList.contains('hover:scale-103')) {
    image.classList.remove('hover:scale-103')
  }
}

window.showInfos = showInfos;
window.injectImage = injectImage;
window.injectImageTwo = injectImageTwo;

window.onload = function() {
    document.querySelector(".loader-wrapper").style.display = "none";
    document.querySelector('body').classList.remove('overflow-hidden')
}

function generateStars(svgId, numStars, scope = [2, 0.3]) {
  const svg = document.getElementById(svgId);
  const width = svg.viewBox.baseVal.width;
  const height = svg.viewBox.baseVal.height;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * scope[0] + scope[1]; // Taille entre 0.5 et 3 px
    const opacity = Math.random() * 0.5 + 0.5; // Opacité entre 0.5 et 1

    star.setAttribute("cx", x);
    star.setAttribute("cy", y);
    star.setAttribute("r", radius);
    star.setAttribute("fill", "white");
    star.setAttribute("opacity", opacity);

    // Animation scintillement aléatoire
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;

    svg.appendChild(star);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  generateStars("starrySky", 100);
  generateStars("starrySky", 200, [0.6, 0.2]);


  // setInterval(() => {
  //   let angle = 30
  //   createShootingStar(angle);  // Passer l'angle à la fonction
  // }, Math.random() * 3000 + 3000);
})


// function createShootingStar(angle = -45) {
//   const shootingStarsContainer = document.querySelector('.shooting-stars');
//   const shootingStar = document.createElement('div');
//   shootingStar.classList.add('shooting-star');

//   // Création de la traînée
//   const trail = document.createElement('div');
//   trail.classList.add('trail');
//   shootingStar.appendChild(trail);

//   // Positionner l'étoile filante à une position horizontale aléatoire
//   const startX = Math.random() * window.innerWidth; // Largeur de l'écran
//   const startY = -10; // Commence au-dessus de l'écran

//   // Position verticale aléatoire (entre 0 et la hauteur de l'écran)
//   const randomVerticalTranslation = window.innerHeight+10; // Valeur entre 200px et 1000px pour l'exemple

//   // Calcul du point d'arrivée en utilisant l'angle
//   const angleInRadians = angle * (Math.PI / 180); // Convertir l'angle en radians
//    // Calcul de la translation horizontale
//   const endY = startY + randomVerticalTranslation; 
//   const endX = startX + randomVerticalTranslation * Math.tan(angleInRadians);  // Calcul de la translation verticale

//   // Définir les positions de départ et de fin avec des variables CSS
//   shootingStar.style.left = `${startX}px`;
//   shootingStar.style.top = `${startY}px`;
//   shootingStar.style.setProperty('--end-x', `${endX}px`);
//   shootingStar.style.setProperty('--end-y', `${endY}px`);

//   // Ajouter l'étoile filante au conteneur
//   shootingStarsContainer.appendChild(shootingStar);

//   // Durée de l'animation (ici 2 secondes)
//   shootingStar.style.animation = `moveShootingStar 1s linear forwards`;

//   // Supprimer l'étoile et sa traînée après l'animation
//   setTimeout(() => {
//     shootingStar.remove();
//   }, 1000); // 2s pour correspondre à la durée de l'animation
// }







/*-------------------------------------
Introduction
-------------------------------------*/


let items = document.querySelectorAll('.timelineContainer .text-box');
let timelineLabels = document.querySelectorAll('.timelineLabel');

gsap.to('#parcoursLogo', {
  scrollTrigger: {
    trigger: '#parcoursLogo',
    start: "top 100%",
    scrub: true,
    force3D: false
  },
  rotate: 180,
  ease: "power2.inOut",
})


gsap.to('.gradientBackground', {
  scrollTrigger: {
    trigger: '.presentationSection',
    start: "top",
    end: `bottom-=${document.querySelector('.mountainsContainer').offsetHeight/5}px 100%`,
    scrub: true,
    force3D: false
  },
    opacity:1,
  ease : "power2.in"
})

gsap.to('.clouds', {
  scrollTrigger: {
    trigger: '.presentationSection',
    start: "top",
    end: "bottom-=100px 110%",
    scrub: 1,
    force3D: false
  },
  opacity:0.8,
  ease : "power3.in"
})

timelineLabels.forEach(function (svg) {
  if(1==1) {
    const svgTl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: svg,
        start: `top 105%`,
        end: `bottom ${window.innerHeight - (svg.getBoundingClientRect().height/2)}px`
      },
      duration: 5
    })
  
    svgTl.fromTo(svg, 
      {opacity: 0, scale: 0},
      {
      opacity: 1,
      ease:"power2.inOut",
      duration: 4,
      scale: 1.1
    })
    .to(svg, {
      x: 0,
      ease:"power2.inOut",
      duration: 1,
      scale: 1
    })
  }
  
})

items.forEach(function (item) {
  const itemTl = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: item,
      start: `top ${window.innerHeight - (item.offsetHeight/2)}px`,
      end: `bottom ${window.innerHeight - (item.offsetHeight * 0)}px`
    },
    duration: 5
  })
  itemTl.fromTo(item, 
    {opacity: 0, filter: 'blur(10px)'},
    {
    x: item.classList.contains('left') && window.innerWidth >= 640 ? 10 : -10,
    opacity: 1,
    ease:"linear",
    filter: 'blur(0px)',
    duration: 4
  })
  .to(item, {
    x: 0,
    ease:"linear",
    duration: 1
  })
})

function updateHeights() {

  document.querySelectorAll('.allInfos').forEach(container => {
    const infos = container.querySelector('.infos');
    const moreInfos = container.querySelector('.moreInfos');

    
    if (!moreInfos.classList.contains('opacity-0') ) {
      container.style.maxHeight = `${infos.offsetHeight + moreInfos.offsetHeight}px`;
    } else {
      container.style.maxHeight = `${infos.offsetHeight}px`;
    }
  });
}
function toggleInfo(element) {
  const container = element.querySelector('.allInfos');
  const infos = element.querySelector('.infos');
  const moreInfos = element.querySelector('.moreInfos');

  if (container.style.maxHeight === `${infos.offsetHeight}px`) {
    container.style.maxHeight = `${infos.offsetHeight + moreInfos.offsetHeight}px`;
  } else {
    container.style.maxHeight = `${infos.offsetHeight}px`;
  }
  moreInfos.classList.toggle('opacity-0');
  moreInfos.classList.toggle('scale-y-0');
}

function generateClouds(svgId, numClouds) {
  const svg = document.querySelector(svgId);
  const width = svg.viewBox.baseVal.width;
  const height = svg.viewBox.baseVal.height;

  for (let i = 0; i < numClouds; i++) {
      const cloud = document.createElementNS("http://www.w3.org/2000/svg", "g");
      cloud.classList.add('blur-[0.8px]');
      
      const x = Math.random() * width;
      const y = Math.random() * height * 1; // Limite la hauteur des nuages
      const scale = Math.random() * 0.4 + 0.4; // Échelle entre 0.6 et 1
      const opacity = Math.random() * 0.4 + 0.5; // Opacité entre 0.5 et 0.9

      // Créer une forme de nuage irrégulière avec plusieurs cercles de tailles et positions variées
      const numCircles = Math.floor(Math.random() * 4) + 4; // Nombre de cercles entre 4 et 7
      for (let j = 0; j < numCircles; j++) {
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          const cx = x + Math.random() * 80 - 40; // Espacement des cercles
          const cy = y + Math.random() * 30 - 10; // Variation en hauteur
          const radius = Math.random() * 20 + 20; // Taille des cercles
          const circleOpacity = Math.random() * 0.5 + 0.5; // Légère variation d'opacité
          const grayShade = Math.random() * 30 + 225; // Nuance de gris plus réaliste

          // Appliquer une couleur de remplissage avec des nuances de gris
          circle.setAttribute("cx", cx);
          circle.setAttribute("cy", cy);
          circle.setAttribute("r", radius);
          circle.setAttribute("fill", `rgb(${grayShade}, ${grayShade}, ${grayShade})`);
          circle.setAttribute("fill-opacity", circleOpacity);
          cloud.appendChild(circle);
      }

      cloud.setAttribute("transform", `scale(${scale})`);
      
      // Ajouter le nuage dans l'élément SVG
      svg.appendChild(cloud);

      // Animation de déplacement avec plus de réalisme
      const animationDuration = Math.random() * 30 + 30; // Durée de l'animation entre 15s et 30s
      const direction = Math.random() < 0.5 ? 1 : -1; // Direction aléatoire (gauche ou droite)
      const distance = Math.random() * 100 + 50; // Déplacement plus important pour plus de réalisme

      // Ajouter une animation de mouvement
      cloud.style.animation = `moveClouds ${animationDuration}s linear infinite alternate`;

      // Ajouter une propriété CSS pour la distance
      cloud.style.setProperty('--distance', `${distance * direction}px`);

      // Ajouter un z-index aléatoire entre 0 et 40 (exclus)
      const zIndex = Math.floor(Math.random() * 40); // z-index entre 0 et 39
      cloud.style.zIndex = zIndex;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const textBoxes = document.querySelectorAll('.text-box');
  
  textBoxes.forEach(function(element) {
    element.addEventListener('click', function() {
      toggleInfo(element); // Appelle la fonction toggleInfo avec l'élément cliqué
    });
  });

  generateClouds("#cloudySky", 5);

  // Ajouter les styles pour l'animation
  const styleCloud = document.createElement("style");
  styleCloud.innerHTML = `
    @keyframes moveClouds {
        0% { transform: translateX(0); }
        100% { transform: translateX(var(--distance)); }
    }
  `;
  document.head.appendChild(styleCloud);
});

window.addEventListener('resize', updateHeights);


const forest = window.innerWidth >= 640 ? document.querySelector('#forestLight') : document.querySelector('#forestLightSM');

const forestTl = gsap.timeline({
  scrollTrigger: {
    trigger: forest,
    start: `bottom-=${forest.getBoundingClientRect().height/2} 100%`,
    end:`bottom-=${forest.getBoundingClientRect().height/5} `,
    scrub: true,
    force3D: false
  },
  duration: 10
})

const frame = window.innerWidth >= 640 ? '.forestFrame' : '.forestFrameSM'
console.log(document.querySelectorAll(frame))

gsap.set(`#forestFour${window.innerWidth >= 640 ? '' : 'SM'}`, { y:`${document.querySelector(frame).getBoundingClientRect().height/14}px` })

forestTl.to(`#forestZero${window.innerWidth >= 640 ? '' : 'SM'}`, {
  ease: "linear",
  y:`${document.querySelector(frame).getBoundingClientRect().height/6}px`,
  duration: 10
}, '-=10')
.to(`#forestOne${window.innerWidth >= 640 ? '' : 'SM'}`, {
  ease: "linear",
  y:`${document.querySelector(frame).getBoundingClientRect().height/8}px`,
  duration: 10
}, "-=10")
.to(`#forestTwo${window.innerWidth >= 640 ? '' : 'SM'}`, {
  ease: "linear",
  y:`${document.querySelector(frame).getBoundingClientRect().height/10}px`,
  duration: 10
}, "-=10")
.to(`#forestThree${window.innerWidth >= 640 ? '' : 'SM'}`, {
  ease: "linear",
  y:`${document.querySelector(frame).getBoundingClientRect().height/12}px`,
  duration: 10
}, "-=10")
.to(`#forestFour${window.innerWidth >= 640 ? '' : 'SM'}`, {
  ease: "linear",
  y:`${document.querySelector(frame).getBoundingClientRect().height/20}px`,
duration: 10}, "-=10")
.to(`#forestFive${window.innerWidth >= 640 ? '' : 'SM'}`, {
  ease: "linear",
  y:`${document.querySelector(frame).getBoundingClientRect().height/18}px`,
  duration: 10
}, "-=10")
.to(`#forestSeven${window.innerWidth >= 640 ? '' : 'SM'}`, {
  ease: "linear",
  y:`${document.querySelector(frame).getBoundingClientRect().height/30}px`,
  duration: 10
}, "-=10")







document.addEventListener("DOMContentLoaded", () => {
  const container = window.innerWidth >= 640 ? document.querySelector(".particle-container") : document.querySelector(".particle-container-sm");
  console.log(container)
  const numParticles = 30; // Nombre de particules

  for (let i = 0; i < numParticles; i++) {
      createParticle();
  }
  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
  
    // Déterminer si la particule part de la gauche ou de la droite
    const isLeftToRight = Math.random() > 0.5;
  
    // Position horizontale (hors écran)
    const startX = isLeftToRight ? -20 : container.clientWidth + 20;
    const endX = isLeftToRight ? container.clientWidth + 20 : -20;
  
    // Position verticale aléatoire
    const startY = Math.random() * container.clientHeight;
  
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
  
    // Profondeur : Plus z-index est grand, plus la particule est "devant"
    const zIndex = Math.floor(Math.random() * 45);
    particle.style.zIndex = zIndex;
  
    // Taille et transparence en fonction de la profondeur
    const size = Math.random() * 10 + 2; // Entre 2px et 8px
    const opacity = 0.3 + (zIndex / 100) * 2; // Plus le zIndex est grand, plus c'est visible
  
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = `rgba(255, 241, 149, ${opacity})`;
  
    // Amplitude du flottement vertical
    const floatAmplitude = Math.random() * 40 + 10; // Entre 10px et 50px
  
    // Durée de l'animation
    const duration = Math.random() * 15 + 45; // Entre 5s et 15s
  
    // Animation combinée (mouvement horizontal + flottement vertical)
    particle.animate(
        [
            { transform: `translate(0px, 0px)`, opacity: opacity },
            { transform: `translate(${(endX - startX) / 2}px, ${-floatAmplitude}px)`, opacity: opacity * 0.8 },
            { transform: `translate(${endX - startX}px, ${floatAmplitude}px)`, opacity: opacity * 0.5 }
        ],
        {
            duration: duration * 1000,
            iterations: 1,
            easing: "linear"
        }
    );
  
    container.appendChild(particle);
  
    // Supprimer et recréer la particule après son cycle
    setTimeout(() => {
        particle.remove();
        createParticle();
    }, duration * 1000);
  }
});


/*-------------------------------------
Entreprise
-------------------------------------*/


gsap.to('.azProduct', {
  scrollTrigger: {
    trigger: '.parallaxAz1',
    start: "top 100%",
    end:`bottom 0%`,
    scrub: true,
  },
  ease: "linear",
  translateY: (window.innerWidth/window.innerHeight) * 100
})

gsap.to('.azBoutique', {
  scrollTrigger: {
    trigger: '.companyContent',
    start: `top 50%`,
    end:`bottom 50%`,
    scrub: true,
  },
  ease: "linear",
  translateX: `-${document.querySelector('.azBoutique').offsetWidth - document.querySelector('.parallaxAz2').offsetWidth -10}px`
})

gsap.to('.azBoutique-2', {
  scrollTrigger: {
    trigger: '.parallaxAz2',
    start: `top 100%`,
    end:`bottom 0%`,
    scrub: true,
  },
  ease: "linear",
  translateY: `-${document.querySelector('.azBoutique-2').offsetHeight - document.querySelector('.parallaxAz2').offsetHeight}px`
})


/*-------------------------------------
Projets
-------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  isMobileDevice('.projectCard')

  const sunLight = document.querySelector('.sunLight')

  sunLight.style.width = `${window.innerWidth/4}px`
  sunLight.style.height = `${window.innerWidth/4}px`
  sunLight.style.left = `${window.innerWidth/2 - sunLight.offsetWidth/2}px`
  sunLight.style.bottom = `-${window.innerWidth/15}px`
  
})


gsap.to('.gradientBackgroundCity', {
  scrollTrigger: {
    trigger: '#mesProjets',
    start: `top+=${document.querySelector('.projectContent').offsetHeight/3}px 50%`,
    end: `bottom 100%`,
    scrub: true,
    force3D: false
  },
    opacity:0.8,
  ease : "power2.in"
})

const citySkyline = window.innerWidth >= 640 ? '.citySkylineLg' : '.citySkylineSm'

gsap.to(citySkyline, {
  scrollTrigger: {
    trigger: '#mesProjets',
    start: `top+=${document.querySelector('.projectContent').offsetHeight/3}px 50%`,
    end: `bottom 100%`,
    scrub: true,
    force3D: false
  },
    opacity:1,
  ease : "power4.in"
})


const sunLightTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: citySkyline,
    start: `bottom+=${document.querySelector(citySkyline).getBoundingClientRect().height/5} 100%`,
    end: `bottom 25%`,
    scrub: true,
    force3D: false
  },
  duration: 10
})

const skylineTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: citySkyline,
    start: `top+=${document.querySelector(citySkyline).getBoundingClientRect().height*0.8} 100%`,
    end: `bottom`,
    scrub: true,
    force3D: false
  },
  duration: 10
})



skylineTimeline.to('#Distant polygon', {
  y: `${window.innerHeight/6}px`,
  duration: 10,
}, "-=10")
.to('#Medium path', {
  y: `${window.innerHeight/10}px`,
  duration: 10,
}, "-=10")

sunLightTimeline.to('.sunLight', {
  scale:5,
  duration: 10,
}, "-=10")
.to('#Distant polygon', {
  scrollTrigger: {
    trigger: citySkyline,
    start: `bottom+=${document.querySelector(citySkyline).getBoundingClientRect().height/5} 100%`,
    end: `bottom 25%`,
    scrub: true,
    force3D: false
  },
  fill:"#1e0b15",
  ease: "circ.Out",
  duration: 8
}, "-=8")
.to('#Medium path', {
  scrollTrigger: {
    trigger: citySkyline,
    start: `bottom+=${document.querySelector(citySkyline).getBoundingClientRect().height/5} 100%`,
    end: `bottom 25%`,
    scrub: true,
    force3D: false
  },
  fill:"#140717",
  ease: "circ.Out",
  duration: 6
}, "-=6")


const cardTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projectSecTitle',
    start: "top 60%",
  },
  duration: 0.3
})

cardTl.to('.projectCard', {
  opacity:0.9,
  filter: "blur(0px)",
  scale: 1.05,
  duration: 0.25,
  stagger: 0.05
})
.to('.projectCard', {
  scale: 1,
  duration: 0.1,
  stagger: 0.03,
  ease: "power1.out"
})

document.addEventListener('DOMContentLoaded', () => {
  const myName = document.querySelector('.mainTitle')
  myName.style.top = `${window.innerHeight/2 - myName.offsetHeight/2}px`
  document.querySelectorAll('.projectCard').forEach(card => {
    card.style.height = `${card.offsetWidth/1.6}px`
  })
})
window.addEventListener('resize', () => {
  const myName = document.querySelector('.mainTitle')
  myName.style.top = `${window.innerHeight/2 - myName.offsetHeight/2}px`

  document.querySelectorAll('.projectCard').forEach(card => {
    card.style.height = `${card.offsetWidth/1.6}px`
  })
})

//SECTION VEILLE TECHNOLOGIQUE



document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();


  grecaptcha.ready(() => {
    grecaptcha.execute("6Le-gAErAAAAAAbFjKutBW9ctZgzc63wBI0D3TDe", { action: "submit" }).then((token) => {
        let formData = new FormData(this);
        formData.append("recaptcha_token", token);

        fetch("./server/contact.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("messageResult").style.backgroundColor = "green"; 
            document.getElementById("messageResult").innerHTML = data;
            document.getElementById("sendMessage").classList.toggle('-translate-y-[200%]');
            document.getElementById("sendMessage").classList.toggle('opacity-0');
            setTimeout(() => {
              document.getElementById("sendMessage").classList.toggle('-translate-y-[200%]');
              document.getElementById("sendMessage").classList.toggle('opacity-0');
            }, 3000)
        })
        .catch(error => {
            document.getElementById("messageResult").style.backgroundColor = "red";
            document.getElementById("messageResult").innerHTML = "<p>Erreur lors de l'envoi du formulaire.</p>";
            document.getElementById("sendMessage").classList.toggle('-translate-y-[200%]');
            document.getElementById("sendMessage").classList.toggle('opacity-0');
            setTimeout(() => {
              document.getElementById("sendMessage").classList.toggle('-translate-y-[200%]');
              document.getElementById("sendMessage").classList.toggle('opacity-0');
            }, 3000)
        });
    });
  });

});


gsap.to('#veilleToContact', {
  scrollTrigger: {
    trigger: '#veilleToContact',
    start: "top+=200px 70%",
    toggleActions: 'restart pause reverse pause',
    end: "bottom ",
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    force3D: false
  },
  ease: "linear",
  translateY: (window.innerWidth/window.innerHeight) * 650
})





// highlight nav link:

const sections = document.querySelectorAll(".sectionClass");
console.log(sections)
const navLinks = document.querySelectorAll(".navLink");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('isintersecting')
      navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
        if (link.parentElement.children[1]) {
          link.parentElement.children[1].classList.toggle("!scale-x-100", isActive);
        } 
      });
    }
  });
}, {
  root: null,
  rootMargin: "-80px 0px 0px 0px",
  threshold: 0.1,
});

window.addEventListener('load', () => {
  sections.forEach(section => observer.observe(section));
});

document.querySelectorAll('a.smooth-scroll').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Empêche le saut instantané

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});