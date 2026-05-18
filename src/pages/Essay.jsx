import { useState, useEffect } from 'react'
import { Card, Input, Button, Pagination, Spin, Empty, Typography, Row, Col } from 'antd'

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

const fetchArticles = async (page = 1, pageSize = 5, searchDate = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockArticles
      if (searchDate) {
        filtered = mockArticles.filter(a => a.date.startsWith(searchDate))
      }
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve({
        list: filtered.slice(start, end),
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize)
      })
    }, 300)
  })
}

function Essay() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchDate, setSearchDate] = useState('')

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      try {
        const data = await fetchArticles(currentPage, 5, searchDate)
        setArticles(data.list)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('获取文章列表失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [currentPage, searchDate])

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
        <Input.Search
          type="month"
          placeholder="选择月份筛选"
          value={searchDate}
          onChange={(e) => { setSearchDate(e.target.value); setCurrentPage(1); }}
          allowClear
          onClear={() => { setSearchDate(''); setCurrentPage(1); }}
          style={{ width: 220 }}
        />
      </div>

      <div className="essay-content">
        {loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {articles.length > 0 ? (
              <Row gutter={[16, 16]}>
                {articles.map((article, index) => (
                  <Col xs={24} key={article.id}>
                    <Card className="article-card" hoverable>
                      <div className="card-index">{String(index + 1 + (currentPage - 1) * 5).padStart(2, '0')}</div>
                      <div className="card-body">
                        <div className="card-header">
                          <Title level={4}>{article.title}</Title>
                          <Button type="link" href={`/article/${article.id}`}>
                            阅读全文 →
                          </Button>
                        </div>
                        <Text className="card-text">{article.content}</Text>
                        <div className="card-footer">
                          <Text className="card-date">📆 {article.date}</Text>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty description="暂无文章" />
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
          max-width: 900px;
          margin: 0 auto;
        }
        .page-header {
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .page-title {
          color: #4ecdc4 !important;
          margin-bottom: 8px !important;
        }
        .page-subtitle {
          color: #888 !important;
        }
        .search-box {
          display: flex;
          justify-content: center;
          padding: 20px;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          margin-bottom: 24px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .essay-content {
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .article-card {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          display: flex;
          gap: 20px;
          transition: all 0.3s ease;
        }
        .article-card:hover {
          border-color: rgba(78, 205, 196, 0.4) !important;
        }
        .card-index {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #4ecdc4, #45b7aa);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2em;
          color: #fff;
        }
        .card-body {
          flex: 1;
          min-width: 0;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 8px;
        }
        .card-header h4 {
          color: #fff !important;
          margin: 0 !important;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .card-header .ant-btn-link {
          flex-shrink: 0;
          padding: 0;
          height: auto;
          white-space: nowrap;
        }
        .card-text {
          color: #d0d0d0 !important;
          display: block;
          line-height: 1.8;
          margin-bottom: 12px;
        }
        .card-date {
          color: #888 !important;
        }
        .loading {
          display: flex;
          justify-content: center;
          padding: 60px;
        }
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }
        @media (max-width: 600px) {
          .article-card {
            flex-direction: column;
          }
          .card-index {
            width: 40px;
            height: 40px;
            font-size: 1em;
          }
        }
      `}</style>
    </div>
  )
}

export default Essay
