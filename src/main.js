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


window.onload = function() {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector('body').classList.remove('overflow-hidden')
  }, 0)
  
}


window.addEventListener('beforeunload', function () {
  sessionStorage.setItem('scrollPosition', window.scrollY);
});
window.addEventListener('load', function () {
  const savedScrollPosition = sessionStorage.getItem('scrollPosition');
  console.log(this.sessionStorage.getItem('scrollPosition'))
  
  // if (savedScrollPosition !== null) {
    // Remonter tout en haut temporairement
    window.scrollTo(0, 0);

    // Restaurer la position du scroll après 100ms (pour éviter les "flickers")
  //   setTimeout(function () {
  //     window.scrollTo(0, savedScrollPosition);
  //   }, 100);
  // }
});

window.onbeforeunload = function() {
  sessionStorage.setItem('scrollPosition', window.scrollY);
  // Défilement vers le haut de la page
  window.scrollTo(0, 0);
  window.scrollTo(0, sessionStorage.getItem('scrollPosition'))
};



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

gsap.to('.homeBackground', {
  scrollTrigger: {
    trigger: '.homeBackground',
    start: "bottom 100%",
    end:`bottom`,
    scrub: true,
    pin: true,
    pinSpacing: false
  }
})
gsap.to('.homeBackground', {
  scrollTrigger: {
    trigger: '.homeBackground',
    start: `top+=${document.querySelector('.homeBackground').offsetHeight/4}px ${document.querySelector('.homeBackground').offsetHeight/4} `,
    end:`bottom+=${document.querySelector('#homeSection').offsetHeight/4}px`,
    scrub: true
  },
  y: document.querySelector('.homeBackground').offsetHeight - document.querySelector('#homeSection').offsetHeight,
  ease: "linear"
})
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


homeTl.to('.mainTitle', {y: 2000, duration: 10, ease: "power2.inOut"})
.to('.moon', {
  motionPath: {
    path: [
      { x: 0, y: 0,  },
      
      { x: `${window.innerWidth/2+document.querySelector('.moon').offsetWidth}px`, y: `-${window.innerHeight - document.querySelector('.moon').offsetHeight*1.5}px` }, // Point culminant (centre haut)
      { x: `${window.innerWidth + document.querySelector('.moon').offsetWidth}px`, y: 0 },
       // Point de départ (en bas à gauche)
      // Point final (en bas à droite)
    ], // L'intensité de l'arc
    autoRotate: true,
    curviness: 2,
  },
  duration: 8, // Temps total pour l'animation (scrub prend en charge la vitesse liée au scroll)
}, "-=10");





