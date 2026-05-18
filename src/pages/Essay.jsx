import { useState, useEffect } from 'react'

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
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      const articleList = document.querySelector('.article-list')
      if (articleList) {
        articleList.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <div className="inner essay-page">
      <header className="page-header">
        <h1 style={{
          backgroundImage: 'url("/images/banner/雕塑.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>我的文章</h1>
      </header>

      <div className="search-box">
        <div className="search-inner">
          <img src="/images/日期.svg" alt="日历" className="date-icon" />
          <input
            type="month"
            value={searchDate}
            onChange={(e) => { setSearchDate(e.target.value); setCurrentPage(1); }}
          />
          {searchDate && (
            <button className="clear-btn" onClick={() => { setSearchDate(''); setCurrentPage(1); }}>
              ✕
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <span>加载中...</span>
        </div>
      ) : (
        <>
          <div className="article-list">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <article key={article.id} className="article-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-index">{String(index + 1 + (currentPage - 1) * 5).padStart(2, '0')}</div>
                  <div className="card-content">
                    <div className="card-header">
                      <h2>{article.title}</h2>
                      <a href={`/article/${article.id}`} className="read-link">
                        <span>阅读全文</span>
                        <i>→</i>
                      </a>
                    </div>
                    <p className="card-text">{article.content}</p>
                    <div className="card-footer">
                      <span className="card-date">📆 {article.date}</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <span className="empty-icon">📝</span>
                <p>暂无文章</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <nav className="pagination">
              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ◀ 上一页
              </button>
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`page-num ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页 ▶
              </button>
            </nav>
          )}
        </>
      )}

      <style>{`
        .essay-page {
          min-height: 80vh;
        }

        .page-header {
          text-align: center;
          padding: 50px 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border-radius: 12px;
          margin-bottom: 30px;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .page-header h1 {
          font-size: 2.2em;
          color: #32c9c9;
          margin: 0 0 10px;
        }
        .page-header p {
          color: #a8a8a8;
          font-size: 1.1em;
          margin: 0;
        }

        .search-box {
          display: flex;
          justify-content: center;
          padding: 20px;
          margin-bottom: 40px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
        }
        .search-inner {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 30px;
          padding: 8px 20px;
          transition: all 0.3s ease;
        }
        .search-inner:focus-within {
          border-color: #4ecdc4;
          background: rgba(78,205,196,0.1);
          box-shadow: 0 0 20px rgba(78,205,196,0.2);
        }
        .search-inner .date-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          opacity: 0.8;
        }
        .search-inner input {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1em;
          outline: none;
          min-width: 150px;
        }
        .search-inner input::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
          opacity: 0.7;
        }
        .search-inner .clear-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          margin-left: 12px;
          font-size: 0.8em;
          transition: all 0.2s;
        }
        .search-inner .clear-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .article-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 25px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
        }
        .article-card {
          display: flex;
          gap: 20px;
          padding: 25px;
          background: rgba(11, 92, 92, 0.73);
          border: 1px solid rgba(54, 36, 36, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease-out both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .article-card:hover {
          background: rgba(211, 46, 82, 0.64);
          border-color: rgba(30, 107, 102, 0.49);
          transform: translateX(5px);
        }
        .card-index {
          flex-shrink: 0;
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #4ecdc4, #45b7aa);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1em;
          color: #fff;
        }
        .card-content {
          flex: 1;
          min-width: 0;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 12px;
        }
        .card-header h2 {
          color: #ffffff;
          font-size: 1.3em;
          margin: 0;
          line-height: 1.4;
        }
        .read-link {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 14px;
          background: linear-gradient(135deg, #4ecdc4, #45b7aa);
          color: #fff;
          text-decoration: none;
          border-radius: 20px;
          font-size: 0.85em;
          transition: all 0.2s ease;
        }
        .read-link:hover {
          transform: translateX(3px);
          box-shadow: 0 4px 15px rgba(78,205,196,0.4);
        }
        .read-link i {
          font-style: normal;
          transition: transform 0.2s;
        }
        .read-link:hover i {
          transform: translateX(3px);
        }
        .card-text {
          color: #d0d0d0;
          font-size: 0.95em;
          line-height: 1.8;
          margin: 0 0 15px;
        }
        .card-footer {
          display: flex;
          align-items: center;
        }
        .card-date {
          color: #888;
          font-size: 0.85em;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          color: #888;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: #4ecdc4;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 15px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #666;
        }
        .empty-icon {
          font-size: 3em;
          display: block;
          margin-bottom: 15px;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin: 50px 0;
          flex-wrap: wrap;
        }
        .page-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #e0e0e0;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95em;
          line-height: 1;
        }
        .page-btn:hover:not(:disabled) {
          background: rgba(78,205,196,0.2);
          border-color: #4ecdc4;
          color: #fff;
        }
        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .page-numbers {
          display: flex;
          gap: 8px;
        }
        .page-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #b0b0b0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95em;
          line-height: 1;
        }
        .page-num:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
        .page-num.active {
          background: linear-gradient(135deg, #4ecdc4, #45b7aa);
          border-color: transparent;
          color: #fff;
        }

        @media (max-width: 600px) {
          .article-card {
            flex-direction: column;
            gap: 15px;
          }
          .card-index {
            width: 36px;
            height: 36px;
            font-size: 0.95em;
          }
          .card-header {
            flex-direction: column;
            gap: 10px;
          }
          .read-link {
            align-self: flex-start;
          }
          .page-numbers {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Essay
