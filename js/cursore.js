// Attende che il DOM sia pronto e poi inizializza il cursore personalizzato.
document.addEventListener('DOMContentLoaded', () => {

    //elementi a cui va applicato il mouse hover
    const elementi = document.querySelectorAll('a');
    //cursori
    const cursore = document.querySelector('.cursor-standard');

    if (!cursore) return; // elemento inesistente

    cursore.style.transform = 'translate(-50%, -50%)';

    document.addEventListener('mousemove', function(e) {
        // coordinate mouse
        let x = e.clientX;
        let y = e.clientY;

        cursore.style.left = `${x}px`;
        cursore.style.top = `${y}px`;
    });

    elementi.forEach(el => {
        el.addEventListener('mouseenter', function(e){
            cursore.style.transform = 'scale(2) translate(-25%, -25%)';
            cursore.style.transition = 'all .3s cubic-bezier(0.215, 0.610, 0.355, 1)';
        });
        el.addEventListener('mouseleave', function(e){
            cursore.style.transform = 'scale(1) translate(-50%, -50%)';
            cursore.style.transition = 'all .3s cubic-bezier(0.215, 0.610, 0.355, 1)';
        });
    });
});