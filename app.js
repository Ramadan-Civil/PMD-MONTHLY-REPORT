/* =========================================================
   MERAAS PMD EXECUTIVE REPORT V3
   INTERACTIONS / ANIMATIONS / LANGUAGE / PRINT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setReportDate();

    startCounters();

    animateBars();

    startScrollAnimations();

    startNavigation();

    startProjectInteractions();

    startLanguageSystem();

    startPrintSystem();

});


/* =========================================================
   GLOBAL LANGUAGE STATE
========================================================= */

let currentLanguage = "en";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        department:
            "PROJECT MANAGEMENT DEPARTMENT",

        monthly_report:
            "MONTHLY EXECUTIVE REPORT",

        performance_control:
            "PROJECT PERFORMANCE & CONTROL",

        monthly:
            "Monthly",

        executive_report:
            "Executive Report",

        hero_description:
            "Executive overview of project performance, progress, work orders, schedule status and critical management issues.",

        print_report:
            "Print Report",

        total_projects:
            "TOTAL PROJECTS",

        overall_progress:
            "OVERALL PROGRESS",

        work_orders:
            "WORK ORDERS",

        overview:
            "Overview",

        performance:
            "Performance",

        projects:
            "Projects",

        critical_issues:
            "Critical Issues",

        executive_overview:
            "EXECUTIVE OVERVIEW",

        performance_glance:
            "Project Performance at a Glance",

        completed:
            "Completed",

        ongoing:
            "Ongoing",

        delayed:
            "Delayed",

        pending:
            "Pending",

        increase_month:
            "+12.5% this month",

        two_projects:
            "↑ 2 projects",

        active_execution:
            "Active execution",

        requires_attention:
            "Requires attention",

        total_wos:
            "Total WOs",

        vs_planned:
            "-4.4% vs planned",

        project_control:
            "PROJECT CONTROL",

        turning_data:
            "Turning Project Data into",

        management_decisions:
            "Management Decisions",

        performance_analytics:
            "PERFORMANCE ANALYTICS",

        project_performance:
            "Project Performance",

        scurve:
            "S-Curve Performance",

        planned:
            "Planned",

        forecast:
            "Forecast",

        actual:
            "Actual",

        portfolio:
            "PORTFOLIO",

        project_status:
            "Project Status",

        discipline_analysis:
            "DISCIPLINE ANALYSIS",

        progress_discipline:
            "Progress by Discipline",

        actual_progress:
            "Actual Progress",

        civil:
            "Civil",

        architectural:
            "Architectural",

        electrical:
            "Electrical",

        mechanical:
            "Mechanical",

        work_order_control:
            "WORK ORDER CONTROL",

        work_order_status:
            "Work Order Status",

        total:
            "Total",

        project_portfolio:
            "PROJECT PORTFOLIO",

        key_projects:
            "Key Projects",

        equestrian_description:
            "Major construction and infrastructure development works.",

        tbz_description:
            "Zones D & E project execution and coordination.",

        infrastructure_description:
            "Infrastructure works completed and handed over.",

        handover_completed:
            "Handover Completed",

        execution_monitoring:
            "EXECUTION MONITORING",

        from_work_orders:
            "From Work Orders",

        field_execution:
            "to Field Execution",

        work_order_management:
            "WORK ORDER MANAGEMENT",

        work_order_performance:
            "Work Order Performance",

        execution_tracking:
            "EXECUTION TRACKING",

        project_data:
            "Project Data",

        project:
            "Project",

        building:
            "Building",

        discipline:
            "Discipline",

        wo_no:
            "WO No.",

        contractor:
            "Contractor",

        progress:
            "Progress",

        status:
            "Status",

        management_attention:
            "MANAGEMENT ATTENTION",

        critical:
            "CRITICAL",

        pending_seven_days:
            "Pending 7 Days",

        schedule_impact:
            "SCHEDULE IMPACT",

        delivery_installation_delay:
            "Delivery and installation delay",

        impact_twelve_days:
            "Impact: 12 Days",

        material_approval:
            "Material Approval",

        awaiting_consultant:
            "Awaiting Consultant Response",

        requires_followup:
            "Requires follow-up",

        footer_report:
            "Monthly Executive Report — 2026"

    },


    ar: {

        department:
            "إدارة إدارة المشاريع",

        monthly_report:
            "التقرير التنفيذي الشهري",

        performance_control:
            "أداء المشروعات والتحكم",

        monthly:
            "التقرير",

        executive_report:
            "التنفيذي الشهري",

        hero_description:
            "نظرة تنفيذية شاملة على أداء المشروعات ونسب الإنجاز وأوامر العمل وحالة البرنامج الزمني وأهم الموضوعات التي تتطلب تدخل الإدارة.",

        print_report:
            "طباعة التقرير",

        total_projects:
            "إجمالي المشروعات",

        overall_progress:
            "نسبة الإنجاز الكلية",

        work_orders:
            "أوامر العمل",

        overview:
            "نظرة عامة",

        performance:
            "الأداء",

        projects:
            "المشروعات",

        critical_issues:
            "المشكلات الحرجة",

        executive_overview:
            "نظرة عامة تنفيذية",

        performance_glance:
            "أداء المشروعات في لمحة",

        completed:
            "مكتمل",

        ongoing:
            "جاري التنفيذ",

        delayed:
            "متأخر",

        pending:
            "معلق",

        increase_month:
            "+12.5% هذا الشهر",

        two_projects:
            "↑ مشروعان",

        active_execution:
            "تنفيذ نشط",

        requires_attention:
            "يتطلب الانتباه",

        total_wos:
            "إجمالي أوامر العمل",

        vs_planned:
            "-4.4% مقارنة بالمخطط",

        project_control:
            "التحكم في المشروعات",

        turning_data:
            "تحويل بيانات المشروعات إلى",

        management_decisions:
            "قرارات إدارية",

        performance_analytics:
            "تحليلات الأداء",

        project_performance:
            "أداء المشروعات",

        scurve:
            "منحنى S للأداء",

        planned:
            "المخطط",

        forecast:
            "المتوقع",

        actual:
            "الفعلي",

        portfolio:
            "محفظة المشروعات",

        project_status:
            "حالة المشروعات",

        discipline_analysis:
            "تحليل التخصصات",

        progress_discipline:
            "نسبة الإنجاز حسب التخصص",

        actual_progress:
            "الإنجاز الفعلي",

        civil:
            "مدني",

        architectural:
            "معماري",

        electrical:
            "كهرباء",

        mechanical:
            "ميكانيكا",

        work_order_control:
            "التحكم في أوامر العمل",

        work_order_status:
            "حالة أوامر العمل",

        total:
            "الإجمالي",

        project_portfolio:
            "محفظة المشروعات",

        key_projects:
            "المشروعات الرئيسية",

        equestrian_description:
            "أعمال الإنشاءات والبنية التحتية الرئيسية للمشروع.",

        tbz_description:
            "تنفيذ وتنسيق أعمال المشروع بالمناطق D و E.",

        infrastructure_description:
            "تم استكمال أعمال البنية التحتية وتسليمها.",

        handover_completed:
            "تم التسليم",

        execution_monitoring:
            "متابعة التنفيذ",

        from_work_orders:
            "من أوامر العمل",

        field_execution:
            "إلى التنفيذ الميداني",

        work_order_management:
            "إدارة أوامر العمل",

        work_order_performance:
            "أداء أوامر العمل",

        execution_tracking:
            "متابعة التنفيذ",

        project_data:
            "بيانات المشروعات",

        project:
            "المشروع",

        building:
            "المبنى",

        discipline:
            "التخصص",

        wo_no:
            "رقم أمر العمل",

        contractor:
            "المقاول",

        progress:
            "الإنجاز",

        status:
            "الحالة",

        management_attention:
            "موضوعات تتطلب تدخل الإدارة",

        critical:
            "حرج",

        pending_seven_days:
            "معلق منذ 7 أيام",

        schedule_impact:
            "تأثير على البرنامج الزمني",

        delivery_installation_delay:
            "تأخر التوريد والتركيب",

        impact_twelve_days:
            "التأثير: 12 يومًا",

        material_approval:
            "اعتماد المواد",

        awaiting_consultant:
            "في انتظار رد الاستشاري",

        requires_followup:
            "يتطلب المتابعة",

        footer_report:
            "التقرير التنفيذي الشهري — 2026"

    }

};


