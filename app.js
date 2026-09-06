/* =========================================================
   MERAAS PMD MONTHLY EXECUTIVE REPORT
   Main Application JavaScript
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    startCounters();

    animateProgressBars();

    startScrollAnimations();

    startNavigation();

    startProjectInteractions();

});


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

function startCounters() {

    const counters =
        document.querySelectorAll("[data-counter]");


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.counter);


        const duration = 1500;

        let start = 0;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
                Smooth cubic easing
            */

            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    eased * target
                );


            counter.textContent =
                value.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(update);

    });

}


/* =========================================================
   PROGRESS BAR ANIMATION
========================================================= */

function animateProgressBars() {

    const bars =
        document.querySelectorAll(
            ".progress-fill"
        );


    bars.forEach((bar, index) => {

        const value =
            Number(
                bar.dataset.progress || 0
            );


        bar.style.width = "0%";


        setTimeout(() => {

            bar.style.width =
                `${value}%`;

        }, 350 + (index * 120));

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function startScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".section .card"
        );


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0) scale(1)";


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elements.forEach((element, index) => {

        /*
            Don't hide cards immediately if
            they are already visible.
        */

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";


        element.style.transition =
            `opacity 0.7s ease ${index * 0.03}s,
             transform 0.7s ease ${index * 0.03}s,
             box-shadow 0.3s ease,
             border-color 0.3s ease`;


        observer.observe(element);

    });

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function startNavigation() {

    const links =
        document.querySelectorAll(
            ".nav a"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {

                    return;

                }


                event.preventDefault();


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                const header =
                    document.querySelector(
                        ".header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    20;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });

}


/* =========================================================
   PROJECT CARD INTERACTION
========================================================= */

function startProjectInteractions() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                /*
                    Disable 3D movement on
                    small screens.
                */

                if (
                    window.innerWidth <= 750
                ) {

                    return;

                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        (y / rect.height)
                        - 0.5
                    ) * -3;


                const rotateY =
                    (
                        (x / rect.width)
                        - 0.5
                    ) * 3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    });

}


/* =========================================================
   REPORT DATE
========================================================= */

function setReportDate() {

    const dateElement =
        document.getElementById(
            "reportDate"
        );


    if (!dateElement) {

        return;

    }


    const now =
        new Date();


    dateElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function startActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    if (!sections.length) {

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const id =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },

            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }

        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

        startActiveNavigation();

    }
);
