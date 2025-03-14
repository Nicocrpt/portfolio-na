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

gsap.from('#title', {
  scale: 0.05,
  transformOrigin: "center center",
  scrollTrigger: {
    trigger: '#title',
    start: "center center",
    end: "160vh",
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    pin: true,
    force3D: false
  },
  duration: 20,
  ease: "power2.inOut",
  opacity: 1
});





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


let vtTl = gsap.timeline();

let cards = document.querySelectorAll('.fold'); 



vtTl.from('#veilleTitle', {
  scrollTrigger: {
        trigger: '#veilleTitle',
        start: "top 90%",
        end: "bottom 48%",
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        force3D: false
      },
      ease: "linear",
      opacity: 0
})
.to('#veilleTechno', {
  scrollTrigger: {
    trigger: '#veilleTechno',
    start: "top 0%",
    end: "160vh",
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    force3D: false,
  },
  onUpdate: function () {
    let color = `rgb(${255 * this.progress()}, ${255 * this.progress()}, ${255 * this.progress()})`;
    document.getElementById("veilleTitle").style.color = color;
  },
  onComplete: () => {
    let veilleTitle = document.querySelector('#veilleTitle');
    let titlePosition = veilleTitle.getBoundingClientRect().top;
    let ratio = (titlePosition/window.innerHeight) * 100; // Position relative au viewport



    gsap.to('.introWrapper', {
      opacity: 1, // Opacité 1 au fur et à mesure du scroll
      scrollTrigger: {
        trigger: '#veilleTitle',
        start: `top ${ratio}%`, // Démarre lorsque veilleTitle atteint cette position
        end: "bottom 5%",
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        force3D: false,
      },
      ease: "power2.inOut",
    });

    
    gsap.from('#rssLogo', {
      scrollTrigger: {
        trigger: '#veilleTitle',
        start: `top ${ratio}%`,
        end: "top 10%",
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        force3D: false,
      },
      scale: "10",
      ease: "power2.inOut",
    })
    gsap.to('#rssLogo', {
      scrollTrigger: {
        trigger: '#veilleTitle',
        start: `top ${ratio}%`,
        end: "top 10%",
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        force3D: false,
      },
      opacity: 1,
      scale: "1",
      ease: "power2.inOut",
    })
  },
  duration: 20,
  backgroundColor: '#000',
  ease: "power2.inOut",
  opacity: 1
})
.to('#feedlyIntro', {
  scrollTrigger: {
    trigger: '#feedlyIntro',
    start: `top+=${document.querySelector('#feedlyIntro').offsetHeight/2}px 50%`,
    end: `top+=${document.querySelector('#feedlyIntro').offsetHeight/2 + 500}px`, 
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    pin: true,
    pinSpacing: false,
    
    force3D: false,
  }
})
.to('#feedlyIntro', {
  scrollTrigger: {
    trigger: '.introWrapper',
    start: 'top',
    end: 'bottom',
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    force3D: false,
  },
  opacity: 0,
  ease: "power2.inOut",
  filter: "blur(4px)",
  scale: 10,
  onUpdate: function () {
    
  }
})
.to('#howItWorks', {
  scrollTrigger: {
    trigger: '#howItWorks',
    start: `top+=${document.querySelector('#feedlyIntro').offsetHeight}px 50%`,
    end: `top+=${document.querySelector('#feedlyIntro').offsetHeight}px`, 
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    markers: true,
    pin: true,
    force3D: false,
  }
})
.to('#lastvtContent', {
  scrollTrigger: {
    trigger: "#lastvtContent",
    start: `top+=${document.querySelector('#feedlyIntro').offsetHeight} 25%`,
    end: `bottom+`,
    toggleActions: 'restart pause reverse pause',
    scrub: true,
  },
  opacity: 1,
  filter: "blur(0px)",
})
.to('.feedlyBox .left', {
  scrollTrigger: {
    trigger: ".feedlyBox .left",
    start: `top+=1080px 60%`,
    end: `top+=1080px 50%`,
    toggleActions: 'restart pause reverse pause',
    scrub: true,
  },
  translateX: 0,
  opacity: 1
})
.to('.feedlyBox .right', {
  scrollTrigger: {
    trigger: ".feedlyBox .right",
    start: `top+=1080px 60%`,
    end: `top+=1080px 50%`,
    toggleActions: 'restart pause',
    scrub: true,
  },
  translateX: 0,
  opacity: 1,

})
.to('#feedlyTuto', {
  scrollTrigger: {
    trigger: "#feedlyTuto",
    start: `top+=980px 80%`,
    end: `top+=980px 70%`,
    toggleActions: 'restart pause reverse pause',
    scrub: true,
  },
  translateY: 0,
  opacity: 1
})
// .to('#howItWorks', {
//   scrollTrigger: {
//     trigger: "#split1",
//     start: "top-=100vh 30%",
//     toggleActions: 'restart pause reverse pause',
//     end: "bottom-=100vh 20%",
//     scrub: true,
//     markers: true,
//     pin: true,
//     pinSpacing: false,
//     pinSpacers: false,
//   },
//   translateX: -1400,
//   opacity: 0
// })
// .to('#orgaVt', {
//   scrollTrigger: {
//     trigger: "#orgaVt",
//     start: "top 29%",
//     toggleActions: 'restart pause reverse pause',
//     end:"220vh",
//     scrub: true,
//     pin: true,
//   }
// })
// .to("#orgaVt .intro", {
//   scrollTrigger: {
//     trigger: ".intro",
//     start: `top+=1080px 60%`,
//     end: `top+=1080px 50%`,
//     toggleActions: 'restart pause reverse pause',
//     scrub: true,
//   },
//   opacity: 1
// })
// .to('.fold1', {
//   scrollTrigger: {
//     trigger: ".fold1",
//     start: `top+=1080px 60%`,
//     end: `top+=1080px 50%`,
//     toggleActions: 'restart pause reverse pause',
//     scrub: true,
//   },
//   opacity: 1,
//   scale: 1
// })
// .to('.fold2', {
//   scrollTrigger: {
//     trigger: ".fold1",
//     start: "top 38%",
//     toggleActions: 'restart pause reverse pause',
//     end: "bottom-=80px 32%",
//     scrub: true,
//   },
//   opacity: 1,
//   scale: 1
// })
// .to('.fold3', {
//   scrollTrigger: {
//     trigger: ".fold1",
//     start: "top 36%",
//     toggleActions: 'restart pause reverse pause',
//     end: "bottom-=80px 30%",
//     scrub: true,
//   },
//   opacity: 1,
//   scale: 1
// })
// .to('.fold4', {
//   scrollTrigger: {
//     trigger: ".fold1",
//     start: "top 34%",
//     toggleActions: 'restart pause reverse pause',
//     end: "bottom-=80px 28%",
//     scrub: true,
//   },
//   opacity: 1,
//   scale: 1
// })
// // .to('#orgaVt', {  
// //   scrollTrigger: {
// //     trigger: "#split2",
// //     start: "top 45%",
// //     toggleActions: 'restart pause reverse pause',
// //     end:"bottom 30%",
// //     scrub: true,
// //     pin: true,
// //   },
// //   scale: "5",
// //   filter: "blur(10px)",
// //   opacity: 0
// // })
// .to('#vtTopic', {
//   scrollTrigger: {
//     trigger: "#vtTopic",
//     start: "top 50%",
//     toggleActions: 'restart pause reverse pause',
//     end:"top+=100px 35%",
//     scrub: true,  
//   },
//   opacity: 1,
//   scale: 1,
//   filter: "blur(0px)",
//   onComplete: () => {
//     document.getElementById('azureLeft').classList.remove('-translate-x-100', 'opacity-0')
//     document.getElementById('azureRight').classList.remove('translate-x-100', 'opacity-0');
//   }
// })



