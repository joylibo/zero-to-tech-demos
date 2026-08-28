# zero-to-tech-6-6 · 前端替换文件（模块 6.6 配套代码）

这一节前端要改的都在 `components/` 和 `css/` 下，这里只放**改动的文件**，方便你直接覆盖，不用一行行敲。其余文件（`app/`、`data/site.js`、其它 css）都不用动。

> 这不是一个能独立跑的工程，是"替换用的文件"。后端是你在模块 6 一路搭起来的那个。

## 改了哪些文件

```
components/
  HistoryModal.jsx  ← 新增：历史记录弹窗，用 .map() 把数组逐条列出来
  ResultCard.jsx    ← 只加了右上角那个"历史记录"按钮
  TextLabView.jsx   ← 多两份 state（历史数据、弹窗开关），点开时才去 GET /api/history
css/
  lab.css           ← 新增按钮与弹窗的样式
```

历史放在**弹窗**里，而不是在页面底部再加一张卡——这样不会把文字实验室的页面撑得很长，对原来的两卡布局打扰最小。

弹窗是**点开的那一刻**才去请求 `/api/history` 的，没必要每次进页面都拉一遍。

## 怎么用

课件到"把历史显示出来"这一步时，用这些文件覆盖你 `~/zero-to-tech/` 下的同名文件即可。

```bash
git clone https://github.com/joylibo/zero-to-tech-demos.git
cp zero-to-tech-demos/zero-to-tech-6-6/components/*.jsx ~/zero-to-tech/components/
cp zero-to-tech-demos/zero-to-tech-6-6/css/lab.css      ~/zero-to-tech/css/
```

## 两点说明

- **时间显示做了本地化。** 后端存的是 UTC（6.3 立的规矩），`HistoryModal.jsx` 里的 `formatTime()` 负责转成你所在时区再显示——所以列表上看到的是本地时间，不是数据库里那串 `+00:00`。
- **这一版还没有会话。** 谁来访问，`/api/history` 返回的都是同一份"全部历史"——这正是课件要你亲眼看见的问题。跟着课件往下做，加上 cookie 会话之后，两处 `fetch` 还要各加一句 `credentials: "include"`。
