/* plugin */
gsap.registerPlugin(ScrollTrigger, SplitText);

/* ---------------------------- funzioni ------------------------------ */

//opzioni dell'observer
let options = {
  root: null,       // 'null' imposta la viewport come area di controllo
  rootMargin: '0px',
  threshold: 0.8    // La percentuale visibile dell'elemento
};

//funzione di callback che si attiva al cambio di stato
let callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      OnScreenAnimation(entry.target);
      observer.unobserve(entry.target); // Disosserva dopo l'animazione
    }
  });
};
let observer = new IntersectionObserver(callback, options);
ObserveEl();
ObserveContactSection();

function OnScreenAnimation(el) {      //funzione per l'animazione degli elementi in entrata
    let textSplitted = new SplitText(el, { type: "lines,chars" });
    let tl = gsap.timeline();

    tl.from(textSplitted.chars, {
        y: "100%",
        duration: 0.5,
        stagger: 0.01,
        ease: "expo.out",
        delay: 0.4,
    });
    tl.from(textSplitted.lines, {
      scale: .95,
      duration: .5,
      delay: .2,
    }, "intro-char")
    tl.to(textSplitted.lines, {
      scale: 1,
      delay: .4
    }, "intro-char")

}

function ObserveEl() {        //funzione per controllare gli elementi in entrata
  let testo = document.querySelectorAll('.anim-comparsa-testo');
  testo.forEach(element => {
    observer.observe(element);
  });
}

function ContactAnimation() {   //funzione per l'animazione della contact section
  let tl = gsap.timeline();

  tl.addLabel("intro-char")
  tl.fromTo("#contContactMeFrase .rowContact", {
    y: "100%"
  }, {
    y: "0%",
    duration: 0.8,
    stagger: 0.08,
    ease: "power4.out"
  });
  tl.from("#contContactMeFrase .rowContact", {
    scale: .95,
    duration: .5,
    delay: .2,
  }, "intro-char")
  tl.to("#contContactMeFrase .rowContact", {
    scale: 1,
    delay: .4
  }, "intro-char")
}

function ObserveContactSection() {
  const contactContainer = document.getElementById("contactSection");
  const contactObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ContactAnimation();
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: .8
  });

  gsap.set("#contContactMeFrase .rowContact", {
    y: "100%"
  });
  contactObserver.observe(contactContainer);
}

function HoverText(elem) {    //funzione hover text
  gsap.to(elem, {
    y: -8,
    ease: "power4.inOut",
    duration: .5,
  })
}
function LeaveText(elem) {    //funzione leave text
  gsap.to(elem, {
    y: 0,
    ease: "power4.inOut",
    duration: .5,
  })
}

let tl_menu;  //timeline per il menu
function apriMenu() {        //funzione per aprire il menu
  gsap.to("#contMenu", {
    y: "0%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {

      document.documentElement.style.overflowY = 'hidden';
      document.querySelectorAll('.voce').forEach(el => {
        el.style.display = "flex";
      })

      if (tl_menu) {
        tl_menu.kill();
      }

      gsap.set(".voce a", {
        y: "100%",
        scale: 1
      });

      // Triggerare manualmente le animazioni dei testi del menu
      tl_menu = gsap.timeline();
      tl_menu.addLabel("intro-char")
      tl_menu.fromTo(".voce a", {
        y: "100%"
      }, {
        y: "0%",
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out"
      });
      tl_menu.from(".voce a", {
        scale: .95,
        duration: .5,
        delay: .2,
      }, "intro-char")
      tl_menu.to(".voce a", {
        scale: 1,
        delay: .4
      }, "intro-char")
    }

  });
}
function chiudiMenu() {     // Funzione per chiudere il menu
  if (tl_menu) {
    tl_menu.reverse();
  }
  gsap.to("#contMenu", {
    y: "-100%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
      document.documentElement.style.overflowY = 'auto';
      document.querySelectorAll('.voce').forEach(el => {
        el.style.display = "none";
      })
      setTimeout(() => {
        ObserveEl();
      }, 100);
    },
    delay: .4
  });
}
// -------------------------- fine funzioni -------------------------- 


// ----------------------- animazioni testo - hover ------------------
document.querySelectorAll(".hoverTextEffect").forEach(element => {
  element.addEventListener("mouseenter", ()=>{
    HoverText(element)
  })
  element.addEventListener("mouseleave", ()=>{
    LeaveText(element)
  })
});


// -------------------------- menu -----------------------------------
const btnCloseMenu = document.getElementById("btnCloseMenu");
const btnOpenMenu = document.getElementById("btnOpenMenu");

btnOpenMenu.addEventListener("click", () => {   //apri menu
  apriMenu();
});
btnCloseMenu.addEventListener("click", () => {   //chiudi menu
  chiudiMenu();
});

//al click di un link - chiudi menu e scroll verticale = auto
let link = document.querySelectorAll('.voce a');
link.forEach(el => {
  el.addEventListener("click", ()=>{
    chiudiMenu();
    document.documentElement.style.overflowY = 'auto';
  });
});


// ---------------- Frase scrollante ---------------------------
const effetto = document.getElementById('contFrase');
const sezione = document.getElementById('fraseSection');

function getFraseDistance() {
  return Math.max(0, effetto.scrollWidth - sezione.clientWidth);
}

gsap.to(effetto, {
  x: () => -getFraseDistance(),
  ease: 'none',
  scrollTrigger: {
    trigger: sezione,
    scrub: 1,
    pin: true,
    start: "center center",
    end: () => `+=${Math.max(getFraseDistance(), window.innerHeight * 0.75)}`,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  }
});


// -------------------- work section's animation -----------------------------
const workCard = document.querySelectorAll('.cardWork');
const Worksection = document.getElementById("workSection");
const responsiveAnimations = gsap.matchMedia();

responsiveAnimations.add("(min-width: 701px)", () => {
  let Worktl = gsap.timeline({    //timeline animazione lavori - my works section
    scrollTrigger: {
      trigger: Worksection,
      scrub: 1,
      start: "top top",
      end: () => `+=${window.innerHeight * Math.max(workCard.length, 2)}`,
      pin: Worksection,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    }
  });

  workCard.forEach((card, i) => {    //animazione delle singole card
    Worktl.fromTo(card, {
      scale: i == 0 ? 1 : 1.1,
      y: `${i * 100}%`,
    }, {
      y: `${i * -100}%`,
      scale: 1,
    });
  });
});

responsiveAnimations.add("(max-width: 700px)", () => {
  gsap.set(workCard, { clearProps: "transform" });
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});