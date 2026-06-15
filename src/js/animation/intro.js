//


// animazioni al caricamento della pagina
const tl = gsap.timeline(); //timeline animazione
const tempoAnimazioneTotale = 3
const tempoAnimazioneScritte = 1

// Animazione infinita del cerchio
tl.addLabel("intro-cerchio");
tl.to("#circle", {
    scale: 1,
    duration: tempoAnimazioneTotale,
    ease: "power1",
    repeat: -1,
    yoyo: true
});

// Animazione dei testi di caricamento
tl.addLabel("intro-testo1");
tl.from("#loadingWord", {
    x: "-100",
    opacity: 0.5,
    duration: tempoAnimazioneScritte,
    ease: "power2Out"
}, "intro-cerchio");

tl.addLabel("intro-testo2");
tl.from("#madeByWord", {
    x: "100",
    opacity: 0.5,
    duration: tempoAnimazioneScritte,
    ease: "power2Out"
}, "intro-cerchio");

//animazione caricamento percentuale
let percent = { value: 0 };
tl.to(percent, {
    value: 100,
    duration: tempoAnimazioneTotale,
    onUpdate: () => {
        document.getElementById("percentLoading").textContent = Math.round(percent.value) + "%";
    },
    ease: "power3.inOut",
});

// ------------------------- Fine animazione ----------------------
tl.to("#loadingSection", {
    y: "-100%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
        document.documentElement.style.overflowY = 'auto';
        // Hero page
        document.fonts.ready.then(() => {
            gsap.fromTo('.word span', {
                y: "100%"
            },{
                y: "0%",
                duration: 0.8,
                stagger: 0.12,
                ease: "power4.inOut",
            });
        });
    }
});
tl.to(".loadingSection", {
    autoAlpha: 0
})