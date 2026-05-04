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
const observer = new IntersectionObserver(entries => {
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
observer.observe(frase);