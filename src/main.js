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

const homeTl = gsap.timeline(
  {
    scrollTrigger: {
      trigger: '.mainTitle',
      start: `top ${document.querySelector('.mainTitle').offsetTop}px`,
      end: `bottom+=${(window.innerHeight - (document.querySelector('.mainTitle').offsetHeight + document.querySelector('.mainTitle').offsetTop))/1.5}px`,
      scrub: true,
    },
  }
);

gsap.to('#homeSection', {
  scrollTrigger: {
    trigger: '#homeSection',
    start: "top",
    markers: true,
    end:`top+=${document.querySelector('#homeSection').offsetHeight/4}px`,
    scrub: 1,
    pin: true,
    pinSpacing: true
  }
})

homeTl.to('.mainTitle', {y: 1000, duration: 10, ease: "sine.inOut"})
.to('.moon', {
  motionPath: {
    path: [
      { x: 0, y: 0 },
      
      { x: `${window.innerWidth/2}px`, y: `-${window.innerHeight - document.querySelector('.moon').offsetHeight*1.5}px` }, // Point culminant (centre haut)
      { x: `${window.innerWidth + document.querySelector('.moon').offsetHeight}px`, y: 0 },
       // Point de départ (en bas à gauche)
      // Point final (en bas à droite)
    ], // L'intensité de l'arc
    autoRotate: true,
    curviness: 1 // Si on veut que l'élément suive l'orientation de la trajectoire
  },
  duration: 8, // Temps total pour l'animation (scrub prend en charge la vitesse liée au scroll)
}, "-=10");


gsap.to('.skillsTitle', {
  scrollTrigger: {
    trigger: '.skillsTitle',
    start: "top 10%",
    end:`top+=${document.querySelector('.skillsSection').offsetHeight}px`,
    scrub: 1,
    pin: true,
    pinSpacing: false
  }
})

gsap.to('.skillsContent', {
  scrollTrigger: {
    trigger: '.skillsContent',
    endTrigger: '.skillsContent',
    start: `top+=${document.querySelector('.skillsSection').offsetHeight/2}px 50%`,
    end:`top+=${document.querySelector('.skillsSection').offsetHeight/2}px`,
    scrub: 1,
    pin: true,
    pinSpacing: false
  }
})

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.skillsTitle',
    start: "top 50%",
    scrub: 0.5,

  }
})

timeline.to('.skillsTitle', {opacity:1,filter: "blur(0px)" , duration: 2, })
// .to('.skillsTitle', {opacity:1, duration: 6})
// .to('.skillsTitle', {opacity:0, duration: 1})





