/* =========================================================
   REPORT DATE
========================================================= */

function setReportDate() {

    const element =
        document.getElementById("reportDate");

    if (!element) return;

    const date =
        new Date();

    const month =
        date.toLocaleString(
            currentLanguage === "ar"
                ? "ar"
                : "en-US",
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
   LANGUAGE SYSTEM
========================================================= */

function startLanguageSystem() {

    const button =
        document.getElementById(
            "languageToggle"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "en"
                    ? "ar"
                    : "en";


            applyLanguage();

        }
    );

}


function applyLanguage() {

    const dictionary =
        translations[currentLanguage];


    document.documentElement.lang =
        currentLanguage;


    document.documentElement.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    const elements =
        document.querySelectorAll(
            "[data-i18n]"
        );


    elements.forEach(element => {

        const key =
            element.dataset.i18n;

        if (
            dictionary[key] !== undefined
        ) {

            element.textContent =
                dictionary[key];

        }

    });


    const languageText =
        document.getElementById(
            "languageText"
        );


    if (languageText) {

        languageText.textContent =
            currentLanguage === "en"
                ? "العربية"
                : "English";

    }


    setReportDate();

}


/* =========================================================
   PRINT SYSTEM
========================================================= */

function startPrintSystem() {

    const button =
        document.getElementById(
            "printReport"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            window.print();

        }
    );

}


