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

function OnScreenAnimation(el) {      //funzione per l'animazione degli elementi in entrata
    const textSplitted = new SplitText(el, { type: "lines,chars" });
    let tl = gsap.timeline();

    tl.from(textSplitted.chars, {
        y: "80%",
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

const tl_menu = gsap.timeline();  //creazione della timeline per il menu
function apriMenu() {        //funzione per aprire il menu
  gsap.to(".menu", {
    y: "0%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {

      document.documentElement.style.overflow = 'hidden';
      document.querySelectorAll('.voce').forEach(el => {
        el.style.display = "flex";
      })

      // Triggerare manualmente le animazioni dei testi del menu
      tl_menu.addLabel("intro-char")
      tl_menu.fromTo(".voce a", {
        y: "80%"
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
  tl_menu.reverse();
  gsap.to(".menu", {
    y: "-100%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
      document.documentElement.style.overflow = 'auto';
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


// ---------------- Frase scrollante ---------------------------
const effetto = document.querySelector('.frase-effetto');
const sezione = document.querySelector('.frase-section');
const distanza = effetto.offsetWidth - sezione.offsetWidth;

gsap.to(effetto, {
    x: -distanza,
    ease: 'linear',
    scrollTrigger: {
        trigger: '.frase-section',
        scrub: 1,
        pin: true,
        start: "center center"
    }
});


// -------------------- work section's animation -----------------------------
const workCard = document.querySelectorAll('.card-work');
const Worksection = document.getElementById("work-section")

let Worktl = gsap.timeline({    //timeline animazione lavori - my works section
  scrollTrigger: {
    trigger: Worksection,
    scrub: 1,
    start: "top top",
    end: "+=2000",
    pin: Worksection,
  }
})

let i = 0;
workCard.forEach(card => {    //animazione delle singole card
  Worktl.fromTo(card, {
    scale: i==0 ? 1 : 1.1,
    y: `${i * 100}%`,
  }, {
    y: `${i * -100}%`,
    scale: 1,
  });
  i++;
});
