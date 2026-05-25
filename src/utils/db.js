import Dexie from 'dexie'

// 定义数据库
const db = new Dexie('boniuBlog')

// Schema：articles 表，id 为主键自增，date 上建索引
db.version(1).stores({
  articles: '++id, date'
})

// 添加单篇文章
const addArticle = (article) => db.articles.add(article)

// 批量导入
const addArticles = (articles) => db.articles.bulkAdd(articles)

// 获取所有文章
const getAllArticles = () => db.articles.toArray()

// 根据 ID 获取文章
const getArticleById = (id) => db.articles.get(Number(id))

// 根据日期范围获取文章
const getArticlesByDate = (datePrefix) =>
  db.articles
    .where('date')
    .between(datePrefix, datePrefix + '\uffff', true, true)
    .toArray()

// 获取文章总数
const getArticleCount = () => db.articles.count()

// 更新文章
const updateArticle = (article) => db.articles.put(article)

// 删除文章
const deleteArticle = (id) => db.articles.delete(Number(id))

// 检查是否已有数据
const isDataInitialized = async () => {
  const count = await getArticleCount()
  return count > 0
}

// 从 JSON 文件同步数据到 IndexedDB（仅在本地无数据时拉取）
const syncFromJSON = async (jsonUrl) => {
  if (await isDataInitialized()) return

  try {
    const response = await fetch(jsonUrl)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const articles = await response.json()
    await addArticles(articles)
  } catch (error) {
    console.error('从 JSON 同步数据失败:', error)
    throw error
  }
}

// 初始化种子数据（仅首次写入，保留兼容旧用法）
const seedArticles = async (articles) => {
  if (await isDataInitialized()) return
  await addArticles(articles)
}

export {
  addArticle,
  addArticles,
  getAllArticles,
  getArticleById,
  getArticlesByDate,
  getArticleCount,
  updateArticle,
  deleteArticle,
  syncFromJSON,
  seedArticles,
  isDataInitialized
}
