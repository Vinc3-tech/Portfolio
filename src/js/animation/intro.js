/* animazioni al caricamento della pagina */

document.documentElement.style.overflowY = 'hidden';     //blocco scroll verticale

const tl = gsap.timeline();

// Animazione infinita del cerchio
tl.addLabel("intro-cerchio");
tl.to("#circle", {
    scale: 1,
    duration: 5,
    ease: "power1",
    repeat: -1,
    yoyo: true
});


// Animazione del testo di caricamento
tl.addLabel("intro-testo1");
tl.from("#loading-text", {
    x: "-100",
    opacity: 0.5,
    duration: 1,
    ease: "power2Out"
}, "intro-cerchio");

tl.addLabel("intro-testo2");
tl.from("#madeBy-text", {
    x: "100",
    opacity: 0.5,
    duration: 1,
    ease: "power2Out"
}, "intro-cerchio");


// Animazione percentuale di caricamento
tl.addLabel("percentuale");

const tempoPercentLines = 5     //tempo animazione linea e percentuale

let percent = { value: 0 };
tl.to(percent, {
    value: 100,
    duration: tempoPercentLines,
    onUpdate: () => {
        document.getElementById("percentuale-caricamento").textContent = Math.round(percent.value) + "%";
    },
    ease: "power3.inOut",
});

tl.addLabel("linee");
tl.to('.line-right, .line-left', {
    strokeDashoffset: 40,
    duration: tempoPercentLines,
    ease: "power3.inOut"
}, "percentuale");


// -- Fine animazione -- dissolvenza
tl.to(".loading-section", {
    y: "-100%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
        document.documentElement.style.overflowY = 'auto';
        // Hero page
        document.fonts.ready.then(() => {
            gsap.to('.word span', {
                y: "0%",
                duration: 0.8,
                stagger: 0.12,
                ease: "power4.inOut",
            });
        });
    }
});
tl.to(".loading-section", {
    autoAlpha: 0
})