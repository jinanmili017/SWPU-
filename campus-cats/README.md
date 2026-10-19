# 校园猫咪档案

一个纯静态的校园流浪猫图鉴网站。没有后端、不装任何东西、不需要服务器，托管在 GitHub Pages 上，费用为零。

## 一、本地怎么预览

**最简单**：双击 `index.html`，浏览器就打开了。改完 `cats.js` 后按 F5 刷新就能看到变化。

这就够了。下面这些是用不上的时候可以跳过：

- 用 VS Code 的话，装个 Live Server 插件，右键「Open with Live Server」，改完自动刷新
- 想模拟手机效果：按 F12 打开开发者工具，点左上角的手机图标

## 二、怎么传到 GitHub 并开启 Pages

### 1. 建仓库

打开 github.com，右上角 `+` → `New repository`

- Repository name 填 `campus-cats`
- 选 Public
- **勾选 Add a README file**（这样仓库不是空的，后面省事）
- 点 Create repository

### 2. 传文件（完全不用命令行）

在仓库页面点 `Add file` → `Upload files`，把这几个文件**全部**拖进去：

```
index.html
styles.css
app.js
cats.js
README.md
images/placeholder.svg
images/README.txt
```

拖完后拉到页面最下面，点 `Commit changes`。

> 注意：`images` 是个文件夹，要连文件夹一起拖，别只拖里面的文件。

### 3. 开启 Pages

仓库页面顶部点 `Settings` → 左侧 `Pages`

- Source 选 `Deploy from a branch`
- Branch 选 `main`，文件夹选 `/ (root)`
- 点 Save

等一两分钟，页面上方会出现网址，形如：

```
https://你的用户名.github.io/campus-cats/
```

这个链接可以直接发给同学。**以后你在网页上改任何文件，一分钟后网址自动更新。**

## 三、我要加一只新猫，改哪里

只改 `cats.js` 一个文件。

1. 用记事本或 VS Code 打开 `cats.js`
2. 找到任意一整段 `  { ... },`，从 `{` 到 `},` 整段复制
3. 粘到最后一个 `}` 前面（也就是 `];` 上面）
4. 改里面的内容：名字、花色、性别、状态、性格、地点……**字段名不要动**
5. 保存，刷新页面

字段含义：

| 字段 | 填什么 |
|---|---|
| id | 编号，随便填但要唯一，比如 '007' |
| name | 猫的名字 |
| color | 花色：橘猫 / 狸花 / 奶牛 / 三花 / 玳瑁 / 白猫 / 橘白 |
| gender | 公 / 母 / 不详 |
| status | **在校** / **毕业** / **休学** / **喵星**，只能选一个 |
| sterilized | 已绝育 / 未绝育 / 不详 |
| personality | 一句话性格 |
| appearance | 外貌特征，越具体越好（"左耳缺一小块"） |
| spots | 出没地点，可填一到三个 |
| firstSeen | 第一次见到它的时间 |
| relations | 跟别的猫的关系，可填可不填 |
| photo | 照片路径，没有就填 `images/placeholder.svg` |
| story | 一两句话的小传 |

四个状态的意思：

- **在校** = 还在校园里
- **毕业** = 已经被领养走了
- **休学** = 很长一段时间没见到
- **喵星** = 已经离开了

## 四、照片怎么处理

- 放进 `images` 文件夹，文件名建议用编号：`001.jpg`
- 然后把 `cats.js` 里那只猫的 photo 改成 `'images/001.jpg'`
- 手机原图一张 3~5MB，几十张就上百 MB，页面会慢得难受
- **压到每张 200~500KB、长边 1200 像素左右**，肉眼看不出区别
- 压缩方法：系统自带图片查看器的「调整大小」，或者用微信发给自己再保存
- 页面按 4:3 裁切显示，拍照时把猫放在画面中间

## 五、常见问题

**改了文件但网页没变？**
等一两分钟，Pages 有延迟。等不及就 Ctrl + F5 强制刷新。

**图片全是裂的？**
检查 `cats.js` 里的 photo 路径，必须是 `images/文件名.jpg`，前面没有斜杠、没有中文标点，大小写要一致。

**想换配色？**
打开 `styles.css`，最上面那几行 `--main: #3F6B46;` 就是主色，改掉整个网站的绿都跟着变。`--bg` 是背景色。

**想改标题和简介？**
`index.html` 里 `<h1>` 和 `<p class="intro">` 那两处。

## 六、这个站不能做什么

- 访客不能投稿、不能点赞、不能评论 —— 这些都需要服务器，一要服务器就得花钱
- 数据只能你自己改（在 GitHub 网页上点铅笔图标就能改，手机上也能操作）
- 如果你以后真想要点赞功能，可以接 Cloudflare Workers 的免费额度，仍然不花钱，但要另外配置
