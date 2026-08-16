/* =========================
   ELEMENTEN
   ========================= */

const animation = document.getElementById("onboardingAnimation");

const nextBtn = document.getElementById("nextBtn");

const screenCopies = document.querySelectorAll(".screen-copy");

const progressDots = document.querySelectorAll(".progress span");


/* =========================
   INSTELLINGEN
   ========================= */

let currentScreen = 1;

const totalScreens = 6;


/* =========================
   EERSTE ANIMATIE
   ========================= */

animation.addEventListener("ready", () => {

    animation.play();

});


/* =========================
   SCHERM WISSELEN
   ========================= */

function changeScreen(screenNumber) {


    /* =========================
       LOTTIE STOPPEN
       ========================= */

    animation.stop();


    /* =========================
       NIEUWE JSON LADEN
       ========================= */

    animation.load(
        `./assets/scherm${screenNumber}.json`
    );


    /* =========================
       NIEUWE ANIMATIE STARTEN
       ========================= */

    animation.addEventListener(
        "ready",
        () => {

            if (screenNumber === totalScreens) {

                animation.pause();

            } else {

                animation.play();

            }

        },
        {
            once: true
        }
    );

    /* =========================
       SCHERM 6: ANIMATIE PAUZEREN
       ========================= */

    if (screenNumber === totalScreens) {

        animation.addEventListener(
            "complete",
            () => {

                animation.pause();

            },
            {
                once: true
            }
        );

    }


    /* =========================
       TEKST WISSELEN
       ========================= */

    screenCopies.forEach((screen) => {

        const screenNumberFromHTML =
            Number(screen.dataset.screen);

        if (screenNumberFromHTML === screenNumber) {

            screen.classList.add("active");

        } else {

            screen.classList.remove("active");

        }

    });


    /* =========================
       PROGRESS BIJWERKEN
       ========================= */

    progressDots.forEach((dot, index) => {

        if (index === screenNumber - 1) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    });


    /* =========================
       KNOP AANPASSEN
       ========================= */

    if (screenNumber === totalScreens) {

        nextBtn.textContent = "✓";

        nextBtn.setAttribute(
            "aria-label",
            "Onboarding voltooien"
        );

    } else {

        nextBtn.textContent = "→";

        nextBtn.setAttribute(
            "aria-label",
            "Volgend scherm"
        );

    }

}


/* =========================
   CLICK INTERACTIE
   ========================= */

nextBtn.addEventListener("click", () => {

    if (currentScreen < totalScreens) {

        currentScreen++;

        changeScreen(currentScreen);

    } else {

        console.log("Onboarding voltooid!");

    }

});