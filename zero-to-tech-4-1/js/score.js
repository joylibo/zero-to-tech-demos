import { animate, scrambleText } from "animejs";

export function initScoreAnim() {
  var btn = document.querySelector(".primary-button");
  var scoreEl = document.querySelector("[data-score]");
  if (!btn || !scoreEl) return; // 个人主页没这俩元素

  btn.addEventListener("click", function () {
    animate(scoreEl, {
      innerHTML: scrambleText({ chars: "0-9" }),
      duration: 1500,
    });
  });
}
