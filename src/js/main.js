console.log(document.querySelectorAll('.word span'));

/* plugin registrati */
gsap.registerPlugin(ScrollTrigger, SplitText);

// Hero page
//let split = new SplitText('#impact-text', { type: "words" });
document.fonts.ready.then(() => {
    gsap.from('.word span', {
        y: "100%",
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.inOut",
        delay: .5
    });
});

// menu
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

//--------------------da risolvere------------------------------
/*const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.fromTo(entry, {
        autoAlpha: .5,
      }, {
        autoAlpha: 1,
        delay: .5
      })
    }
  });
});
observer.observe(frase);*/