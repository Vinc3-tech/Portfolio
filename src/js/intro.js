// animazioni al caricamento della pagina
const tl = gsap.timeline(); //timeline animazione

const DURATION_TOT_ANIMATION = 3;
const DURATION_TEXT_ANIMATION = 1;
const TRANSLATEX_TEXT_VALUE = 100;

// Animazione infinita del cerchio
tl.add("intro-cerchio");
tl.to("#circle", {
    scale: 1.2,
    duration: DURATION_TOT_ANIMATION - .5,
    ease: "power1",
    repeat: -1,
    yoyo: true
});

// Animazione dei testi di caricamento
tl.add("intro-testo1");
tl.from("#loadingWord", {
    x: -TRANSLATEX_TEXT_VALUE,
    opacity: .5,
    duration: DURATION_TEXT_ANIMATION,
    ease: "power2.out"
}, "intro-cerchio");

tl.add("intro-testo2");
tl.from("#madeByWord", {
    x: TRANSLATEX_TEXT_VALUE,
    opacity: .5,
    duration: DURATION_TEXT_ANIMATION,
    ease: "power2.out"
}, "intro-cerchio");

//animazione caricamento percentuale
let percent = { value: 0 };
tl.to(percent, {
    value: 100,
    duration: DURATION_TOT_ANIMATION,
    onUpdate: () => {
        document.getElementById("percentLoading").textContent = Math.round(percent.value) + "%";
    },
    ease: "power3.inOut",
});

// ------------------------- Fine animazione ----------------------
const LoadingSection = document.getElementById("loadingSection");
const DURATION_OUT_ANIMATION = 1.5;

tl.add("translateSection");
tl.to(LoadingSection, {
    y: "-100%",
    duration: DURATION_OUT_ANIMATION,
    ease: "power4.inOut",
    onComplete: () => {
        document.documentElement.style.overflowY = 'auto';
    }
});
tl.add("fadingSection");
tl.to(LoadingSection, {
    autoAlpha: 0
});

// scritta hero page
tl.fromTo('.word span', {
    y: "100%"
},{
    y: "0%",
    duration: DURATION_TEXT_ANIMATION,
    stagger: 0.12,
    ease: "power4.inOut",
    delay: .4
}, "translateSection");