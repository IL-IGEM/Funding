(function () {
    const loader = document.getElementById('loader');
    const num = document.getElementById('loader-number');
    let n = 0;

    function step() {
        n = Math.min(n + Math.floor(Math.random() * 8) + 2, 100);
        num.textContent = n;

        if (n < 100) {
            setTimeout(() => requestAnimationFrame(step), 45);
        } else {
            setTimeout(() => {
                loader.classList.add('wipe');
                setTimeout(() => {loader.classList.add('done'); onDoneLoading();}, 680);
            }, 180);
        }
    }

    requestAnimationFrame(step);
})();

function onDoneLoading() {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('in', entry.isIntersecting);
            });
        },
        { threshold: 0.3 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
        revealObserver.observe(el);
    });

    /* Funding numbers thingy */

    function countUpNumber(element) {
        const target = element.getAttribute("data-to");
        
        if (target == "0") clearInterval(i);
        element.innerHTML = 0;

        let i = setInterval(function () {
            element.innerHTML++;
            if (Number.parseInt(element.innerHTML) >= target) clearInterval(i);
        }, Math.min(1000 / target, 700));
    }

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    countUpNumber(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    document.querySelectorAll(".count").forEach((el) => {
        counterObserver.observe(el);
    });
}

/* active switches based on section */

document.querySelectorAll('section[id]').forEach((section) => {
    new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                document.querySelectorAll('.nav-link').forEach((link) => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            });
        },
        { threshold: 0.15, rootMargin: '-60px 0px -40% 0px'}
    ).observe(section);
});

/* navigation shadow */

const header = document.querySelector("nav");
window.addEventListener("scroll", function (event) {
    header.classList.toggle("scrolled", scrollY > 15);
});

/* FAQ expanding */


