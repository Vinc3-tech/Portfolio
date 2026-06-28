// * -- PLUGIN --
gsap.registerPlugin(ScrollTrigger, SplitText);

// * -- FUNZIONI IMPORTATE --
import { HoverText, LeaveText, apriMenu, chiudiMenu } from "./function.js";

// ----------------------- animazioni testo - hover ------------------
document.querySelectorAll(".hoverTextEffect").forEach(element => {
  element.addEventListener("mouseenter", ()=>{
    HoverText(element);
  })
  element.addEventListener("mouseleave", ()=>{
    LeaveText();
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
const link = document.querySelectorAll('.voce a');
link.forEach(el => {
  el.addEventListener("click", () => {
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
      scrub: 1.5,
      start: "top top",
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