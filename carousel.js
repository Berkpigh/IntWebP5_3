const rep = await fetch ("slides.json");
const slides = await rep.json();

console.log(slides.length);
for (let i = 0; i < slides.length; i++) {
    console.log(slides[i].image);
}
const arol = document.getElementById("arrowleft");
const aror = document.getElementById("arrowright");
const bant = document.querySelector(".banner-top");
const banb = document.querySelector(".banner-bot");

let imin = 0;
let imax = slides.length - 1;
let icur = 0;
let ipre = 0;

function nextImageIndex(gd) {
    ipre = icur;
    icur += gd;
    if (icur > imax) {return imin};
    if (icur < imin) {return imax};
    return icur;
}

function nextImage() {
    bant.src = slides[icur].image;
    bant.alt = slides[icur].alt;

    banb.src = slides[ipre].image;
    banb.alt = slides[ipre].alt;
}

arol.addEventListener("click", () => {
    icur = nextImageIndex(-1);
    nextImage();
});

aror.addEventListener("click", () => {
    icur = nextImageIndex(1);
    nextImage();
});