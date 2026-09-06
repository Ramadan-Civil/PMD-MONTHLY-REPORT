/* =========================================================
   MERAAS PMD EXECUTIVE REPORT
   INTERACTIONS & ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setReportDate();

    startCounters();

    animateBars();

    startScrollAnimations();

    startNavigation();

    startProjectInteractions();

});


/* =========================================================
   REPORT DATE
========================================================= */

function setReportDate() {

    const element =
        document.getElementById("reportDate");

    if (!element) return;

    const date = new Date();

    const month =
        date.toLocaleString(
            "en-US",
            {
                month: "long"
            }
        );

    const year =
        date.getFullYear();

    element.textContent =
        `${month} ${year}`;

}


/* =========================================================
   COUNTERS
========================================================= */

function startCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.counter
            );

        let start = 0;

        const duration = 1400;

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


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    start +
                    (target - start) *
                    eased
                );


            counter.textContent =
                value;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(update);

    });

}


/* =========================================================
   BAR ANIMATION
========================================================= */

function animateBars() {

    const bars =
        document.querySelectorAll(
            ".bar-fill"
        );


    bars.forEach(bar => {

        const width =
            bar.dataset.width;

        bar.style.width = "0%";


        setTimeout(() => {

            bar.style.width =
                `${width}%`;

        }, 350);

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function startScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".kpi-card, .panel, .project-card, .issue-card, .wo-card"
        );


    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";


        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function startNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const id =
                    link.getAttribute(
                        "href"
                    );

                const section =
                    document.querySelector(
                        id
                    );

                if (!section) return;


                const navHeight =
                    document.querySelector(
                        ".main-nav"
                    ).offsetHeight;


                const position =
                    section.offsetTop -
                    navHeight -
                    15;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });


    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    links.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const active =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );


                    if (active) {

                        active.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(
            section
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


    if (
        window.matchMedia(
            "(max-width: 700px)"
        ).matches
    ) {
        return;
    }


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                const rotateX =
                    ((centerY - y) /
                        centerY) *
                    3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);
