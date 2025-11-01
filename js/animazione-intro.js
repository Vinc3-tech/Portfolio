gsap.registerPlugin(ScrollToPlugin);    //registro i plugin

// Attende che il DOM sia caricato
document.addEventListener("DOMContentLoaded", () => {

    const bloccoSfondo = document.querySelector("#home"); //sfondo
    const titolo = document.querySelector('#saluto-intro');
    const tSecondario = document.querySelectorAll('#testo-secondario');

    let tl = gsap.timeline()
    
    // Imposta lo stato iniziale dello sfondo e dei testi
    gsap.set(bloccoSfondo, {
        autoAlpha: 0,
        scaleX: 0,
        scaleY: 0,
        transformOrigin: "center center"
    });
    gsap.set(titolo, {
        autoAlpha: 0,
    });
    gsap.set(tSecondario, {
        autoAlpha: 0,
    })

    //anima il testo
    tl.to(bloccoSfondo, { //anima lo sfondo
        autoAlpha: 1,
        scaleY: 0.1,
        duration: 0.8,
        ease: "power2.out",
    })
    .to(bloccoSfondo, {
        scaleX: 1,
        duration: 1,
        ease: "power4.out",
    })
    .to(bloccoSfondo, {
        scaleY: 1,
        duration: 0.8,
        ease: "power2.out",
    })
    .to(titolo, {   //anima il testo
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
    })
    .to(tSecondario, {
        autoAlpha: 1,
        duration: 1.5,
        delay: 0.3,
    })
    
});

/* --scroll nella pagina-- */
const aboutMeLink = document.querySelector('.aboutMeLink');
if (aboutMeLink) {
    aboutMeLink.addEventListener("click", (e) => {
        e.preventDefault();
        // Trova l'elemento target
        const targetSection = document.querySelector("#aboutMe");
            if (targetSection) {
                // Usa direttamente il selettore con ScrollToPlugin e un offset
                gsap.to(window, {
                    duration: 1.0,
                    scrollTo: { y: "#aboutMe", offsetY: 80 },
                    ease: "power3.inOut"
                });
            }
    });
}