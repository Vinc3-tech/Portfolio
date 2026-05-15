/* plugin registrati */
gsap.registerPlugin(ScrollTrigger, SplitText);

//funzione hover text
function HoverText(elem) {
  gsap.to(elem, {
    y: -8,
    ease: "power4.inOut",
    duration: .5,
  })
}
function LeaveText(elem) {
  gsap.to(elem, {
    y: 0,
    ease: "power4.inOut",
    duration: .5,
  })
}
document.querySelectorAll(".hover-text").forEach(element => {
  element.addEventListener("mouseenter", ()=>{
    HoverText(element)
  })
  element.addEventListener("mouseleave", ()=>{
    LeaveText(element)
  })
});

// -------------------------- menu -----------------------------------
const btnCloseMenu = document.getElementById("btn-close");
const btnOpenMenu = document.getElementById("menu");

//funzione per aprire il menu
function apriMenu() {
  gsap.to(".menu", {
    y: "0%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
      document.documentElement.style.overflow = 'hidden';
      document.querySelectorAll('.voce').forEach(el => {
        el.style.display = "flex";
      })
      ObserveEl();
    }
  });
}
// Funzione per chiudere il menu
function chiudiMenu() {
  gsap.to(".menu", {
    y: "-100%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
      document.documentElement.style.overflow = 'auto';
      document.querySelectorAll('.voce').forEach(el => {
        el.style.display = "none";
      })
      ObserveEl();
    }
  });
}

btnOpenMenu.addEventListener("click", () => {   //apri menu
  apriMenu();
});
btnCloseMenu.addEventListener("click", () => {   //chiudi menu
  chiudiMenu();
});

//al click di un link - chiudi menu e overflow = auto
let link = document.querySelectorAll('.voce a');
link.forEach(el => {
  el.addEventListener("click", ()=>{
    chiudiMenu();
    document.documentElement.style.overflow = 'auto';
  });
});


/*-----------------animazioni testo in entrata--------------------*/
//funzione x comparsa scritte a schermo
function OnScreenAnimation(el) {

  const textSplitted = new SplitText(el, { type: "lines,chars" })
  let tl = gsap.timeline();

  tl.addLabel("intro-char")
  tl.from(textSplitted.chars, {
    y: "80%",
    duration: 0.5,
    stagger: .01,
    ease: "expo.out",
    delay: .4,
  })
  tl.from(textSplitted.lines, {
    scale: .95,
    duration: .5,
    delay: .2,
  }, "#intro-char")
  tl.to(textSplitted.lines, {
    scale: 1,
    delay: .4
  }, "#intro-char")
  
}
//funzione per controllare gli elementi in entrata
function ObserveEl() {
  let testo = document.querySelectorAll('.anim-comparsa-testo');
  testo.forEach(element => {
    observer.observe(element);
  });
}

//opzioni dell'observer
let options = {
  root: null,       // 'null' imposta lo schermo/viewport come area di controllo
  rootMargin: '0px',
  threshold: 0.5    // La percentuale visibile dell'elemento (0.5 = 50%)
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

// Frase scrollante
const frase = document.querySelector('#riga1 span');
const effetto = document.querySelector('.frase-effetto');
const sezione = document.querySelector('.frase-section');
const distanza = effetto.offsetWidth - sezione.offsetWidth;

gsap.to('.frase-effetto', {
    x: -distanza,
    ease: 'linear',
    scrollTrigger: {
        trigger: '.frase-section',
        scrub: 1,
        pin: true
    }
});