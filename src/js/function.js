// * -- registarzione plugin -- 
gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
    ObserveEl();
    ObserveContactSection();
})

// * ---------------------------- funzioni ------------------------------

// * -- funzione per controllare gli elementi in entrata --
function ObserveEl() {
    let testo = document.querySelectorAll('.anim-comparsa-testo');
    testo.forEach(element => {
        ElObserver.observe(element);
    });
}

const ElObserver = new IntersectionObserver((entries, observer) => {    //observer per tutti gli el con classe '.anim-comparsa-testo'
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        OnScreenAnimation(entry.target);
        observer.unobserve(entry.target);
        }
    });
}, {
    root: null,   // 'null' imposta la viewport come area di controllo
    rootMargin: '0px',
    threshold: .8 // 'threshold' dice dopo quanto l'elemento deve essere visibile per far far partire l'animazione (.8 => 80%)
});

function OnScreenAnimation(el) {      //funzione per l'animazione degli elementi in entrata

    const DURATION_TOT_ANIMATION = .5;

    let textSplitted = new SplitText(el, { type: "lines,chars" });
    let tl = gsap.timeline();

    tl.add("intro-char")
    tl.from(textSplitted.chars, {
        y: "100%",
        duration: DURATION_TOT_ANIMATION,
        stagger: 0.01,
        ease: "expo.out",
    });

    tl.fromTo(textSplitted.lines, {
        scale: .8,
    }, {
        scale: 1,
        duration: DURATION_TOT_ANIMATION,
        delay: .3
    }, 0);

}

// * -- funzione con observer per la contact section --
function ObserveContactSection() {

    const contactContainer = document.getElementById("contactSection");
    const RowContact = document.querySelectorAll(".rowContact");

    const contactObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            ContactAnimation(RowContact);
            observer.unobserve(entry.target);
        }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: .8
    });

    gsap.set(RowContact, {
        y: "100%"
    });
    contactObserver.observe(contactContainer);

}

// * -- funzione per l'animazione della contact section --
function ContactAnimation(RowContact) {

    const DURATION_TOT_ROWCONTACT = .5;
    const STAGGER_ROWCONTACT = .08;
    let tl = gsap.timeline();

    tl.add("intro-char")
    tl.fromTo(RowContact, {
        y: "100%"
    }, {
        y: "0%",
        duration: DURATION_TOT_ROWCONTACT + .3,
        stagger: STAGGER_ROWCONTACT,
        ease: "power4.out"
    });
    tl.fromTo(RowContact, {
        scale: .95,
    }, {
        scale: 1,
        delay: .4,
        duration: DURATION_TOT_ROWCONTACT,
    }, "intro-char")
}


let TextAnimation;
//funzione hover text
export function HoverText(elem) {

    const TRANSLATE_VALUE = -8;
    const DURATION_TEXT_ANIMATION = .5;

    TextAnimation = gsap.to(elem, {
        y: TRANSLATE_VALUE,
        ease: "power2.out",
        duration: DURATION_TEXT_ANIMATION,
    })
}
//funzione leave text
export function LeaveText() {
    TextAnimation.reverse();
}


let tl_menu;        //timeline generale per il menu
let tl_char_menu;   //timeline per i caratteri del menu

export function apriMenu() {        //funzione per aprire il menu
    tl_menu = gsap.to("#contMenu", {
        y: "0%",
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {

            document.documentElement.style.overflowY = 'hidden';
            document.querySelectorAll('.voce').forEach(el => {
                el.style.display = "flex";
            })

            // Triggerare manualmente le animazioni dei testi del menu
            tl_char_menu = gsap.timeline();

            tl_char_menu.add("intro-char");
            tl_char_menu.fromTo(".voce a", {
                y: "100%"
            }, {
                y: "0%",
                duration: 0.8,
                stagger: 0.08,
                ease: "power4.out"
            });

            tl_char_menu.fromTo(".voce a", {
                scale: .95,
                delay: .2,
            }, {
                scale: 1,
                delay: .4,
                duration: .5,
            }, "intro-char");

        }

    });
}

export function chiudiMenu() {     // Funzione per chiudere il menu

    const DELAY_ANIMATION = .3 * 1000; //delay in milliseconds
    
    if (tl_menu && tl_char_menu) {
        tl_char_menu.reverse();
        setTimeout(() => {
            tl_menu.reverse();
        }, DELAY_ANIMATION);
    }
}
// -------------------------- fine funzioni -------------------------- 