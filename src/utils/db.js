const DB_NAME = 'boniuBlog'
const DB_VERSION = 1

// 打开/初始化数据库
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('articles')) {
        const store = db.createObjectStore('articles', { keyPath: 'id', autoIncrement: true })
        store.createIndex('date', 'date', { unique: false })
      }
    }

    request.onsuccess = (event) => {
      resolve(event.target.result)
    }

    request.onerror = (event) => {
      reject(event.target.error)
    }
  })
}

// 添加单篇文章
const addArticle = async (article) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readwrite')
    const store = tx.objectStore('articles')
    const request = store.add(article)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 批量导入（用于初始化数据）
const addArticles = async (articles) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readwrite')
    const store = tx.objectStore('articles')
    articles.forEach(a => store.add(a))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// 获取所有文章
const getAllArticles = async () => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readonly')
    const store = tx.objectStore('articles')
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 根据 ID 获取文章
const getArticleById = async (id) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readonly')
    const store = tx.objectStore('articles')
    const request = store.get(Number(id))
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

// 根据日期范围获取文章
const getArticlesByDate = async (datePrefix) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readonly')
    const store = tx.objectStore('articles')
    const index = store.index('date')
    const range = IDBKeyRange.bound(datePrefix, datePrefix + '\uffff')
    const request = index.getAll(range)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 获取文章总数
const getArticleCount = async () => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readonly')
    const store = tx.objectStore('articles')
    const request = store.count()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 更新文章
const updateArticle = async (article) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readwrite')
    const store = tx.objectStore('articles')
    const request = store.put(article)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 删除文章
const deleteArticle = async (id) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('articles', 'readwrite')
    const store = tx.objectStore('articles')
    const request = store.delete(Number(id))
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// 检查数据库是否已初始化（是否有数据）
const isDataInitialized = async () => {
  const count = await getArticleCount()
  return count > 0
}

// 初始化种子数据
const seedArticles = async (articles) => {
  if (await isDataInitialized()) return
  await addArticles(articles)
}

export {
  openDB,
  addArticle,
  addArticles,
  getAllArticles,
  getArticleById,
  getArticlesByDate,
  getArticleCount,
  updateArticle,
  deleteArticle,
  seedArticles,
  isDataInitialized
}
