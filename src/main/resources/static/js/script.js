gsap.registerPlugin(Physics2DPlugin);

document.querySelectorAll(".button").forEach((button) => {
  const bounding = button.getBoundingClientRect();

  button.addEventListener("mousemove", (e) => {
    let dy = (e.clientY - bounding.top - bounding.height / 2) / -1;
    let dx = (e.clientX - bounding.left - bounding.width / 2) / 10;

    dy = dy > 10 ? 10 : dy < -10 ? -10 : dy;
    dx = dx > 4 ? 4 : dx < -4 ? -4 : dx;

    button.style.setProperty("--rx", dy);
    button.style.setProperty("--ry", dx);
  });

  button.addEventListener("mouseleave", (e) => {
    button.style.setProperty("--rx", 0);
    button.style.setProperty("--ry", 0);
  });

  button.addEventListener("click", (e) => {
    button.classList.add("success");
    gsap.to(button, {
      "--icon-x": -3,
      "--icon-y": 3,
      "--z-before": 0,
      duration: 0.2,
      onComplete() {
        particles(button.querySelector(".emitter"), 100, 0, 0, -80, -50);
        gsap.to(button, {
          "--icon-x": 0,
          "--icon-y": 0,
          "--z-before": -6,
          duration: 1,
          ease: "elastic.out(1, .5)",
          onComplete() {
            button.classList.remove("success");
          },
        });
      },
    });
  });

  // Enter 키 이벤트 방지
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작 방지
    }
  });
});

function particles(parent, quantity, x, y, minAngle, maxAngle) {
  let colors = ["#FFFF04", "#EA4C89", "#892AB8", "#4AF2FD"];
  for (let i = quantity - 1; i >= 0; i--) {
    let angle = gsap.utils.random(minAngle, maxAngle),
      velocity = gsap.utils.random(70, 140),
      dot = document.createElement("div");
    dot.style.setProperty("--b", colors[Math.floor(gsap.utils.random(0, 4))]);
    parent.appendChild(dot);
    gsap.set(dot, {
      opacity: 1,
      x: x,
      y: y,
      scale: gsap.utils.random(0.4, 0.7),
    });
    gsap
      .timeline({
        onComplete() {
          dot.remove();
        },
      })
      .to(dot, {
        duration: 1.8,
        physics2D: {
          angle: angle,
          velocity: velocity,
          gravity: 120,
        },
      })
      .to(
        dot,
        {
          duration: 1,
          opacity: 0,
        },
        0.8
      );
  }
}
