# zero-to-tech-4-1（模块 4.1 配套代码）

> 这是 **零到全栈 · 模块 4.1：现代前端第一步——模块化** 的配套代码——
> 网站**模块化改造之前**的起点版本。

跟着这一节课件一步步改下来，你会把它改造成 ES 模块化的版本——这份模块化成果，就是 4.2 那一节的出发点（下一节我们在它基础上配 Vite 工具链）。

## 它当前是什么样

- 两个页面：`index.html`（个人主页）、`text-lab.html`（文字实验室）
- 顶部 hero 区（品牌 + 导航 + 大标题）、卡片、分数动画——和模块 1.2 展示过的最终成品 UI 一脉相承
- 8 个 css 文件、3 个 js 文件，沿用模块 3.2 教过的"用 `<link>` 和 `<script src>` 引文件"写法
- anime.js 通过**传统 `<script>` 标签**（IIFE 版本）从 CDN 拉过来，挂到 `window.anime` 全局
- 四个 `<script>` 必须按 **anime.js → cards.js → score.js → nav.js** 的顺序加载，错一个就崩

> 这套写法刚开始还能用，但项目一长大就会撞上**两件结构痛**：**顺序坑** + **全局污染**。
> 课件里会带你亲眼撞上它们，然后一起把项目改造成 ES 模块化的版本。

## 怎么打开

直接在浏览器里双击 `index.html` 即可，无需任何工具。

## 想自己亲手撞一下"顺序坑"？

把 `index.html` 底部前两行 `<script>` 调换：

```html
<script src="js/cards.js"></script>  <!-- cards 跑的时候 anime 还没加载 -->
<script src="https://cdn.jsdelivr.net/npm/animejs@4.1.4/lib/anime.iife.min.js"></script>
<script src="js/score.js"></script>
<script src="js/nav.js"></script>
```

刷新页面、F12 看控制台——一行刺眼的红字：

```
Uncaught ReferenceError: anime is not defined
```

卡片动画当场报废。这就是"靠 `<script>` 顺序维持依赖"的脆弱——课件里讲的两件结构痛之一。

实验做完，记得把两行调回原顺序。

## 自己动手：把它改造成模块化版本

下面这五步，就是课件里带你做的那次改造。你也可以**对照着自己手动改一遍**——代码都给你了，逐个粘进去就行（不用自己写）。

### 第一步：改 `cards.js`，给它模块化

把 `js/cards.js` 的内容**整个替换**成：

```javascript
import { animate, stagger } from "https://cdn.jsdelivr.net/npm/animejs@4/+esm";

export function initCardsAnim() {
  animate(".card", {
    opacity: [0, 1],
    translateY: [24, 0],
    delay: stagger(120),
    duration: 700,
    ease: "outBack",
  });
}
```

- 顶上 `import`：明文声明"我要用 anime.js 里的 `animate` 和 `stagger`"（注意网址末尾的 `+esm`，这是 anime.js 的 **ES 模块版本**）。
- `export`：把这个函数对外开放，让别的文件能 import 它。

### 第二步：改 `score.js`，给它也模块化（顺手升级动画）

把 `js/score.js` 的内容**整个替换**成：

```javascript
import { animate, scrambleText } from "https://cdn.jsdelivr.net/npm/animejs@4/+esm";

export function initScoreAnim() {
  var btn = document.querySelector(".primary-button");
  var scoreEl = document.querySelector("[data-score]");
  if (!btn || !scoreEl) return;

  btn.addEventListener("click", function () {
    animate(scoreEl, {
      innerHTML: scrambleText({ chars: "0-9" }),
      duration: 1500,
    });
  });
}
```

- 套路和第一步一样：上面 `import`、下面 `export`。
- 顺手把原来 `setInterval` 手写的数字滚动，换成了 anime.js 的 `scrambleText` 特效（这个特效只在 ES 模块版本里才有）。
- 注意 `scrambleText({ chars: "0-9" })` 里的 `chars: "0-9"`——它告诉 scrambleText**滚动时只用数字 0~9**。不加这个参数的话，它默认会用字母、符号一起洗，分数滚动过程中就会闪过一堆字母，不像在"算数字"。

### 第三步：改 `nav.js`，给它也模块化

把 `js/nav.js` 的内容**整个替换**成：

```javascript
export function initNav() {
  var path = location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".nav-link");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (href === path) links[i].classList.add("active");
    else links[i].classList.remove("active");
  }
}
```

- 对比一下改造前后：**只有头尾变了**——外层的 `(function () { ... })()` 立即执行包裹，换成了 `export function initNav() { ... }`，中间逻辑一字未改。
- 模块化只管"怎么对外暴露"，不会逼你改写内部逻辑。

### 第四步：新建 `main.js`，作为整个项目的总入口

在 `js/` 目录下**新建一个文件** `js/main.js`，写入：

```javascript
import { initNav } from "./nav.js";
import { initCardsAnim } from "./cards.js";
import { initScoreAnim } from "./score.js";

initNav();
initCardsAnim();
initScoreAnim();
```

- 它把前三个文件 `export` 出来的函数分别 `import` 进来，再挨个调用一遍。
- 说白了，它就是整个页面的"总开关"。

### 第五步：改两个 HTML，把四行 `<script>` 收成一行

打开 `index.html`，把底部那四行 `<script>`：

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@4.1.4/lib/anime.iife.min.js"></script>
<script src="js/cards.js"></script>
<script src="js/score.js"></script>
<script src="js/nav.js"></script>
```

**整个删掉，换成一行**：

```html
<script type="module" src="js/main.js"></script>
```

`text-lab.html` 那边**也有同样的四行**，照样删掉、换成这一行。

> 改完之后，**别再双击 `index.html` 打开了**——ES 模块必须通过"服务器"提供才能加载，浏览器不允许 `file://` 直接打开（会白屏 + CORS 报错）。
> 把项目部署到模块 3.5 那台 Nginx 服务器上（push → 服务器 pull → 指向它），再用公网 IP 访问，就能看到改造后的效果了。

改完这五步，你就拿到了 4.1 的模块化成果——也就是 4.2 那一节的出发点。

## 这一节最该带走的一句话

> 项目长大了，"全堆在一起 + 手排 `<script>` 顺序 + 全靠 window 全局"的旧组织方式撑不住了。
> **模块化**把每个文件的依赖写进代码里、给每个文件一份独立作用域——
> 这就是工程化迈出的第一步。
