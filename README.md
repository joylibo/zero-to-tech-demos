# zero-to-tech-demos

零到全栈课程的配套 demo 代码。

> 每一节课件里都会有一句"打开 `zero-to-tech-X-Y/` 看一下"——指的就是这里。

## 当前可用

- [`zero-to-tech-4-1/`](./zero-to-tech-4-1) —— **模块 4.1：现代前端第一步——模块化**
  - 双页面网站（个人主页 + 文字实验室）的**起点版本**
  - 用的是传统 `<script>` 标签 + window 全局变量的写法
  - 跟着这一节的课件，你会把它一步步改造成 ES 模块化的版本

- [`zero-to-tech-4-3/`](./zero-to-tech-4-3) —— **模块 4.3：React 登场——组件的规则**
  - 同一个双页面网站的 **React 版终点**：两页都做成 React 组件，整个项目只剩一个空壳 `index.html`
  - 跟着这一节的课件，把 4.2 那个 vanilla 项目，一拍一拍改造成它
  - 这是个 React / Vite 工程，**不能双击打开**，要 `npm install` 后 `npm run dev`（详见它自己的 README）

- [`zero-to-tech-4-4/`](./zero-to-tech-4-4) —— **模块 4.4：让数据驱动界面**
  - 在 4.3 React 版基础上又往前推三步：数据抽进 `src/data/site.js`、输入框接上 state、路由改用 URL
  - 跟着这一节的课件，把你的 4.3 项目一步步改成它
  - 同样是 React / Vite 工程，`npm install` 后 `npm run dev`（详见它自己的 README）

- [`zero-to-tech-4-5/`](./zero-to-tech-4-5) —— **模块 4.5：Next.js——React 之上的生产级框架**
  - 把 4.4 那个 React 项目整体搬成 **Next.js 版**：`app/` 文件夹路由、`<Link>` 跳转、页面预渲染成真实 HTML
  - 跟着这一节的课件，把你的 4.4 项目整体迁移成它
  - 这是个 **Next.js** 工程（默认端口 3000），`npm install` 后 `npm run dev`（详见它自己的 README）

- [`zero-to-tech-5-5/`](./zero-to-tech-5-5) —— **模块 5.5：前后端联调与 CORS**
  - 只放这一节**改动的前端文件**：四个组件（`HomeView` / `TextLabView` / `InputCard` / `ResultCard`）+ `css/lab.css`，主页和文字实验室都改成去调后端 API
  - **不是可独立运行的工程**，是"替换用的文件"：跟着课件到"前端直接替换"这一步，用它们覆盖你 `~/zero-to-tech/` 下的同名文件
  - 后端是你在模块 5 里一路搭的那个，按这一节课件加上 CORS 即可；后端地址暂时写死，`.env.local` 是这一节最后一步（详见它自己的 README）

- [`zero-to-tech-6-6/`](./zero-to-tech-6-6) —— **模块 6.6：状态与会话**
  - 只放这一节**改动的前端文件**：新增 `HistoryModal` 弹窗组件、`ResultCard` 加一个"历史记录"按钮、`TextLabView` 管弹窗开关并拉历史、`lab.css` 补按钮与弹窗样式
  - 历史放在**弹窗**里而不是页面底部再加一张卡，对原来的两卡布局打扰最小；点开的那一刻才去请求 `/api/history`
  - **不是可独立运行的工程**，是"替换用的文件"：跟着课件到"把历史显示出来"这一步，用它们覆盖你 `~/zero-to-tech/` 下的同名文件
  - 这一版**还没有会话**——谁来访问拿到的都是同一份"全部历史"，这正是课件要你看见的问题；`credentials: "include"` 跟着课件后半段再加（详见它自己的 README）

## 怎么用

**在线浏览**：点上面的链接，在 GitHub web 界面里看代码。

**本地克隆**：

```bash
git clone https://github.com/joylibo/zero-to-tech-demos.git
cd zero-to-tech-demos/zero-to-tech-4-1
```

- **4-1 这种 vanilla 版**：双击 `index.html` 就能在浏览器里看到网站跑起来。
- **4-3 这种 React 版**：先 `npm install`，再 `npm run dev`，按提示打开 `localhost` 地址。
- **5-5 这种"替换文件"版**：不用单独跑，把里面的文件覆盖你自己项目里的同名文件即可（详见它的 README）。

## 后续

模块 4.2 不需要单独的 demo；4.3、4.4、4.5、5.5 已加入；后续 demo 会随着课件发布陆续补上。