/* =========================================================
   COUNTERS
========================================================= */

function startCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    counters.forEach(
        counter => {

            const target =
                Number(
                    counter.dataset.counter
                );

            if (
                Number.isNaN(target)
            ) {
                return;
            }


            let start = 0;

            const duration = 1400;

            const startTime =
                performance.now();


            function update(currentTime) {

                const elapsed =
                    currentTime -
                    startTime;


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


                if (
                    progress < 1
                ) {

                    requestAnimationFrame(
                        update
                    );

                }

                else {

                    counter.textContent =
                        target;

                }

            }


            requestAnimationFrame(
                update
            );

        }
    );

}


/* =========================================================
   BAR ANIMATION
========================================================= */

function animateBars() {

    const bars =
        document.querySelectorAll(
            ".bar-fill"
        );


    bars.forEach(
        bar => {

            const width =
                bar.dataset.width;


            bar.style.width =
                "0%";


            setTimeout(
                () => {

                    bar.style.width =
                        `${width}%`;

                },
                400
            );

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function startScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".kpi-card, .panel, .project-card, .issue-card, .wo-card"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.style.opacity =
                    "1";

            }
        );

        return;

    }


    elements.forEach(
        element => {

            element.classList.add(
                "reveal-ready"
            );

        }
    );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "reveal-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function startNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    links.forEach(
        link => {

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


                    if (!section) {
                        return;
                    }


                    const nav =
                        document.querySelector(
                            ".main-nav"
                        );


                    const navHeight =
                        nav
                            ? nav.offsetHeight
                            : 0;


                    const position =
                        section.offsetTop -
                        navHeight -
                        15;


                    window.scrollTo({

                        top:
                            position,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        links.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const active =
                            document.querySelector(
                                `.nav-link[href="#${entry.target.id}"]`
                            );


                        if (active) {

                            active.classList.add(
                                "active"
                            );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================================
   PROJECT CARD 3D INTERACTION
========================================================= */

function startProjectInteractions() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const mobile =
        window.matchMedia(
            "(max-width: 700px)"
        ).matches;


    if (
        reducedMotion ||
        mobile
    ) {
        return;
    }


    cards.forEach(
        card => {

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

        }
    );

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
