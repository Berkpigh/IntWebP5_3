const rep = await fetch ("slides.json");
const slides = await rep.json();

/*console.log(slides.length);
for (let i = 0; i < slides.length; i++) {
    console.log(slides[i].image);
}*/
const arol = document.getElementById("arrowleft");
const aror = document.getElementById("arrowright");
const bant = document.querySelector(".banner-top");
const banb = document.querySelector(".banner-bot");
const dots = document.querySelector(".dots");
const tagl = document.getElementById("tagline");

let imin = 0;
let imax = slides.length - 1;
let icur = 0;
let ipre = imax;

// Calcul de l'index de l'image suivante : ajout de -1 pour flèche gauche
//                                         ajout de  1 pour flèche droite
function nextImageIndex(gd) {
    ipre = icur;
    icur += gd;
    if (icur > imax) {return imin};
    if (icur < imin) {return imax};
    return icur;
}
// affichage de l'image et de son texte
// affichage des points
function showImage() {
    showDot();
    bant.src = slides[icur].image;
    bant.alt = slides[icur].alt;

    banb.src = slides[ipre].image;
    banb.alt = slides[ipre].alt;
    tagl.innerHTML = slides[icur].tagLine;
}
// aficchage des points, celui en cours est sur fond blanc les autres noir
function showDot() {
    let alldots = document.querySelectorAll(".fa-circle");
    alldots[ipre].classList.remove("dot_selected");
    alldots[ipre].classList.add("dot");
    alldots[icur].classList.remove("dot");
    alldots[icur].classList.add("dot_selected");
}
// ajout des eventsListener sur les points
function dotEventListener(pdot) {
    pdot.addEventListener("click", (event) => {
        let dotcur = event.target;
        let alldots = document.querySelectorAll(".fa-circle");
        for (let k = 0; k <= imax; k++) {
            if (dotcur === alldots[k]) {
                ipre = icur;
                icur = k;
                k = imax + 1
            }
        }
        showImage();
    })
}
// écoute du click sur flèche gauche
arol.addEventListener("click", () => {
    icur = nextImageIndex(-1);
    showImage();
});
// écoute du click sur flèche droite
aror.addEventListener("click", () => {
    icur = nextImageIndex(1);
    showImage();
});
// création des points
for (let j=0; j <= imax; j++) {
    let dot = document.createElement("i");
    dotEventListener(dot);
    if (j === ipre) {
        dot.classList.add("fa-regular", "fa-circle", "dot_selected");
    } else {
        dot.classList.add("fa-regular", "fa-circle", "dot");
    }
    dots.appendChild(dot);
}
// Appel de la fonction principale d'affichage
showImage();
