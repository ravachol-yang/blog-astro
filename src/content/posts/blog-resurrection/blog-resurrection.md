---
title: '复活一下我的小网站'
published: 2026-09-16T11:04:25.456Z
updated: ''
tags:
  - Blog
  - 博客主题
draft: false
pin: 0
toc: true
lang: ''
abbrlink: 'blog-resurrection'
---

一转眼半年都没写文章，假期快结束时我决定重启我的个人小网站，把这半年里的折腾记录和生活记录都补上，看了一眼上游，目前使用的[Retypeset主题](https://github.com/radishzzz/astro-theme-retypeset)上一次commit也是在半年前，我准备刚好拉取一下上游，再开始自己的更新，上游的更新其实不多，我看到主要是更新依赖版本，修改自定义配置项之类的

## 拉取与合并上游
`git fetch upstream`然后`git merge upstream/master`，发现有冲突，基本上就是`pnpm-lock.yaml`之类的，还有就是`src/config.ts`这类用户配置文件，astro引擎的主题和配置似乎不分离，或者他们根本不把这个叫「主题」

最重要的冲突其实是，一个是作者写了自己的id，另外，在我离开的这段时间里，[follow.is](https://follow.is)变成[folo.is](https://folo.is)了，作者同步修改了配置项名称
```json
<<<<<<< HEAD
    umamiAnalyticsID: '作者的id',
    // follow verification
    // https://follow.is/
    follow: {
=======
    umamiAnalyticsID: '我自己部署的id',
    // folo verification
    // https://folo.is/
    folo: {
>>>>>>> upstream/master
      // feed ID
      feedID: '',
      // user ID
      userID: '',
    },
    // apiflash access key
    // generate website screenshots for open graph images
    // get your access key at: https://apiflash.com/
    apiflashKey: '',
  },
```
我把这个手动改掉，去掉冲突标记，`git add src/config.ts`

然后我发现上游把几篇自带的默认md文件也引入了，把它们删除，然后`git add -u src/content/posts/guides/`

`pnpm-lock.yaml`理论上只要`pnpm install`一下，然后也加进git里面，这样基本上就可以commit和push到上游了
## 发现问题
### 构建产物被混入版本控制
我在冲突文件列表里面，还发现有个`src/assets/lqip-map.json`, 点开发现里面是
```json
{
  "/_astro/carol.Ca9elqsC_Zvqsou.webp": "dcbdbb6e",
  "/_astro/accounts.ieTMhjan_Z28Kf4E.webp": "ccdb9b66",
  ...
}
```
像是构建产物, 而且它的路径也令人感到迷惑，为什么，一个构建产物会出现在`src/`下？

我查到`package.json`有一行

```json
"build": "astro build && pnpm apply-lqip"
```

顺着这个我找到`scripts/apply-lqip.ts`:

```ts
/**
 * LQIP processing functions
 * Image analysis, mapping generation, and HTML application
 */
async function loadExistingLqipMap(): Promise<LqipMap> {
  try {
    const data = await fs.readFile(lqipMapPath, 'utf-8')
    return JSON.parse(data) as LqipMap
  }
  catch {
    return {} as LqipMap
  }
}
// ...一堆生成LQIP的内容
async function applyLqipToHtml(lqipMap: LqipMap): Promise<number> {
  const htmlFiles = await glob('**/*.html', { cwd: distDir })
  let totalApplied = 0
  for (const htmlFile of htmlFiles) {
    try {
      const filePath = `${distDir}/${htmlFile}`
      // ...
```
它首先读取了现有的`lqap-map.json`，可能是作为缓存?然后生成映射，然后写入构建的html文件中

在未能读取到时使用`{}`作为初始状态，这样看来这个文件是完全可以不存在的，它是一个构建的中间产物，不知道为什么出现在`src/`下

我这里先选取了本地的版本`git checkout --ours src/assets/lqip-map.json`, 然后`git add src/assets/lqip-map.json`

### Sharp构建失败
`pnpm install`还遇到个问题:
```
│ npm notice run sharp@0.34.5 build
│ npm notice run node install/build.js
│ sharp: Attempting to build from source via node-gyp
│ sharp: See https://sharp.pixelplumbing.com/install#building-from-source
│ sharp: Please add node-addon-api to your dependencies
└─ Failed in 198ms at /.../blog-astro/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp
 ELIFECYCLE  Command failed
```
但是**本来不该这样，以前就可以！**
> 软件本该正常运行，这是一种应许，我没有责任修好它😡

经过一顿排查，更换环境版本等，我意识到这本来就不是我该做的，我要**假装问题不存在，跳过它**
` pnpm install --ignore-scripts`就可以不报错，然后`pnpm build`成功

但是现在基本能运行了
### 开发模式资源加载问题
`pnpm dev`发现每次点开页面，需要刷新一次才能正确获取图片和CSS
## 自己更新依赖(引入更多问题)
> 不要迁就depenedencies的版本，工具链、依赖包、浏览器不兼容，那是它们too weak! 应该让它们追我们😡
### 清理工作空间
现在之前与上游的冲突已经修复并且`build`并运行成功了，先commit并push上去，给vercel构建成功，保持项目处于一个可构建的状态

由于上游现在半年没怎么更新，每次更新内容之间依赖也不大，我可以挑选着合并或者干脆自己实现，所以决定不再考虑和上游的兼容性，自己更新版本

而且根据**软件本该正常运行，这是一种应许，我没有责任修好它**的思想，也许我强行把依赖更新一遍，问题就解决自己了
### 更新依赖
`pnpm outdated`查看，注意到其中有红色的可能有breaking changes，包括typescript会更新到7.x

**不管了，我就要！**，出了问题以后再说

`pnpm update latest`:
### 移除Patch

```
**➜  blog-astro** **git:(master) ✗** pnpm update --latest 
Downloading canvaskit-wasm\@0.42.0: 9.98 MB/9.98 MB, done 
Downloading mermaid\@12.0.0: 26.40 MB/26.40 MB, done 
Downloading @typescript/typescript-linux-x64\@7.0.2: 9.67 MB/9.67 MB, done 
Downloading @img/sharp-libvips-linux-x64\@1.3.3: 8.18 MB/8.18 MB, done 
Downloading @img/sharp-libvips-linux-x64\@1.3.2: 8.11 MB/8.11 MB, done 
Downloading mermaid\@11.17.2: 17.80 MB/17.80 MB, done 
Downloading @rolldown/binding-linux-x64-gnu\@1.2.8: 7.97 MB/7.97 MB, done 
 ERR\_PNPM\_UNUSED\_PATCH  The following patches were not used: @qwik.dev/partytown\@0.11.2 
 
Either remove them from "patchedDependencies" or update them to match packages in your dependencies. 
Progress: resolved 1028, reused 507, downloaded 365, added 0
```
这里面有个不必要的Patch，移除掉，再次`pnpm build`
### Markdown解析器兼容性
```
> astro check && astro build && pnpm apply-lqip
`markdown.remarkPlugins`, `markdown.rehypePlugins`, and `markdown.remarkRehype` run on the `unified` processor from `@astrojs/ma
rkdown-remark`, which is no longer installed by default now that Sätteri is the default Markdown processor. Install it with:
 npm install @astrojs/markdown-remark
```
Astro默认的Markdown解析器换掉了[^1]，如果还想用旧的，这里面也提示了可以直接装回来，`pnpm add @astrojs/markdown-remark`，再次`pnpm build`
### astro check兼容性
```
The TypeScript module loaded (found 7.0.2) does not expose the programmatic API that `astro check` relies on. TypeScript's nativ
e compiler (7.0 and later) does not ship this API yet. Until it does, run `astro check` with a TypeScript version that still pro
vides it (6.x). See https://github.com/withastro/roadmap/discussions/1321 to track support.
```
这里告诉我`astro check`这个命令还没有兼容Typescript 7，那就不要用了，在`package.json`的构建命令里把它们移除，另外这个错误信息还提示我们可以持续跟进[^2]
```json
"dev": "astro dev",
"build": "astro build && pnpm apply-lqip",
"preview": "astro preview",
```
然后再次build，这次build成功了，只有warning，没有error，我们可以推送到github
## 解决警告和dev环境问题
build和dev过程还是有几个警告的
- [ ] Markdown配置deprecated
- [ ] CSS选择器未识别
- [ ] atom.xml得到404
- [ ] build时提示有些产出超过600k，这是人为设置的提示阈值

后面两个对开发影响不大，最后一个我猜只是优化问题，而`atom.xml`的问题只在本地发生，在vercel上构建的版本没有这个问题，所以我打算暂时不管，前两个还是要管一下
### Markdown配置被弃用
build输出显示:
```
[astro] \markdown.remarkPlugins\, \markdown.rehypePlugins\, and \markdown.remarkRehype\ are deprecated. 
Pass them to \unified({. ..})\ from \@astrojs/markdown-remark\ directly instead.
```
这里面已经把问题和解决方案描述得很清楚了，只要修改`astro.config.ts`，添加
```ts
import { unified } from '@astrojs/markdown-remark' 
```
然后把下面`markdown.processor`部分改成`unified({...})`:
```ts
markdown: {
  processor: unified({
    remarkPlugins: [
      remarkDirective,
      remarkMath,
      remarkContainerDirectives,
      remarkLeafDirectives,
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeMermaid, { strategy: 'pre-mermaid' }],
      rehypeSlug,
      rehypeHeadingAnchor,
      rehypeImageProcessor,
      rehypeExternalLinks,
      rehypeCodeCopyButton,
    ],
  }),
  //...
},
```

再一次build，就没有该警告了
### ESLint兼容性
这里修好了Markdown配置的兼容性，我打算commit一下

我commit message是`fix: ...`，触发了一个git-hook，出现错误:
```
✖ eslint --fix:
typescript-eslint does not support TS 7.0.
Please see https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0 to run
typescript-eslint using the TS 6 API.
See also https://github.com/typescript-eslint/typescript-eslint/issues/10940 for tracking typescript-eslint's support for TS >=7
.
```
看来这个ESLint也**Too Weak!**<sup>TM</sup>，我决定绕过它

以后每次commit涉及到fix的就
```bash
git commit --no-verify -m "fix: ..."
```
就可以通过

### 浏览器API兼容性
下一个问题：build输出:
```
15:33:41 [WARN] [vite] [lightningcss minify] 'target-current' is not recognized as a valid pseudo-class. Did you mean '::target-
current' (pseudo-element) or is this a typo?
909 |    scroll-target-group: auto;
910 |  }#toc-links-list>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(0.275rem * calc(1 - var(--un-sp...
911 |  a:target-current {
   |    ^
912 |      ;
913 |  }@media (min-width: 1536px){a:target-current{--un-text-opacity:var(--un-preset-theme-colors-primary--alpha, 1);color:...
15:33:41 [WARN] [vite] [lightningcss minify] 'target-current' is not recognized as a valid pseudo-class. Did you mean '::target-
current' (pseudo-element) or is this a typo?
911 |  a:target-current {
912 |      ;
913 |  }@media (min-width: 1536px){a:target-current{--un-text-opacity:var(--un-preset-theme-colors-primary--alpha, 1);color:...
   |                                ^
914 |  .toc-links-h2, .toc-links-h3, .toc-links-h4 {
915 |    text-wrap:balance;font-size:0.875rem;line-height:1.25rem;font-weight:400;text-decoration:none;;
15:33:41 [vite] ✓ built in 790ms
```
`rg -n "target-current" src`查询发现只有三处出现了这个，且都和TOC有关，经过检查在TOC那个组件里:
```ts
// Initialize scroll listener
function setupAutoScroll() {
  ticking = false
  lastLink = null

  const tocList = document.getElementById('toc-links-list')
  if (!tocList || !CSS.supports('selector(:target-current)')) {
    return
  }

  document.addEventListener('scroll', handleScroll, { passive: true })
}
```
经过检查，作者使用了一个目前只有Chrome, Edge和其他几个浏览器支持的API，而Firefox还没有支持[^3]，难怪我自从作者某次更新后访问这个主题的大多数博客都没有TOC滚动功能了，但有些还有，可能是博主自己修改为通用实现，或者作者在旧版本里使用了通用实现，我打开Chrome访问本站，发现确实有TOC滚动

我决定不迁就浏览器未实现的情况，也不去做一个通用实现，直接在`astro.config.ts`的`vite.css`里打开这个功能[^4]
```ts
css: {
    lightningcss: {
      drafts: {
        scrollTimeline: true,
      },
    },
  },
```
再次build就没有该警告
### 忽略构建产物
前面提到有构建中间产物`src/assets/lqip-map.json`混入了git，我要把它拿出来，先从git里面删除
```bash
git rm --cached src/assets/lqip-map.json
```
然后加入`.gitignore`

这里我同步删除了本地文件，重新`pnpm build`一次确保正确构建后，进行了commit和push
## 后续
今天强行推进和解决了这些问题
- [x] 上游冲突
- [x] Sharp安装失败（直接更新所有依赖）
- [x] LQIP构建中间产物混入git
- [x] Markdown配置deprecated
- [x] CSS选择器未识别
- [ ] ESLint的一些check功能未支持Typescript 7
- [ ] `astro check`命令未支持Typescript 7
- [ ] atom.xml得到404
- [ ] `pnpm dev`环境，图片和CSS需要刷新才能加载
- [ ] build时提示有些产出超过600k，这是人为设置的提示阈值

另外还发现，网站的评论系统Waline，我配置了Leancloud，而LeanCloud提示2027年1月就要关闭了[^5]，我还要进行迁移，还好本来也没有评论（


后面我打算把这半年里（甚至网站发布之前）的事情一点一点补写出来，后面补上的内容会加上类似这样的告示:
:::note
这篇文章发布日期与发生的日期不同，发布于<日期>，可能带有回忆成分
:::

[^1]: https://astro.build/blog/astro-640/
[^2]: https://github.com/withastro/roadmap/discussions/1321
[^3]: https://caniuse.com/mdn-css_selectors_target-current
[^4]: Vite的lightningcss部分提到了`drafts`配置 https://v7.vite.dev/config/shared-options#css-lightningcss
[^5]: https://docs.leancloud.app/sdk/announcements/sunset-announcement