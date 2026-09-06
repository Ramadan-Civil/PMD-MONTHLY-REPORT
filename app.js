/* =========================================
   PMD MONTHLY REPORT
   Main Application JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    startCounters();
    animateProgressBars();
    startScrollAnimations();

});


/* =========================================
   ANIMATED COUNTERS
========================================= */

function startCounters() {

    const counters = document.querySelectorAll("[data-counter]");

    counters.forEach(counter => {

        const target = Number(counter.dataset.counter);
        const duration = 1600;

        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing
            const eased = 1 - Math.pow(1 - progress, 3);

            const value = Math.floor(eased * target);

            counter.textContent = value.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }

        }

        requestAnimationFrame(update);

    });

}


/* =========================================
   PROGRESS BAR ANIMATION
========================================= */

function animateProgressBars() {

    const bars = document.querySelectorAll(".progress-fill");

    bars.forEach((bar, index) => {

        const value = bar.dataset.progress || 0;

        bar.style.width = "0%";

        setTimeout(() => {

            bar.style.width = `${value}%`;

        }, 300 + (index * 120));

    });

}


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

function startScrollAnimations() {

    const elements = document.querySelectorAll(
        ".fade-in, .float-in, .card, .project-card"
    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0) scale(1)";

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    elements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";

        observer.observe(element);

    });

}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {

            event.preventDefault();

            const target = document.querySelector(targetId);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});


/* =========================================
   PROJECT CARD HOVER EFFECT
========================================= */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -4;

        const rotateY =
            ((x / rect.width) - 0.5) * 4;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* =========================================
   DATE
========================================= */

function setReportDate() {

    const dateElement =
        document.getElementById("reportDate");

    if (!dateElement) return;

    const now = new Date();

    dateElement.textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });

}

setReportDate();


/* =========================================
   PAGE LOADING
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
