import './style.css'
import Alpine from 'alpinejs'

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
  console.log(elements)

  elements.forEach(element => {
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      element.setAttribute("onclick", `showInfos(this)`)
    } else {
      element.classList.add('group')
    }
  })  
}

function showInfos(element) {
  const content = element.querySelector('.projectCardContent')
  const text = element.querySelector('.projectCardText')
  content.classList.toggle('!top-0')
  text.classList.toggle('opacity-0')
  text.classList.toggle('blur')
}

window.showInfos = showInfos;

window.onload = function() {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector('body').classList.remove('overflow-hidden')
  }, 0)
  
}




gsap.to('.cloudLayer3', {
  scrollTrigger: {
    trigger: '.cloudLayer3',
    start: `top ${document.querySelector('.cloudLayer3').getBoundingClientRect().top}px`,
    end:`bottom ${document.querySelector('.cloudLayer3').getBoundingClientRect().top *(0/100)}px`,
    scrub: true,
    force3D: false
  },
  y: `${(window.innerHeight - document.querySelector('.cloudLayer3').getBoundingClientRect().top)/3}px` ,
  ease: "linear",
})
gsap.to('.cloudLayer2', {
  scrollTrigger: {
    trigger: '.cloudLayer2',
    start: `top ${document.querySelector('.cloudLayer3').getBoundingClientRect().top}px`,
    end:`bottom ${document.querySelector('.cloudLayer3').getBoundingClientRect().top *(0/100)}px`,
    scrub: true,
    force3D: false
  },
  y: `${(window.innerHeight - document.querySelector('.cloudLayer2').getBoundingClientRect().top)/4}px`,
  ease: "linear",
})





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

function createShootingStar(angle = -45) {
  const shootingStarsContainer = document.querySelector('.shooting-stars');
  const shootingStar = document.createElement('div');
  shootingStar.classList.add('shooting-star');

  // Création de la traînée
  const trail = document.createElement('div');
  trail.classList.add('trail');
  shootingStar.appendChild(trail);

  // Positionner l'étoile filante à une position horizontale aléatoire
  const startX = Math.random() * window.innerWidth; // Largeur de l'écran
  const startY = -10; // Commence au-dessus de l'écran

  // Position verticale aléatoire (entre 0 et la hauteur de l'écran)
  const randomVerticalTranslation = window.innerHeight+10; // Valeur entre 200px et 1000px pour l'exemple

  // Calcul du point d'arrivée en utilisant l'angle
  const angleInRadians = angle * (Math.PI / 180); // Convertir l'angle en radians
   // Calcul de la translation horizontale
  const endY = startY + randomVerticalTranslation; 
  const endX = startX + randomVerticalTranslation * Math.tan(angleInRadians);  // Calcul de la translation verticale

  // Définir les positions de départ et de fin avec des variables CSS
  shootingStar.style.left = `${startX}px`;
  shootingStar.style.top = `${startY}px`;
  shootingStar.style.setProperty('--end-x', `${endX}px`);
  shootingStar.style.setProperty('--end-y', `${endY}px`);

  // Ajouter l'étoile filante au conteneur
  shootingStarsContainer.appendChild(shootingStar);

  // Durée de l'animation (ici 2 secondes)
  shootingStar.style.animation = `moveShootingStar 1s linear forwards`;

  // Supprimer l'étoile et sa traînée après l'animation
  setTimeout(() => {
    shootingStar.remove();
  }, 1000); // 2s pour correspondre à la durée de l'animation
}

function moonAdaptativeSize() {
  const screenSizeValue = window.innerWidth >= 768 ? 4 : 5
  const ratio = window.innerWidth/window.innerHeight*screenSizeValue
  document.querySelector('.moon').style.height = `${window.innerWidth/ratio}px`
  document.querySelector('.moon').style.width = `${window.innerWidth/ratio}px`
}

