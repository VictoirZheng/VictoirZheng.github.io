# victoirzheng.github.io

郑庆广（Qingguang “Victor” Zheng）的个人主页，用 GitHub Pages 自带的 Jekyll 生成，没有额外的构建步骤：推送到 `main` 后约 1 分钟自动上线。

## 内容在哪里

| 想改的内容 | 文件 | 在线编辑器里的位置 |
| --- | --- | --- |
| 博客文章 | `_posts/年-月-日-网址名.md` | Posts |
| 首页（英文 / 中文）的问候、简介、研究方向 | `index.md`、`zh/index.md` | Pages |
| Research 页的简介和 Methods | `research/index.md` | Pages |
| About 页 | `about/index.md` | Pages |
| 首页 “Lately” | `_data/news.yml` | Lists → Lately |
| 论文、海报、报告 | `_data/publications.yml` | Lists → Papers and talks |
| 研究项目（Research 页和中文首页共用） | `_data/projects.yml` | Lists → Projects |
| 软件 / 工具 | `_data/software.yml` | Lists → Software |
| 导航、日期格式等界面文字 | `_data/i18n.yml` | 不在编辑器里 |
| 站点名、邮箱、社交链接、页面布局 | `_config.yml` | 不在编辑器里 |
| 样式（颜色、字体、间距） | `assets/css/site.css` | 不在编辑器里 |

## 在线写文章、改内容

编辑器地址：<https://victoirzheng.github.io/admin/>（基于 [Sveltia CMS](https://sveltiacms.app/)）。

**第一次使用：创建登录用的令牌（token）**

编辑器的登录框里有一个直达 GitHub 的链接，权限已经预先选好；也可以按下面的步骤手动创建：

1. 打开 <https://github.com/settings/personal-access-tokens/new>，新建一个 fine-grained token。
2. Repository access 选 “Only select repositories”，只勾选 `VictoirZheng.github.io`。
3. Permissions → Repository permissions → **Contents** 设为 **Read and write**（其他保持默认）。
4. 设一个有效期（例如一年），生成后复制。
5. 在编辑器页面点 “Sign In Using Access Token”，粘贴即可。令牌只保存在当前浏览器里，换设备需要重新粘贴。

**写一篇文章**

1. Posts → New，填写标题、日期、语言（English / 中文）、摘要和正文。
2. 中文标题：保存前点右侧 ⚓ 图标，在 Slug 里填一个英文网址名（如 `first-week-at-uconn`），否则网址会用标题里的英文字母，没有英文时会是一串随机字符。保存后网址就固定了。
3. 点 Save，编辑器会直接提交到 GitHub，约 1 分钟后出现在网站上，网址形如 `/blog/2026/first-week-at-uconn/`。
4. 关掉 Published 就是草稿：网站上不显示，但仓库是公开的，草稿文件在 GitHub 上仍然能被看到。
5. `_posts/2026-11-05-formatting-reference.md` 是一篇演示各种格式的草稿，可以当模板参考，不需要时直接删掉。

## 本地预览（可选）

需要 Ruby 和 Bundler：

```bash
bundle install
bundle exec jekyll serve
```

然后打开 <http://localhost:4000>。加上 `--unpublished` 可以连草稿一起预览。在本地打开 `/admin/` 时，可以选 “Work with Local Repository”，直接编辑本地文件（需要 Chrome 或 Edge）。

## 维护说明

- **升级编辑器**：`admin/index.html` 里固定了 Sveltia CMS 的版本号和完整性哈希（integrity）。升级时改掉网址里的版本号，再用下面的命令算出新的哈希，填进 `integrity`：

  ```bash
  curl -s https://unpkg.com/@sveltia/cms@版本号/dist/sveltia-cms.js | openssl dgst -sha384 -binary | openssl base64 -A
  ```

- **旧网址**：`personal.html`、`faq.html`、`contact.html`、`skills.html`、`research.html` 会自动跳转到新页面，规则在 `_config.yml` 的 `defaults` 里。
- **字体**：标题用 Newsreader（SIL Open Font License，见 `assets/fonts/Newsreader-OFL.txt`），已裁剪为只含拉丁字符的单个文件；正文用系统字体。
- **Logo**：`images/logo.svg` 是单环版，`images/logo-double.svg` 是双环版；页眉里的 logo 在 `_includes/logo.svg`，颜色跟随 CSS，深色模式会自动变浅。
- **安全**：网站的公开页面不加载任何第三方脚本；编辑器的令牌存在浏览器里。如果设备丢失，到 <https://github.com/settings/personal-access-tokens> 撤销令牌即可。