/*-------------------------------------
TimeLine
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

timelineLabels.forEach(function (svg) {
  ScrollTrigger.create({
    trigger: svg,
    start: 'bottom 98%',
    onEnter: function () {
      svg.classList.add('active');
    },
  })
})

items.forEach(function (item) {
  ScrollTrigger.create({
    trigger: item,
    start: 'bottom 98%',

    onEnter: function () {
      item.classList.add('active');
    },
  })
})




// SECTION COMPANY

gsap.to('.companySecTitle h1', {
  scrollTrigger: {
    trigger: '.companySecTitle h1',
    start: "top 80%",
    end: "bottom 80%",
    scrub: true,
    force3D: false
  },
  opacity: 1
})
gsap.to('.companySecTitle p', {
  scrollTrigger: {
    trigger: '.companySecTitle h1',
    start: "top 80%",
    end: "bottom 80%",
    scrub: true,
    force3D: false
  },
  delay: 0.5,
  opacity: 1,
  filter: "blur(0px)",
  y:0
})

let countCompany = 0
gsap.to('.skillsSec', {
  scrollTrigger: {
    trigger: '.companySecTitle',
    onUpdate: self => {
      console.log(getVisiblePercentage(document.querySelector('.skillsSec')))
      if (getVisiblePercentage(document.querySelector('.skillsSec')) < 50 && countCompany === 0) {
        countCompany += 1
        gsap.to('.skillsContent', {
          scrollTrigger: {
            trigger: '.companySecTitle',
            start: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          opacity: 0,
        })
      }
      if (window.getComputedStyle(document.querySelector('.skillsContent')).opacity === "0" && countCompany === 1) {
        countCompany += 1
        gsap.to('.skillsSec', {
          scrollTrigger: {
            trigger: '.companySecTitle',
            start: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          backgroundColor: "black",
        })
        gsap.to('.companySec', {
          scrollTrigger: {
            trigger: '.companySecTitle',
            start: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          backgroundColor: "black",
        })
        gsap.to('.companySecTitle h1', {
          scrollTrigger: {
            trigger: '.companySecTitle',
            start: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          color: "white",
        })
        gsap.to('.companySecTitle p', {
          scrollTrigger: {
            trigger: '.companySecTitle',
            start: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          color: "rgb(255, 255, 255, 0.7)",
        })
      }
      console.log(countCompany)
      if (window.getComputedStyle(document.querySelector('.companySec')).backgroundColor === "rgb(0, 0, 0)" && countCompany === 2) {
        console.log('ok')
        countCompany += 1
        gsap.to('.companyContent', {
          scrollTrigger: {
            trigger: '.companySecTitle',
            start: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.companySecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          opacity: 1,
          filter: "blur(0px)"
        })
      }
    }
  },

})

gsap.to('.azProduct', {
  scrollTrigger: {
    trigger: '.companyContent',
    start: "top 50%",
    end:`bottom 50%`,
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


// SECTION PROJET

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
      if (getVisiblePercentage(document.querySelector('.companyContent')) < 30 && countProject === 0) {
        countProject += 1
        gsap.to('.companyContent', {
          scrollTrigger: {
            trigger: '.projectSecTitle',
            start: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          opacity: 0,
        })
      }
      if (window.getComputedStyle(document.querySelector('.companyContent')).opacity === "0" && countProject === 1) {
        countProject += 1
        gsap.to('.companySec', {
          scrollTrigger: {
            trigger: '.projectSecTitle',
            start: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          backgroundColor: "white",
        })
        gsap.to('#mesProjets', {
          scrollTrigger: {
            trigger: '.projectSecTitle',
            start: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          backgroundColor: "white",
        })
        gsap.to('.projectSecTitle h1', {
          scrollTrigger: {
            trigger: '.projectSecTitle',
            start: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.projectSecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          color: "black",
        })
      }
      if (window.getComputedStyle(document.querySelector('#mesProjets')).backgroundColor === "rgb(255, 255, 255)" && countProject === 2) {
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


//SECTION VEILLE TECHNOLOGIQUE

let countVeille = 0

gsap.to('#veilleTitle', {
  scrollTrigger: {
    trigger: '#veilleTitle',
    start: "top 85%",
    end: "bottom 85%",
    scrub: true,
    force3D: false
  },
  opacity: 1
})

gsap.to('.projetsContent', {
  scrollTrigger: {
    trigger: '#veilleTitle',
    onUpdate: self => {
      if (getVisiblePercentage(document.querySelector('.projetsContent')) < 50 && countVeille === 0) {
        countVeille += 1
        gsap.to('.projetsContent', {
          scrollTrigger: {
            trigger: '#veilleTitle',
            start: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          opacity: 0,
          onComplete: () => {
            document.querySelector('#veilleTechno').classList.remove('overflow-hidden')
          }
        })
      }
      if (window.getComputedStyle(document.querySelector('.projetsContent')).opacity === "0" && countVeille === 1) {
        countVeille += 1
        gsap.to('#mesProjets', {
          scrollTrigger: {
            trigger: '#veilleTitle',
            start: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          backgroundColor: "black",
        })

        gsap.to('#veilleTechno', {
          scrollTrigger: {
            trigger: '#veilleTitle',
            start: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true,
          },
          backgroundColor: "black",
        })
        gsap.to('#veilleTitle', {
          scrollTrigger: {
            trigger: '#veilleTitle',
            start: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true
          },
          color: "white",
        })
      }
      if (window.getComputedStyle(document.querySelector('#veilleTechno')).backgroundColor === "rgb(0, 0, 0)" && countVeille === 2) {
        countVeille += 1
        gsap.to('#rssLogo', {
          scrollTrigger: {
            trigger: '#veilleTitle',
            start: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('#veilleTitle').getBoundingClientRect().top/2}px`,
            scrub: true
          },
          opacity: 1,
          scale: 1
        })
      }
    }
  },
  opacity: 1
})

gsap.to('.pinnedVt', {
  scrollTrigger: {
    trigger: '.pinnedVt',
    start: "top 100px",
    end: 'top+=1000px',
    pin: true,
    pinSpacing: false,
    onEnter: () => {
      gsap.to('#feedlyIntro', {
        scrollTrigger: {
          trigger: '#feedlyIntro',
          start: `top 50%`,
          end: 'top+=100px',
        },
        opacity: 1,
        filter: "blur(0px)",

      })

    }
  },

})


gsap.to('#feedlyIntro', {
  scrollTrigger: {
    trigger: '#feedlyIntro',
    start: `top+=${document.querySelector('#feedlyIntro').offsetHeight/2} 50%`,
    end: 'top+=1000px',
    pin: true,
    pinSpacing: false,},})




// document.addEventListener('scroll', () => {
//   console.log(document.querySelector('.projectCard'))
//   console.log(getVisiblePercentage(document.querySelector('#mesProjets')))
// })





const contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.textArea',
    endTrigger: '.textArea',
    start: "bottom 100%",
    toggleActions: 'restart pause reverse pause',
    end: "bottom 75%",
    scrub: true,
    force3D: false
  }
})

contactTl.to('#veilleTechno', {
  opacity: 0,
  filter: "blur(20px)",
  duration: 100
})
.to('.blackOverlay', {
  opacity: 0,
  filter: "blur(20px)",
  duration: 100
}, '-=100')
.to('.navBar', {
  backgroundColor: "rgba(255, 255, 255, 0)",
  duration: 100,
  backdropFilter: "blur(0px)"
}, '-=100')


var topicPartials = document.querySelectorAll('.topicPartial');


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

// gsap.to('.blackOverlay', {
//   scrollTrigger: {
//     trigger: '.vtContactSeparator',
//     endTrigger: '.vtContactSeparator',
//     start: "top",
//     toggleActions: 'restart pause reverse pause',
//     end: "top+=50px",
//     scrub: true,
//     force3D: false
//   },
//   ease: "linear",
//   opacity: 0,
//   filter: "blur(10px)",

// })

document.addEventListener("DOMContentLoaded", () => {
  let separator = document.querySelector('.vtContactSeparator');
  // console.log(document.querySelector('#veilleTechno').offsetHeight/window.innerHeight)
  // console.log(document.querySelector('#veilleTechno').scrollHeight)
  // console.log(veilleTl.totalDuration())
  
})


// document.addEventListener("DOMContentLoaded", () => {
//   let monElement = document.getElementById("feedlyIntro");
//   let nextElement = document.querySelector("#lastvtContent");

//   let height = monElement.getBoundingClientRect().height;

//   nextElement.style.marginTop = `-${height+300}px`;
//    // Décale l'élément suivant vers le haut
// });





        // Ce script va être exécuté dès que la page est chargée
      //   window.onbeforeunload = function() {
      //     // Défilement vers le haut de la page
      //     window.scrollTo(0, 0);
      // };

      // window.addEventListener("resize", () => {
      //   ScrollTrigger.refresh();
      // });
      


      function getDynamicStart(element, viewportRatio) {
        let el = document.querySelector(element);
        if (!el) return "top 10%"; // Sécurité si l'élément n'existe pas
        let contentHeight = el.offsetHeight;
        let viewportHeight = window.innerHeight;
        
        let adjustedOffset = contentHeight / 2; // Moitié de la hauteur de l'élément
        let viewportOffset = viewportHeight * viewportRatio; // % du viewport
    
        return `top+=${adjustedOffset}px ${viewportRatio * 100}%`;
    }

    function getDuration(section) {
      const windowHeight = window.innerHeight;
      const sectionWidth = section.offsetWidth;
      const sectionHeight = section.offsetHeight;
      const referenceHeight = 1440
      const referenceSectionHeight = 4765
      const scalingFactor = (sectionHeight/windowHeight) / (4765/1440);
      // console.log(scalingFactor)
      // console.log(100 * scalingFactor)
      return  100 * scalingFactor
      // const perfectRatio = 3.768987341772152
    }

    function setRatio(section, baseValue) {
      return getDuration(section) * baseValue / 100
    }




    function getVisiblePercentage(element) {
      const elementRect = element.getBoundingClientRect(); // Récupère la position et la taille de l'élément
      const windowHeight = window.innerHeight; // Hauteur du viewport (fenêtre du navigateur)
      
      const elementHeight = elementRect.height;
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
      


  function generateStars(svgId, numStars) {
    const svg = document.getElementById(svgId);
    const width = svg.viewBox.baseVal.width;
    const height = svg.viewBox.baseVal.height;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2.5 + 0.5; // Taille entre 0.5 et 3 px
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

  generateStars("starrySky", 100);

  // Ajout de l'animation en CSS
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes twinkle {
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);








  function generateClouds(svgId, numClouds) {
    const svg = document.getElementById(svgId);
    const width = svg.viewBox.baseVal.width;
    const height = svg.viewBox.baseVal.height;

    for (let i = 0; i < numClouds; i++) {
      const cloud = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const x = Math.random() * width;
      const y = Math.random() * height * 0.7; // Limite la hauteur des nuages
      const scale = Math.random() * 0.6 + 0.5; // Échelle entre 0.5 et 1.1
      const opacity = Math.random() * 0.4 + 0.6; // Opacité entre 0.6 et 1

      // Créer plusieurs cercles pour donner une forme de nuage
      for (let j = 0; j < 5; j++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const cx = x + Math.random() * 50; // Espacement des cercles
        const cy = y + Math.random() * 20; // Légère variation en hauteur
        const radius = Math.random() * 25 + 20; // Taille des cercles
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "rgba(255, 255, 255, " + opacity + ")"); // Blanc semi-transparent
        cloud.appendChild(circle);
      }

      cloud.setAttribute("transform", `scale(${scale})`);
      svg.appendChild(cloud);

      // Animation de déplacement
      cloud.style.animation = `moveClouds ${Math.random() * 20 + 10}s linear infinite alternate`;
    }
  }

  generateClouds("cloudySky", 5);

  // Ajout de l'animation CSS pour simuler un déplacement lent
  const styleCloud = document.createElement("style");
  styleCloud.innerHTML = `
    @keyframes moveClouds {
      0% { transform: translateX(0); }
      100% { transform: translateX(50px); }
    }
  `;
  document.head.appendChild(styleCloud);



  function updateTextColorOnCloudPass() {
    const title = document.querySelector('.mainTitle');
    const clouds = document.querySelectorAll('#cloudySky circle');
  
    // Crée un pseudo-élément dynamique pour chaque nuage qui passe derrière le texte
    let cloudEffectApplied = false; // On vérifie si l'effet a été appliqué
  
    clouds.forEach(cloud => {
      const cloudBounds = cloud.getBoundingClientRect();
      const titleBounds = title.getBoundingClientRect();
  
      // Si le nuage passe derrière le texte, on applique l'effet
      if (
        cloudBounds.top < titleBounds.bottom &&
        cloudBounds.bottom > titleBounds.top &&
        cloudBounds.left < titleBounds.right &&
        cloudBounds.right > titleBounds.left
      ) {
        if (!cloudEffectApplied) {
          // Appliquer le fond noir à la portion du texte
          title.style.color = 'black';  // Le texte devient noir
          title.classList.add('apply-cloud-background');
          cloudEffectApplied = true; // On évite d'ajouter plusieurs fois l'effet
        }
      } else {
        // Si le nuage n'est plus derrière, on réinitialise la couleur du texte
        title.style.color = 'white'; // Le texte revient en blanc
        title.classList.remove('apply-cloud-background');
      }
    });
  }
  
  // Ajout de l'événement pour le scroll et l'animation de la position
  window.addEventListener('scroll', updateTextColorOnCloudPass);
  
  // Exécuter dès le chargement pour ajuster immédiatement
  updateTextColorOnCloudPass();
  


