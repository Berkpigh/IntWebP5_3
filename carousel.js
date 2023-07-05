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

let imin = 0;
let imax = slides.length - 1;
let icur = 0;
let ipre = imax;

for (let j=0; j <= imax; j++) {
    let dot = document.createElement("i");
    if (j === ipre) {
        dot.classList.add("fa-regular", "fa-circle", "dot_selected");
    } else {
        dot.classList.add("fa-regular", "fa-circle", "dot");
    }
    dots.appendChild(dot);
}

function nextImageIndex(gd) {
    ipre = icur;
    icur += gd;
    if (icur > imax) {return imin};
    if (icur < imin) {return imax};
    return icur;
}

function nextImage() {
    showDot();
    bant.src = slides[icur].image;
    bant.alt = slides[icur].alt;

    banb.src = slides[ipre].image;
    banb.alt = slides[ipre].alt;
}

function showDot() {
    let alldots = document.querySelectorAll(".fa-circle");
    alldots[ipre].classList.remove("dot_selected");
    alldots[ipre].classList.add("dot");
    alldots[icur].classList.remove("dot");
    alldots[icur].classList.add("dot_selected");
}

arol.addEventListener("click", () => {
    icur = nextImageIndex(-1);
    nextImage();
});

aror.addEventListener("click", () => {
    icur = nextImageIndex(1);
    nextImage();
});

nextImage();
