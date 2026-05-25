import { getAllArticles, seedArticles } from '../utils/db'

// 种子数据（首次访问时自动写入 IndexedDB）
const seedData = [
  { id: 1, title: '露坠荷叶碎成星', content: '露坠荷叶碎成星，风过松林叠作鸣。蛛丝缠尽飞虫影，浮萍聚散总无名。', date: '2025-05-01' },
  { id: 2, title: '花开见佛佛非相', content: '花开见佛佛非相，叶落归尘尘是空。三千世界水中月，八万因缘镜里风。', date: '2025-05-03' },
  { id: 3, title: '执手时觉春衫暖', content: '执手时觉春衫暖，转身方知露华浓。百年不过檐前雨，滴落虚空第几重。', date: '2025-05-05' },
  { id: 4, title: '山色空蒙雨亦奇', content: '山色空蒙雨亦奇，水光潋滟晴方好。欲把西湖比西子，淡妆浓抹总相宜。', date: '2025-05-07' },
  { id: 5, title: '春风得意马蹄疾', content: '春风得意马蹄疾，一日看尽长安花。昔日龌龊不足夸，今朝放荡思无涯。', date: '2025-05-09' },
  { id: 6, title: '人生若只如初见', content: '人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。', date: '2025-05-11' },
  { id: 7, title: '曾经沧海难为水', content: '曾经沧海难为水，除却巫山不是云。取次花丛懒回顾，半缘修道半缘君。', date: '2025-05-13' },
  { id: 8, title: '问世间情为何物', content: '问世间情为何物，直教生死相许。天南地北双飞客，老翅几回寒暑。', date: '2025-05-15' },
  { id: 9, title: '众里寻他千百度', content: '众里寻他千百度，蓦然回首，那人却在灯火阑珊处。', date: '2025-05-17' },
  { id: 10, title: '但愿人长久', content: '但愿人长久，千里共婵娟。人有悲欢离合，月有阴晴圆缺。', date: '2025-05-19' },
  { id: 11, title: '明月几时有', content: '明月几时有，把酒问青天。不知天上宫阙，今夕是何年。', date: '2025-05-21' },
  { id: 12, title: '大江东去', content: '大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。', date: '2025-05-23' },
]

// 获取文章列表（从 IndexedDB 读取，客户端分页 + 筛选）
const getHomeList = async (page = 1, pageSize = 5, keyword = '', searchDate = '') => {
  try {
    // 首次访问时初始化种子数据
    await seedArticles(seedData)

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