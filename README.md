# 蜡笔文具店 · CRAYON STATIONERY

一个蓝色系的个人主页，伪装成一间小文具店。纯静态站点（HTML + CSS + 原生 JS），**不需要服务器、不需要安装任何东西**，丢到 GitHub Pages 就能拿到公开链接。

## 页面结构

| 顺序 | 模块 | 交互 |
|---|---|---|
| 开场 | 推门 | 门板真实翻开、门铃音、整屏上滑进入店铺 |
| 01 | 挑东西（选购） | 分类筛选、价格排序、商品详情弹层、加入购物车（飞入动画 + 提示音）、卡片数量角标 |
| — | 购物车抽屉 | 增减数量、移除、实时合计、刷新后仍然保留（localStorage） |
| 02 | 个人须知 | 身份证式名牌 + 三块钉在板上的便签（须知 / 喜点 / 雷点），可勾选「我看完了」并盖章 |
| 03 | 回忆陈列 | 相册形式，默认 12 个拍立得位置（6 张已填 + 6 个虚线空位），点开看「背面」 |
| 04 | 结账 | 收银机打印小票动画、随机「手写备注」、条形码、印章、撕下小票 |
| 顶部 | 蜡笔换色 | 5 支蓝色蜡笔，点一下整站配色跟着变 |
| Hero | 试写区 | 可以直接用当前蜡笔画两笔（Canvas），可擦掉 |

## 本地预览

在项目文件夹里执行任意一种：

```bash
python3 -m http.server 8000
# 然后打开 http://localhost:8000
```

或者直接双击 `index.html`（也能用，只是音频在部分浏览器里需要先点击才有声音）。

## 内容怎么改

所有文字都在 `data.js` 里，改完刷新即可：

- `PRODUCTS` — 货架上的商品（名称、英文名、分类、价格、颜色、描述、规格）
- `NOTICE` — 个人须知 / 喜点 / 雷点（原文照搬，改字直接改这里）
- `MEMORIES` — 相册里每张卡的标题、正面一句话、背面一段话
- `ALBUM_SLOTS` — 相册总位置数（默认 12），多出来的就是空位
- `PALETTES` — 顶部那 5 支蜡笔的颜色
- `RECEIPT_NOTES` — 打印小票时随机出现的那句「手写备注」

**换成真照片**：把图片放进 `assets/memories/`，再在对应回忆里加一行：

```js
img: 'assets/memories/01.jpg',
```

不写 `img` 就保留默认的蜡笔小画。

## 发布到 GitHub Pages

### 方式一：网页上传（不用装 Git）

1. 在 GitHub 新建仓库，名字随意（比如 `crayon-shop`），**Public**，不要勾选 README。
2. 进入仓库 → `Add file` → `Upload files`，把本项目里的 `index.html`、`style.css`、`data.js`、`app.js` **全部传进去**（注意保留文件夹结构，不要只传 index.html）。
3. `Commit changes`。
4. 仓库 → `Settings` → 左侧 `Pages` → Source 选 `Deploy from a branch`，Branch 选 `main` / `(root)`，`Save`。
5. 等 1–2 分钟，链接就是：`https://你的用户名.github.io/仓库名/`

### 方式二：命令行

```bash
cd crayon-shop
git init
git add .
git commit -m "crayon shop"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

然后在仓库 Settings → Pages 里打开（同上第 4 步）。

### 自定义域名（可选）

Settings → Pages → Custom domain 填你的域名，再到域名服务商加一条 CNAME 指向 `你的用户名.github.io`。

## 注意

- 本站是个人主页/展示用，**不发货、不收款**，购物车和「结账」都只发生在浏览器本地，没有后端。
- 购物车、配色、已阅状态存在浏览器 `localStorage`，换设备不会同步。
- 页面里的联系方式、二维码之类都没有，需要的话自己加。

---

Made with 24 crayons and 0 sleep.
