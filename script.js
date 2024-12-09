document.addEventListener('DOMContentLoaded', function () {
    // Load the header dynamically
    fetch('index.html') // Fetch the content from index.html
        .then(response => response.text())
        .then(data => {
            // Inject content into the header
            const header = document.getElementById('header');
            if (header) {
                header.innerHTML = data; // Adjust this if the header section is specific
            } else {
                console.error("Header element with ID 'header' not found.");
            }

            // Inject content into the footer
            const footer = document.getElementById('footer');
            if (footer) {
                footer.innerHTML = data; // Adjust this if the footer section is specific
                
                // Initially hide the footer
                footer.style.display = "none";

                // Add scroll event listener to toggle footer visibility
                window.addEventListener('scroll', function () {
                    const scrollPosition = window.scrollY + window.innerHeight;
                    const pageHeight = document.body.scrollHeight;

                    console.log(`Scroll position: ${scrollPosition}, Page height: ${pageHeight}`);

                    if (scrollPosition >= pageHeight - 10) {
                        // Show footer when near the bottom
                        footer.style.display = "block";
                    } else {
                        // Hide footer otherwise
                        footer.style.display = "none";
                    }
                });
            } else {
                console.error("Footer element with ID 'footer' not found.");
            }
        })
        .catch(error => console.error('Error loading content:', error));

        const menu = document.getElementById('menu');

}
);

console.clear();
gsap.registerPlugin(MotionPathPlugin);

let targets = gsap.utils.toArray("#menu-bar p");
let dotCenters = [50, 150, 250, 350, 450, 550];
let yCenter = 112;
let maxTravel = 500;
let minTravel = 100;
let mapper = gsap.utils.mapRange(minTravel, maxTravel, 0.5, 1);
let anim;
let activeDot = 0;
let targetDot;
let maxDur = 1;
let maxArc = 150;
let staggers = [0.2, 0.16, 0.135, 0.12, 0.11];

targets.forEach((obj, i) => {
  obj.index = i;
  obj.addEventListener("click", letsGoo);
});

function letsGoo() {
  targetDot = this.index;
  if (targetDot != activeDot) {
    if (anim && anim.isActive()) {
      anim.progress(1);
    }

    let oldX = dotCenters[activeDot];
    let newX = dotCenters[targetDot];
    let travel = Math.abs(oldX - newX);
    let factor = mapper(travel);
    let newArc = yCenter - maxArc * factor;
    let dur = maxDur * factor;
    let newStagger = staggers[travel / 100 - 1];
    let newPath = `M${oldX},${yCenter} Q${
      travel / 2 + Math.min(oldX, newX)
    },${newArc} ${newX},${yCenter}`;

    gsap.set("#main", { attr: { d: newPath } });
    anim = gsap
      .timeline()
      .to(".jumper", {
        motionPath: {
          path: "#main",
          align: "#main",
          alignOrigin: [0.5, 0.5]
        },
        stagger: newStagger,
        duration: dur,
        ease: "sine.inOut"
      })
      .to(
        ".jumper",
        { duration: dur / 2, attr: { rx: 40, ry: 40 }, yoyo: true, repeat: 1 },
        0
      );
  } else {
    return;
  }

  activeDot = targetDot;
}
