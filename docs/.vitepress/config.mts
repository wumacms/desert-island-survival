import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsDir = path.resolve(__dirname, '..')

function getTitle(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)$/m)
    if (match) return match[1].trim()
  } catch {}
  return path.basename(filePath, '.md').replace(/^\d+\.\d+_?/, '')
}

function getFiles(dirName: string) {
  const dirPath = path.join(docsDir, dirName)
  if (!fs.existsSync(dirPath)) return []
  return fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => {
      const numA = parseFloat(a)
      const numB = parseFloat(b)
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }
      return a.localeCompare(b, 'zh-Hans-CN')
    })
    .map(f => ({
      text: getTitle(path.join(dirPath, f)),
      link: `/${dirName}/${f.replace(/\.md$/, '')}`
    }))
}

let rawBase = process.env.VITEPRESS_BASE || (process.env.GITHUB_ACTIONS ? '/desert-island-survival/' : '/')
if (!rawBase.startsWith('/')) rawBase = '/' + rawBase
if (!rawBase.endsWith('/')) rawBase = rawBase + '/'
const base = rawBase as `/${string}/` | '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '孤岛求生',
  description: '科学家的荒岛生存手册 —— 严肃硬核科学求生知识体系与生存小说',
  cleanUrls: true,

  head: [
    ['meta', { name: 'keywords', content: '孤岛求生, 荒岛求生, 生存手册, 科学求生, 荒野求生, 鲁滨逊漂流记' }],
    ['meta', { name: 'author', content: '林深' }],
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏝️</text></svg>' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&family=JetBrains+Mono:wght@400;500;600&display=swap'
      }
    ]
  ],

  themeConfig: {
    siteTitle: '孤岛求生',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '目录', link: '/目录' },
      { text: '附录', link: '/附录/附录A_荒岛生存物资优先级清单' },
    ],

    sidebar: [
      {
        text: '📖 序章：当你睁开眼，发现自己不在文明世界',
        collapsed: false,
        items: getFiles('序章')
      },
      {
        text: '🌊 第一部分：登陆与初期评估（第1—3天）',
        collapsed: false,
        items: [
          { text: '第01章 登陆瞬间：最危险的前72小时', collapsed: true, items: getFiles('第01章_登陆瞬间_最危险的前72小时') },
          { text: '第02章 岛屿地理与气候的科学判读', collapsed: true, items: getFiles('第02章_岛屿地理与气候的科学判读') },
          { text: '第03章 初期生存决策：留下还是离开', collapsed: true, items: getFiles('第03章_初期生存决策_留下还是离开') }
        ]
      },
      {
        text: '🔥 第二部分：水与火——生存的两大基石',
        collapsed: true,
        items: [
          { text: '第04章 获取安全饮用水', collapsed: true, items: getFiles('第04章_获取安全饮用水') },
          { text: '第05章 生火：从火柴到摩擦取火', collapsed: true, items: getFiles('第05章_生火_从火柴到摩擦取火') }
        ]
      },
      {
        text: '⛺ 第三部分：庇护所与身体保护',
        collapsed: true,
        items: [
          { text: '第06章 搭建庇护所', collapsed: true, items: getFiles('第06章_搭建庇护所') },
          { text: '第07章 衣物、保暖与防护', collapsed: true, items: getFiles('第07章_衣物、保暖与防护') }
        ]
      },
      {
        text: '🐟 第四部分：食物——从寻找 to 可持续',
        collapsed: true,
        items: [
          { text: '第08章 荒岛植物性食物', collapsed: true, items: getFiles('第08章_荒岛植物性食物') },
          { text: '第09章 捕鱼与海洋食物', collapsed: true, items: getFiles('第09章_捕鱼与海洋食物') },
          { text: '第10章 狩猎与陆地食物', collapsed: true, items: getFiles('第10章_狩猎与陆地食物') }
        ]
      },
      {
        text: '🔨 第五部分：工具、制造与技术',
        collapsed: true,
        items: [
          { text: '第11章 绳索、编织与容器', collapsed: true, items: getFiles('第11章_绳索、编织与容器') },
          { text: '第12章 石器、骨器与金属利用', collapsed: true, items: getFiles('第12章_石器、骨器与金属利用') },
          { text: '第13章 烹饪与食物加工', collapsed: true, items: getFiles('第13章_烹饪与食物加工') }
        ]
      },
      {
        text: '🩹 第六部分：健康、急救与医学',
        collapsed: true,
        items: [
          { text: '第14章 荒岛常见伤病处理', collapsed: true, items: getFiles('第14章_荒岛常见伤病处理') },
          { text: '第15章 荒岛疾病与寄生虫', collapsed: true, items: getFiles('第15章_荒岛疾病与寄生虫') },
          { text: '第16章 心理生存', collapsed: true, items: getFiles('第16章_心理生存') }
        ]
      },
      {
        text: '🧭 第七部分：求救、导航与离开',
        collapsed: true,
        items: [
          { text: '第17章 发出求救信号', collapsed: true, items: getFiles('第17章_发出求救信号') },
          { text: '第18章 导航与航海基础', collapsed: true, items: getFiles('第18章_导航与航海基础') },
          { text: '第19章 建造筏子与出海', collapsed: true, items: getFiles('第19章_建造筏子与出海') },
          { text: '第20章 被救援时的正确操作', collapsed: true, items: getFiles('第20章_被救援时的正确操作') }
        ]
      },
      {
        text: '🌱 第八部分：长期生存与文明重建',
        collapsed: true,
        items: [
          { text: '第21章 从生存到生活', collapsed: true, items: getFiles('第21章_从生存到生活') },
          { text: '第22章 荒岛上的科学实验与发明', collapsed: true, items: getFiles('第22章_荒岛上的科学实验与发明') }
        ]
      },
      {
        text: '📑 附录与后记',
        collapsed: false,
        items: [
          ...getFiles('附录'),
          ...getFiles('后记')
        ]
      },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3],
      label: '本章导读与大纲'
    },

    docFooter: {
      prev: '上一节',
      next: '下一节'
    },

    lastUpdated: {
      text: '最后修订'
    },

    darkModeSwitchLabel: '深浅主题',
    lightModeSwitchTitle: '切换至浅色模式',
    darkModeSwitchTitle: '切换至深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',

    footer: {
      message: '遵循硬核科学法则与真实自然机理构建',
      copyright: 'Copyright © 2026-present 孤岛求生：科学家的荒岛生存手册'
    }
  }
})
