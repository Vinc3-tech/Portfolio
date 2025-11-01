//seleziona le annate
const annate = document.querySelectorAll('.annata');

if (annate) {
    //assegno le righe e colonne alle annate
    annate.forEach((element, i) => {
        if (element) {
            element.style.gridColumn = (i % 2 === 0) ? 2 : 1; //se l'indice è pari allora la colonna è la seconda, altrimnti è la prima
            element.style.textAlign = (i % 2 === 0) ? "left" : "right";
            if (i%2 === 0) {
                element.style.setProperty('--pseudo-positionX', '0%');
                element.style.setProperty('--pseudo-translateX', '-150%');
            } else {
                element.style.setProperty('--pseudo-positionX', '100%');
                element.style.setProperty('--pseudo-translateX', '50%');
            }
            element.style.gridRow = i+1;    //incrementa la riga ogni elemento
        }
    });
}

//assegno i font
document.querySelectorAll('.titAnno').forEach(element =>{
    element.classList.add('inter');
    element.style.fontWeight = "600";
});
document.querySelectorAll('.descAnno').forEach(element =>{
    element.classList.add('geist');
});