gsap.to('.navBar', {
  scrollTrigger: {
    trigger: '.cloudLayer3',
    scrub: true,
    start: `top+=${document.querySelector('#homeSection').offsetHeight/4}px ${document.querySelector('.navBar').offsetHeight}px`,
    end: `top+=${(document.querySelector('#homeSection').offsetHeight/4) + (document.querySelector('.cloudLayer1').getBoundingClientRect().top - document.querySelector('.cloudLayer3').getBoundingClientRect().top)}px ${document.querySelector('.navBar').offsetHeight}px`
  },
  backgroundColor: "black",
  ease: "power2.inOut",
  backdropFilter: "blur(10px)",
})

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.skillsTitle',
    start: "top 50%",
    scrub: 0.5,

  }
})

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
function updateHeights() {
  document.querySelectorAll('.allInfos').forEach(container => {
    const infos = container.querySelector('.infos');
    const moreInfos = container.querySelector('.moreInfos');
    
    if (container.style.maxHeight !== `${infos.offsetHeight}px`) {
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

document.addEventListener("DOMContentLoaded", function() {
  const textBoxes = document.querySelectorAll('.text-box');
  
  textBoxes.forEach(function(element) {
    element.addEventListener('click', function() {
      toggleInfo(element); // Appelle la fonction toggleInfo avec l'élément cliqué
    });
  });
  window.addEventListener('resize', updateHeights);
});




// SECTION COMPETENCES

gsap.to('.skillsSecTitle h1', {
  scrollTrigger: {
    trigger: '.skillsSecTitle h1',
    start: "top 80%",
    end: "bottom 80%",
    scrub: true,
    force3D: false
  },
  opacity: 1
})
gsap.to('.skillsSecTitle p', {
  scrollTrigger: {
    trigger: '.skillsSecTitle h1',
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

gsap.to('.gradientBackground', {
  scrollTrigger: {
    trigger: '.presentationSection',
    start: "top",
    end: "bottom 100%",
    scrub: true,
    force3D: false
  },
    opacity:1,
  ease : "power3.in"
})

gsap.to('.clouds', {
  scrollTrigger: {
    trigger: '.presentationSection',
    start: "top",
    markers: true,
    end: "bottom 90%",
    scrub: 1,
    force3D: false
  },
  opacity:0.8,
  ease : "power3.in"
})


let skillsCounter = 0
gsap.to('.timeline', {
  scrollTrigger: {
    trigger: '.skillsSecTitle',
    onUpdate: self => {
      console.log(getVisiblePercentage(document.querySelector('.timeline')))
      if (getVisiblePercentage(document.querySelector('.timeline')) < 60 && skillsCounter === 0) {
        skillsCounter = 1
        gsap.to('.timeline', {
          scrollTrigger: {
            trigger: '.skillsSecTitle',
            start: `top ${document.querySelector('.skillsSecTitle').getBoundingClientRect().top}px`,
            end: `top ${document.querySelector('.skillsSecTitle').getBoundingClientRect().top/1.5}px`,
            scrub: true,
            force3D: false
          },
          opacity: 0
        })
      }
    }
  }
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

  generateStars("starrySky", 100);
  generateStars("starrySky", 200, [0.6, 0.2]);

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
    const svg = document.querySelector(svgId);
    const width = svg.viewBox.baseVal.width;
    const height = svg.viewBox.baseVal.height;

    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElementNS("http://www.w3.org/2000/svg", "g");
        cloud.classList.add('blur-[0.8px]')
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
            const grayShade = Math.random() * 50 + 205; // Nuance de gris plus réaliste

            // Appliquer une couleur de remplissage avec des nuances de gris
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", `rgb(${grayShade}, ${grayShade}, ${grayShade})`);
            circle.setAttribute("fill-opacity", circleOpacity);
            cloud.appendChild(circle);
        }

        cloud.setAttribute("transform", `scale(${scale})`);
        svg.appendChild(cloud);

        // Animation de déplacement avec plus de réalisme
        const animationDuration = Math.random() * 30 + 30; // Durée de l'animation entre 15s et 30s
        const direction = Math.random() < 0.5 ? 1 : -1; // Direction aléatoire (gauche ou droite)
        const distance = Math.random() * 100 + 50; // Déplacement plus important pour plus de réalisme

        // Ajouter une légère variation de vitesse
        cloud.style.animation = `moveClouds ${animationDuration}s linear infinite alternate`;

        // Ajouter une propriété CSS pour la distance
        cloud.style.setProperty('--distance', `${distance * direction}px`);
    }
}

generateClouds("#cloudySky", 5);

const styleCloud = document.createElement("style");
styleCloud.innerHTML = `
    @keyframes moveClouds {
        0% { transform: translateX(0); }
        100% { transform: translateX(var(--distance)); }
    }
`;
document.head.appendChild(styleCloud);



  


  


  function scrollToElement(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'  // Place l'élément en haut de la fenêtre
    });
}


// etoiles filantes

document.addEventListener('DOMContentLoaded', () => {
  const shootingStarsContainer = document.querySelector('.shooting-stars');

  // Fonction pour générer une étoile filante avec une traînée et un angle
  function createShootingStar(angle = -45) { // L'angle par défaut est -45° (diagonale descendante)
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

  // Créer des étoiles filantes toutes les 3 à 6 secondes
  setInterval(() => {
    let angle = 30
    createShootingStar(angle);  // Passer l'angle à la fonction
  }, Math.random() * 3000 + 3000);
});


 

// Test lignes de code

document.addEventListener("DOMContentLoaded", function () {
  const lineContainer = document.querySelector(".line-container");

  const lineInterval = 1500; // Intervalle pour créer de nouvelles lignes en millisecondes

  // Fonction pour générer une ligne aléatoire
  function createLine() {
    const line = document.createElement("div");
    line.classList.add("line");
    line.classList.add('rounded-full', 'backdrop-blur-md')

    // Hauteur entre 5px et 12px
    line.style.height = `${Math.floor(Math.random() * 8) + 5}px`;

    // Largeur aléatoire entre 50% et 150% de la largeur de la page
    const lineWidth = Math.floor(Math.random() * 20) + 50; // entre 50% et 150%
    line.style.width = `${lineWidth}%`;

    // Position verticale aléatoire
    line.style.top = `${Math.floor(Math.random() * 100)}%`;

    // Couleur aléatoire
    line.style.backgroundColor = getRandomColor();

    // Calcul de la position de départ : hors de l'écran
    const direction = Math.random() > 0.5 ? "left" : "right"; // Direction aléatoire (gauche ou droite)
    const screenWidth = window.innerWidth; // Largeur de la fenêtre du navigateur
    const lineLength = (lineWidth / 100) * screenWidth; // Longueur de la ligne en pixels

    // Si la direction est à gauche
    const startPosition = direction === "left" ? -lineLength : screenWidth; // Position de départ (gauche ou droite)
    
    // Calcul de la position de fin : la ligne doit sortir complètement de l'écran à gauche
    const endPosition = direction === "left" ? screenWidth : -lineLength; // Sortie du côté opposé

    // Définir la position de départ et de fin dans les variables CSS personnalisées
    line.style.setProperty("--start-position", `${startPosition}px`);
    line.style.setProperty("--end-position", `${endPosition}px`);

    // Ajouter la ligne au conteneur
    lineContainer.appendChild(line);

    // Durée de l'animation aléatoire entre 3s et 7s
    const duration = Math.floor(Math.random() * 10) + 5; // Durée de l'animation en secondes
    line.style.setProperty("--animation-duration", `${duration}s`);

    // Supprimer la ligne après l'animation
    setTimeout(() => {
      line.remove();
    }, duration * 1000);
  }

  // Fonction pour générer une couleur aléatoire
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Générer des lignes à intervalles réguliers
  setInterval(createLine, lineInterval);
});






