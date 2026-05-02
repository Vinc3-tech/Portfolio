gsap.registerPlugin(ScrollTrigger)
/* animazione scritta dopo la hero page */

gsap.to('.frase-section',{
    x: -2500,
    ease: 'linear',
    scrollTrigger: {
        trigger: '.frase-section',
        scrub: 1,
        pin: '.frase-section'
    }
})