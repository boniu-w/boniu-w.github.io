import { getAllArticles, syncFromJSON } from '../utils/db'

// JSON 文件路径（持久化数据源，IndexedDB 被清除后自动从此恢复）
const DATA_URL = '/data/articles.json'

// 获取文章列表（IndexedDB 缓存 + JSON 持久化备份）
const getHomeList = async (page = 1, pageSize = 5, keyword = '', searchDate = '') => {
  try {
    // IndexedDB 为空时，自动从 JSON 文件拉取并写入
    await syncFromJSON(DATA_URL)

    let articles = await getAllArticles()

    // 关键字筛选
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase()
      articles = articles.filter(
        a => a.title.toLowerCase().includes(lowerKeyword) || a.content.toLowerCase().includes(lowerKeyword)
      )
    }

    // 按月份筛选
    if (searchDate) {
      articles = articles.filter(a => a.date.startsWith(searchDate))
    }

    const total = articles.length
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return {
      list: articles.slice(start, end),
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  } catch (error) {
    console.error('获取文章列表失败:', error)
    throw error
  }
}

export default getHomeList