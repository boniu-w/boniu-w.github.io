import { useState, useEffect } from 'react'
import { Card, Input, Button, Pagination, Spin, Empty, Typography, Row, Col, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'

const { Title, Text } = Typography

const mockArticles = [
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

const fetchArticles = async (page = 1, pageSize = 5, keyword = '', searchDate = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockArticles
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase()
        filtered = filtered.filter(
          a => a.title.toLowerCase().includes(lowerKeyword) || a.content.toLowerCase().includes(lowerKeyword)
        )
      }
      if (searchDate) {
        filtered = filtered.filter(a => a.date.startsWith(searchDate))
      }
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve({
        list: filtered.slice(start, end),
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize)
      })
    }, 200)
  })
}

function Essay() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [searchDate, setSearchDate] = useState('')

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      try {
        const data = await fetchArticles(currentPage, 5, keyword, searchDate)
        setArticles(data.list)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('获取文章列表失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [currentPage, keyword, searchDate])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    document.querySelector('.essay-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="essay-page">
      <div className="page-header">
        <Title level={2} className="page-title">我的文章</Title>
        <Text className="page-subtitle">以文会友，以诗言志</Text>
      </div>

      <div className="search-box">
        <Space className="search-space" size="middle">
          <Input.Search
            placeholder="输入标题或内容关键字"
            allowClear
            enterButton
            onSearch={(value) => { setKeyword(value); setCurrentPage(1); }}
            style={{ width: 300 }}
          />
          <DatePicker
            picker="month"
            placeholder="按月份筛选"
            value={searchDate ? dayjs(searchDate, 'YYYY-MM') : null}
            onChange={(date, dateString) => { 
              setSearchDate(dateString || ''); 
              setCurrentPage(1); 
            }}
            style={{ width: 160 }}
          />
        </Space>
      </div>

      <div className="essay-content">
        {loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {articles.length > 0 ? (
              <Row gutter={[0, 16]}> {/* 消除左右间隙，统一上下间距 */}
                {articles.map((article, index) => (
                  <Col span={24} key={article.id}>
                    <Card className="article-card" hoverable>
                      <div className="card-wrapper">
                        {/* 序号：改为雅致的边框刻度感 */}
                        <div className="card-index">
                          {String(index + 1 + (currentPage - 1) * 5).padStart(2, '0')}
                        </div>
                        
                        {/* 右侧核心内容区 */}
                        <div className="card-body">
                          <div className="card-header">
                            <Title level={4} className="article-title">{article.title}</Title>
                            <Button type="link" href={`/article/${article.id}`} className="read-more-btn">
                              阅读全文 →
                            </Button>
                          </div>
                          
                          {/* 文本内容：单行截断，保持高度严整 */}
                          <div className="card-text-container">
                            <Text className="card-text">{article.content}</Text>
                          </div>
                          
                          {/* 底部信息：绝对吸底对齐 */}
                          <div className="card-footer">
                            <Text className="card-date">📆 {article.date}</Text>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty description="暂无匹配文章" style={{ padding: '40px 0' }} />
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <Pagination
                  current={currentPage}
                  total={totalPages * 5}
                  pageSize={5}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .essay-page {
          max-width: 840px;
          margin: 0 auto;
          padding: 20px;
        }
        .page-header {
          text-align: center;
          padding: 32px 0;
          margin-bottom: 24px;
        }
        .page-title {
          color: #4ecdc4 !important;
          margin-bottom: 8px !important;
          font-weight: 600 !important;
          letter-spacing: 1px;
        }
        .page-subtitle {
          color: #666 !important;
          font-size: 14px;
        }
        .search-box {
          display: flex;
          justify-content: flex-start; /* 靠左对齐，更有大厂后台的规整感 */
          padding: 16px 24px;
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .essay-content {
          background: transparent; /* 移除外层大背景包裹，直接用卡片排列更清爽 */
          padding: 0;
        }
        
        /* 卡片严整性重构 */
        .article-card {
          background: rgba(255,255,255,0.03) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 8px !important;
          transition: all 0.25s ease;
        }
        .article-card :global(.ant-card-body) {
          padding: 24px !important;
        }
        .article-card:hover {
          border-color: rgba(78, 205, 196, 0.4) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        
        /* 内层两栏 Flex */
        .card-wrapper {
          display: flex;
          align-items: stretch; /* 让序号与右侧内容等高 */
          gap: 24px;
          width: 100%;
        }
        
        /* 序号样式扁平规整化 */
        .card-index {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(78, 205, 196, 0.3);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: monospace;
          font-weight: 600;
          font-size: 1.1em;
          color: #4ecdc4;
          background: rgba(78, 205, 196, 0.05);
        }
        
        /* 内容区标准三轴对齐 */
        .card-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* 撑开上下空间 */
        }
        
        /* 头部：标题与按钮分立两侧 */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          gap: 16px;
        }
        .article-title {
          color: #f0f0f0 !important;
          margin: 0 !important;
          font-size: 16px !important;
          font-weight: 500 !important;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .read-more-btn {
          color: #4ecdc4 !important;
          font-size: 13px;
          padding: 0 !important;
          height: auto !important;
          flex-shrink: 0;
        }
        .read-more-btn:hover {
          color: #45b7aa !important;
        }
        
        /* 内容体：单行省略截断，消灭高度落差 */
        .card-text-container {
          margin-bottom: 14px;
        }
        .card-text {
          color: #aaa !important;
          font-size: 14px;
          line-height: 1.6;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; /* 限制单行，如需两行可改为 -webkit-line-clamp */
        }
        
        /* 尾部：严格吸底 */
        .card-footer {
          display: flex;
          align-items: center;
          margin-top: auto; /* 核心：将其推至盒子最底部 */
        }
        .card-date {
          color: #555 !important;
          font-size: 12px;
        }
        
        .loading {
          display: flex;
          justify-content: center;
          padding: 80px 0;
        }
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          padding: 16px 0;
        }
        
        /* 移动端响应式平滑回退 */
        @media (max-width: 600px) {
          .search-box {
            padding: 12px;
          }
          .search-space {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }
          .search-space > .ant-space-item {
            width: 100% !important;
          }
          .search-space .ant-input-search, 
          .search-space .ant-picker {
            width: 100% !important;
          }
          .card-wrapper {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          .card-index {
            width: 36px;
            height: 24px;
            font-size: 0.9em;
          }
          .card-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
          }
          .read-more-btn {
            margin-top: 2px;
          }
        }
      `}</style>
    </div>
  )
}

export default Essay