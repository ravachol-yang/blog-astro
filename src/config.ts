import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  // SITE INFORMATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  site: {
    // site title
    title: '一只八爪鱼',
    // site subtitle
    subtitle: '啥都看看，啥都玩玩...',
    // site description
    description: '',
    // use i18n title/subtitle/description from src/i18n/ui.ts instead of static ones above
    i18nTitle: true, // true | false
    // author name
    author: '',
    // site url
    url: 'https://ravachol.top',
    // base path
    // root directory for all pages and assets
    base: '/', // e.g., '/blog', '/docs'
    // favicon url
    // recommended formats: svg, png or ico
    favicon: '/icons/favicon.ico', // or https://example.com/favicon.svg
  },
  // SITE INFORMATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // COLOR SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  color: {
    // default theme mode
    mode: 'light', // light | dark | auto
    // light: {
    //   primary: 'oklch(0.24 0.053 261.24)',
    //   secondary: 'oklch(0.39 0.053 261.24)',
    //   background: 'oklch(1 0 0)',
    //   highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)',
    // },
    // dark: {
    //   primary: 'oklch(0.92 0 0)',
    //   secondary: 'oklch(0.79 0 0)',
    //   background: 'oklch(0.24 0.016 265.21)',
    //   highlight: 'oklch(0.93 0.195089 103.2532 / 0.2)',
    // },
    light: {
      primary: 'oklch(0.24 0.0172 280.05)',
      secondary: 'oklch(0.40 0.0172 280.05)',
      background: 'oklch(0.98 0.0172 280.05)',
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)',
    },
    dark: {
      primary: 'oklch(0.92 0.0172 280.05)',
      secondary: 'oklch(0.79 0.0172 280.05)',
      background: 'oklch(0.24 0.0172 280.05)',
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.2)',
    },
  },
  // COLOR SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // GLOBAL SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  global: {
    // default language
    locale: 'zh', // de | en | es | fr | ja | ko | pl | pt | ru | zh | zh-tw
    // more languages
    // not fill in the locale code above again, can be an empty array []
    moreLocales: [], // ['de', 'en', 'es', 'fr', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'zh-tw']
    // post font style
    fontStyle: 'sans', // sans | serif
    // post date format
    dateFormat: 'YYYY-MM-DD', // YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MMM D YYYY | D MMM YYYY
    // enable table of contents
    toc: true, // true | false
    // enable katex math rendering
    katex: true, // true | false
    // reduce motion
    reduceMotion: false, // true | false
  },
  // GLOBAL SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // COMMENT SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  comment: {
    // enable comment system
    enabled: true, // true | false
    // giscus
    // https://giscus.app/
    giscus: {
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      envId: '',
      // version: frontend version can be changed in package.json
    },
    // waline
    // https://waline.js.org/en/
    waline: {
      // server url
      serverURL: 'comment.ravachol.top',
      // emoji url
      emoji: [
        "https://unpkg.com/@waline/emojis@1.4.0/tw-emoji",
        "https://unpkg.com/@waline/emojis@1.4.0/bmoji",
        "https://unpkg.com/@waline/emojis@1.4.0/bilibili",
        "https://unpkg.com/@waline/emojis@1.4.0/alus",
        "https://unpkg.com/@waline/emojis@1.4.0/soul-emoji",
      ],
      // gif search
      search: true,// true | false
      // image uploader
      imageUploader: false, // true | false
    },
  },
  // COMMENT SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // SEO SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  seo: {
    // @twitter ID
    twitterID: '',
    // site verification
    verification: {
      // google search console
      // https://search.google.com/search-console
      google: '',
      // bing webmaster tools
      // https://www.bing.com/webmasters
      bing: '',
      // yandex webmaster
      // https://webmaster.yandex.com
      yandex: '',
      // baidu search
      // https://ziyuan.baidu.com
      baidu: '',
    },
    // google analytics
    // https://analytics.google.com
    googleAnalyticsID: '',
    // umami analytics
    // https://cloud.umami.is
    umamiAnalyticsID: '014dcb07-14ea-4d2c-b56e-6fb540b201fe',
    // follow verification
    // https://follow.is/
    follow: {
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
  // SEO SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // FOOTER SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  footer: {
    // social links
    links: [
      {
        name: 'RSS',
        url: '/atom.xml', // or /rss.xml
      },
      {
        name: 'Umami',
        url: 'https://views.ravachol.top/share/QDmKmRcGHplwB3Rf',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/',
      },
      // {
      //   name: 'X',
      //   url: 'https://x.com/radishzz_',
      // },
    ],
    // year of website start
    startYear: 2025,
  },
  // FOOTER SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END

  // PRELOAD SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START
  preload: {
    // image hosting url
    // optimize remote images and generate low-quality placeholders
    imageHostURL: '',
    // custom google analytics js
    // for users who proxy tracking scripts to a custom domain
    // see https://gist.github.com/xiaopc/0602f06ca465d76bd9efd3dda9393738
    customGoogleAnalyticsJS: '',
    // custom umami analytics js
    // for users who deploy umami on their own, or route analytics javascript to a customized domain
    // see https://github.com/umami-software/umami/discussions/1026
    customUmamiAnalyticsJS: 'https://views.ravachol.top/script.js',
  },
  // PRELOAD SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END
}

export const base = themeConfig.site.base === '/' ? '' : themeConfig.site.base.replace(/\/$/, '')
export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales
export const allLocales = [defaultLocale, ...moreLocales]