gsap.to('#sec2', {
  scrollTrigger: {
    trigger: '#veilleTitle',
    start: "top 90%",
    toggleActions: 'restart pause reverse pause',
    end: "bottom 56%",
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    force3D: false
  },
  ease: "power2.inOut",
  opacity: 0
})

var topicPartials = document.querySelectorAll('.topicPartial');

topicPartials.forEach((topicPartial) => {
  gsap.to(topicPartial,{
    scrollTrigger: {
      trigger: topicPartial,
      start: "top 90%",
      toggleActions: 'restart pause reverse pause',
      end: "top+=80px 80%",
    },
    opacity: 1,
    ease: "power2.inOut",
    filter: "blur(0px)",
  })
})

gsap.to('#veilleTitle', {
  scrollTrigger: {
    trigger: '#veilleTitle',
    start: "top+=20px 13%",
    toggleActions: 'restart pause reverse pause',
    end: "bottom+=1000vh 13%",
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    pin: true,
    force3D: false
  },
})

gsap.to('#rssLogo', {
  scrollTrigger: {
    trigger: '#rssLogo',
    start: "top+=20px 13%",
    toggleActions: 'restart pause reverse pause',
    end: "bottom+=1000vh 11%",
    toggleActions: 'restart pause reverse pause',
    scrub: true,
    pin: true,
    force3D: false
  },
})

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
  translateY: 800
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

      