document.addEventListener('DOMContentLoaded', () => {
  
  moonAdaptativeSize()




  const moon = document.querySelector(".moon");
  const moonSize = moon.offsetWidth;

  // 🔹 **Position initiale à -90° (haut du cercle)**
  gsap.set(moon, {
    x: window.innerWidth / 2.4, 
    y: -window.innerHeight / 2.8
  });

  // 🔹 **Animation circulaire complète**

  

  window.addEventListener('resize', () => {
    moonAdaptativeSize()
  })

  generateStars("starrySky", 100);
  generateStars("starrySky", 200, [0.6, 0.2]);

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes twinkle {
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }`;
  document.head.appendChild(style);

  setInterval(() => {
    let angle = 30
    createShootingStar(angle);  // Passer l'angle à la fonction
  }, Math.random() * 3000 + 3000);
});


/*-------------------------------------
Introduction
-------------------------------------*/


gsap.to('.presentationImage', {
  scrollTrigger: {
    trigger: '.presentationImage',
    start: `top+=${document.querySelector('.presentationImage').closest('div').offsetHeight/2}px 100%`,
    end: `top+=${document.querySelector('.presentationImage').closest('div').offsetHeight/2}px 20%`,
    scrub: 0.5,
    force3D: false
  },
  y: -(document.querySelector('.presentationImage').getBoundingClientRect().bottom - document.querySelector('.presentationImage').closest('div').getBoundingClientRect().bottom)
})


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

/*-------------------------------------
Compétences
-------------------------------------*/
// document.addEventListener("DOMContentLoaded", function () {
//   const lineContainer = document.querySelector(".line-container");

//   const lineInterval = 5000; // Intervalle pour créer de nouvelles lignes en millisecondes

//   function createLine() {
//     const line = document.createElement("div");
//     line.classList.add("line");
//     line.classList.add('rounded-full', 'backdrop-blur-md')

//     // Hauteur entre 5px et 12px
//     line.style.height = `${Math.floor(Math.random() * 8) + 5}px`;

//     // Largeur aléatoire entre 50% et 150% de la largeur de la page
//     const lineWidth = Math.floor(Math.random() * 20) + 50; // entre 50% et 150%
//     line.style.width = `${lineWidth}%`;

//     // Position verticale aléatoire
//     line.style.top = `${Math.floor(Math.random() * 100)}%`;

//     // Couleur aléatoire
//     const colorsArray = ['#20dbd8', '#82e8b3', '#b60e1a', '#c37b0f', '#ced370']
//     line.style.backgroundColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];

//     // Calcul de la position de départ : hors de l'écran
//     const direction = Math.random() > 0.5 ? "left" : "right"; // Direction aléatoire (gauche ou droite)
//     const screenWidth = window.innerWidth; // Largeur de la fenêtre du navigateur
//     const lineLength = (lineWidth / 100) * screenWidth; // Longueur de la ligne en pixels

//     // Si la direction est à gauche
//     const startPosition = direction === "left" ? -lineLength : screenWidth; // Position de départ (gauche ou droite)
    
//     // Calcul de la position de fin : la ligne doit sortir complètement de l'écran à gauche
//     const endPosition = direction === "left" ? screenWidth : -lineLength; // Sortie du côté opposé

//     // Définir la position de départ et de fin dans les variables CSS personnalisées
//     line.style.setProperty("--start-position", `${startPosition}px`);
//     line.style.setProperty("--end-position", `${endPosition}px`);

//     // Ajouter la ligne au conteneur
//     lineContainer.appendChild(line);

//     // Durée de l'animation aléatoire entre 3s et 7s
//     const duration = Math.floor(Math.random() * 15) +20; // Durée de l'animation en secondes
//     line.style.setProperty("--animation-duration", `${duration}s`);

//     // Supprimer la ligne après l'animation
//     setTimeout(() => {
//       line.remove();
//     }, duration * 1000);
//   }
//   function getRandomColor() {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }

//   gsap.to('.line-container', {
//   scrollTrigger: {
//     trigger: '.skillsSecTitle',
//     start: "top 70%",
//     end:`top 10%`,
//     scrub: true,
//   },
//   onComplete: () => {
//     setInterval(createLine, lineInterval);
//   },
//   ease: "linear",
//   opacity: 0.4,
//   filter: 'blur(0px)'
// })
// });
// let caveSVG = 0
// switch (true) {
//   case window.innerWidth >= 1280 :
//     caveSVG = document.querySelector('.caveXL');
//     break;
//   case window.innerWidth < 640:
//     caveSVG = document.querySelector('.caveSM');
//     break;
//   default :
//     caveSVG = document.querySelector('.caveMD');
//     break;
// }

// console.log(caveSVG)


// const caveZeroColor = window.getComputedStyle(caveSVG.querySelector('.cave-0')).fill;
// gsap.fromTo('.cave-0', 
//   {fill: "black" },
//   {
//     fill: caveZeroColor,
//     scrollTrigger: {
//       trigger: caveSVG,
//       start: "top 75%",
//       end: "bottom 50%",
//       scrub: 1
//     },
//     ease: "power1.Out"
//   }  // La couleur de départ est le noir
// )


// const caveOneColor = window.getComputedStyle(caveSVG.querySelector('.cave-1')).fill;
// gsap.fromTo('.cave-1', 
//   {fill: "black" },
//   {
//     fill: caveOneColor,
//     ease: "power1.in",
//     scrollTrigger: {
//       trigger: caveSVG,
//       start: "top 75%",
//       end: "bottom 90%",
//       scrub: 1
//     }
//   }  // La couleur de départ est le noir
// )

// const caveTwoColor = window.getComputedStyle(caveSVG.querySelector('.cave-2')).fill;
// gsap.fromTo('.cave-2', 
//   {fill: "black" },
//   {
//     fill: caveTwoColor,
//     ease: "power2.in",
//     scrollTrigger: {
//       trigger: caveSVG,
//       start: "top 75%",
//       end: "bottom 80%",
//       scrub: 1
//     }
//   }  // La couleur de départ est le noir
// )

// const caveThreeColor = window.getComputedStyle(caveSVG.querySelector('.cave-3')).fill;
// gsap.fromTo('.cave-3', 
//   {fill: "black" },
//   {
//     fill: caveThreeColor,
//     ease: "power3.in",
//     scrollTrigger: {
//       trigger: caveSVG,
//       start: "top 75%",
//       end: "bottom 70%",
//       scrub: 1,
//     }
//   }  // La couleur de départ est le noir
// )

// const caveFourColor = window.getComputedStyle(caveSVG.querySelector('.cave-4')).fill;
// gsap.fromTo('.cave-4', 
//   {fill: "black" },
//   {
//     fill: caveFourColor,
//     ease: "power4.in",
//     scrollTrigger: {
//       trigger: caveSVG,
//       start: "top 75%",
//       end: "bottom 60%",
//       scrub: 1,
//     }
//   }  // La couleur de départ est le noir
// )

// const caveFiveColor = window.getComputedStyle(caveSVG.querySelector('.cave-5')).fill;
// gsap.fromTo('.cave-5', 
//   {fill: "black" },
//   {
//     fill: caveFiveColor,
//     ease: "power4.in",
//     scrollTrigger: {
//       trigger: caveSVG,
//       start: "top 75%",
//       end: "bottom 50%",
//       scrub: 1,
//     }
//   }  // La couleur de départ est le noir
// )

// gsap.from('#forestLight', {
//   scrollTrigger: {
//     trigger: '#forestLight',
//     //markers: true,
//     start: "top 75%",
//     end:`top 50%`,
//     scrub: true,
//   },
//   ease: "power1.out",
//   fill: '#000000',
// })


const forest = window.innerWidth >= 640 ? document.querySelector('#forestLight') : document.querySelector('#forestLightSM');

const forestTl = gsap.timeline({
  scrollTrigger: {
    trigger: forest,
    markers: true,
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
  translateX: `-${document.querySelector('.azBoutique').offsetWidth - document.querySelector('.parallaxAz2').offsetWidth}px`
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

console.log(document.querySelector(citySkyline).getBoundingClientRect().height)

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

// skylineTimeline.to('#Distant polygon', {
//   y: `${document.querySelector(citySkyline).getBoundingClientRect().height/4}px`,
//   duration: 10,
// }, "-=10")
// .to('#Medium path', {
//   y: `${document.querySelector(citySkyline).getBoundingClientRect().height/8}px`,
//   duration: 10,
// }, "-=10")


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



let countProject = 0

gsap.to('.projectSecTitle h1', {
  scrollTrigger: {
    trigger: '.projectSecTitle h1',
    start: "top 85%",
    end: "bottom 85%",
    scrub: true,
    force3D: false
  },
  opacity: 1,
  filter: "blur(0px)",
  x:0
})
gsap.to('.projectSecTitle p', {
  scrollTrigger: {
    trigger: '.projectSecTitle h1',
    start: "top 85%",
    end: "bottom 85%",
    scrub: true,
    force3D: false
  },
  opacity: 1,
  delay: 0.5,
  filter: "blur(0px)",
  x:0
})
gsap.to('#mesProjets', {
  scrollTrigger: {
    trigger: '.projectSecTitle',
    onUpdate: self => {
      if (countProject === 0) {
        countProject += 1
        const projectCards = document.querySelectorAll('.projectCard')
        let counterCard = 0
        const arrayCards = Array.from(projectCards)
        projectCards.forEach(function (card) {
          const index = arrayCards.indexOf(card)
          if (getVisiblePercentage(card)>=90) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: `top-=${card.offsetHeight/2}px ${card.getBoundingClientRect().top - card.offsetHeight/2 -counterCard}px`,
                end: `top-=${card.offsetHeight/2}px ${card.getBoundingClientRect().top - card.offsetHeight}px`,
                toggleActions: 'play none none none',
                scrub: 1,
                force3D: false
              }
            })

            tl.to(card, {
              delay: index,
              opacity: 1,
              scale:1.05,
              filter: "blur(0px)",
              duration: 4
            })
            .to(card, {
              delay: index,
              scale:1,
              duration: 1
            }, )
          } else {
            let row = 0
            switch (true) {
              case window.innerWidth >= 1536 :
                row = 3
                break;
              case window.innerwidth >= 1024 :
                row = 2
                break
              default:
                row = 1
                break
            }
            let delay = (arrayCards.indexOf(card))%row
            console.log(arrayCards.indexOf(card)+1)
            const tal = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: `top-=${card.offsetHeight/2}px ${window.innerHeight-card.offsetHeight/2}px`,
                end: `top-=${card.offsetHeight/2}px ${window.innerHeight - card.offsetHeight}px`,
                toggleActions: 'play none none none',
                scrub: 1,
                force3D: false
              }
            })

            tal.to(card, {
              delay: delay,
              opacity: 1,
              scale:1.05,
              filter: "blur(0px)",
              duration: 4
            })
            .to(card, {
              delay: delay,
              scale:1,
              duration: 1
            }, )
          }
        })
      }
    }
  }
})


// const cardTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.projectSecTitle',
//     start: "top 60%",
//   },
//   duration: 0.55
// })

// cardTl.to('.projectCard', {
//   opacity:1,
//   filter: "blur(0px)",
//   scale: 1.05,
//   duration: 0.4,
//   stagger: 0.05
// })
// .to('.projectCard', {
//   scale: 1,
//   duration: 0.15,
//   stagger: 0.03,
//   ease: "power1.out"
// })

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.projectCard').forEach(card => {
//     card.style.height = `${card.offsetWidth/1.6}px`
//   })
// })
// window.addEventListener('resize', () => {
//   document.querySelectorAll('.projectCard').forEach(card => {
//     card.style.height = `${card.offsetWidth/1.6}px`
//   })
// })

//SECTION VEILLE TECHNOLOGIQUE




document.addEventListener("DOMContentLoaded", () => {
  let separator = document.querySelector('.vtContactSeparator');  
})

function getVisiblePercentage(element) {
  const elementRect = element.getBoundingClientRect(); // Récupère la position et la taille de l'élément
  const windowHeight = window.innerHeight; // Hauteur du viewport (fenêtre du navigateur)
  
  let elementHeight = elementRect.height;
  if (element.classList.contains('scale-[0.1%]'))
  {
    elementHeight *= 1000
  } // Hauteur totale de l'élément
  const top = elementRect.top; // Position de l'élément par rapport au haut de la fenêtre
  const bottom = elementRect.bottom; // Position de l'élément par rapport au bas de la fenêtre

  // Si l'élément est complètement en dehors du viewport, on renvoie 0
  if (bottom <= 0 || top >= windowHeight) {
    return 0;
  }

  // Si l'élément est totalement visible
  const visibleTop = Math.max(0, top);
  const visibleBottom = Math.min(windowHeight, bottom);

  // Calcul du pourcentage de visibilité
  const visibleHeight = visibleBottom - visibleTop;
  const visiblePercentage = (visibleHeight / elementHeight) * 100;

  return visiblePercentage;
}

function scrollToElement(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'  // Place l'élément en haut de la fenêtre
  });
}






// CONTACT

document.addEventListener('DOMContentLoaded', () => {
  resizeWaterfall()
  window.addEventListener('resize', () => {
    resizeWaterfall()
  })
})
function resizeWaterfall() {
  const svg = document.querySelector(".topMountains");
  const path = document.querySelector(".water");

  const distance = (svg.getBoundingClientRect().height + path.getBoundingClientRect().height);
  document.querySelector('.contactSec').style.paddingTop = `${distance-7}px`
  document.querySelector('.contactSec').style.marginTop = `-${svg.getBoundingClientRect().height}px`
  document.querySelector('.contactOverlay').style.top = `${distance-7}px`
}

const svg = document.querySelector(".topMountains");

gsap.to('#veilleTechno', {
  scrollTrigger: {
    trigger: svg,
    start: `top 100%`,
    end:`bottom 50%`,
    scrub: true,
  },
  ease: "linear",
  backgroundColor: "#57cdff",
})

document.querySelectorAll('.wfPart').forEach(part => {
  gsap.from(part, {
    scrollTrigger: {
      trigger: svg,
      start: `top 100%`,
      end:`bottom 50%`,
      scrub: true,
    },
    ease: "linear",
    fill: "black",
  })
})


gsap.from('.contactOverlay', {
  scrollTrigger: {
    trigger: svg,
    start: `top 100%`,
    end:`bottom 50%`,
    scrub: true,
  },
  ease: "linear",
  opacity: 1,
})



document.querySelectorAll(".topicPartial").forEach(topic => {
  gsap.to(topic, {
    scrollTrigger: {
      trigger: svg,
      start: `top 100%`,
      end:`bottom 50%`,
      scrub: true,
    },
    ease: "circ.in",
    filter: "blur(20px)",
    opacity: 0,
  })
})


document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();


  grecaptcha.ready(() => {
    grecaptcha.execute("6Le-gAErAAAAAAbFjKutBW9ctZgzc63wBI0D3TDe", { action: "submit" }).then((token) => {
        let formData = new FormData(this);
        formData.append("recaptcha_token", token);

        fetch("./src/contact.php", {
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






