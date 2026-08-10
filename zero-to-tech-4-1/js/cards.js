import { animate, stagger } from "https://cdn.jsdelivr.net/npm/animejs@4/+esm";

export function initCardsAnim() {
  animate(".card", {
    opacity: [0, 1],
    translateY: [24, 0],
    delay: stagger(120), // 每张卡错开 120ms，自动排好节奏
    duration: 700,
    ease: "outBack", // 弹性收尾，落地像有重量
  });
}
