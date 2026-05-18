import { Link } from 'react-router-dom'
import { Card, Row, Col, Typography } from 'antd'
import {
  ReadOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  StarOutlined,
  HomeOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography

const tiles = [
  { 
    key: 'essay', 
    icon: <ReadOutlined />, 
    title: '我的文章', 
    desc: '露坠荷叶碎成星', 
    link: '/essay',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  { 
    key: 'album', 
    icon: <PictureOutlined />, 
    title: '我的相册', 
    desc: '风过松林叠作鸣', 
    link: '/album',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  { 
    key: 'video', 
    icon: <VideoCameraOutlined />, 
    title: '我的视频', 
    desc: '蛛丝缠尽飞虫影', 
    link: '/generic',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  { 
    key: 'collection', 
    icon: <StarOutlined />, 
    title: '我的收藏', 
    desc: '浮萍聚散总无名', 
    link: '/collection',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
]

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            欢迎来到 <span className="highlight">公子求雨</span> 的个人站点
          </Title>
          <Text className="hero-subtitle">
            拉萨不在拉萨, 拉萨在路上
          </Text>
          <div className="hero-tagline">
            Lhasa is not in Lhasa, Lhasa is on the way
          </div>
        </div>
      </div>

      <Row gutter={[24, 24]} className="tiles-grid">
        {tiles.map((tile) => (
          <Col xs={24} sm={12} key={tile.key}>
            <Link to={tile.link}>
              <Card
                className="tile-card"
                cover={
                  <div 
                    className="card-cover"
                    style={{ background: tile.gradient }}
                  >
                    <div className="card-icon">{tile.icon}</div>
                  </div>
                }
                hoverable
              >
                <Card.Meta
                  title={<Title level={4}>{tile.title}</Title>}
                  description={
                    <Text className="card-desc">{tile.desc}</Text>
                  }
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <style>{`
        .home-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-section {
          text-align: center;
          padding: 60px 20px;
          margin-bottom: 40px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .hero-title {
          color: #fff !important;
          font-size: 2.5em !important;
          margin-bottom: 16px !important;
        }
        .hero-title .highlight {
          color: #4ecdc4;
        }
        .hero-subtitle {
          color: #ccc !important;
          font-size: 1.2em !important;
          display: block;
          margin-bottom: 8px;
        }
        .hero-tagline {
          color: #888;
          font-size: 1em;
        }
        .tiles-grid {
          margin-top: 40px;
        }
        .tile-card {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .tile-card:hover {
          transform: translateY(-8px);
          border-color: rgba(78, 205, 196, 0.5) !important;
          box-shadow: 0 12px 40px rgba(78, 205, 196, 0.2);
        }
        .card-cover {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .card-icon {
          font-size: 64px;
          color: rgba(255,255,255,0.9);
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }
        .tile-card .ant-card-body {
          padding: 20px !important;
        }
        .tile-card .ant-card-meta-title {
          color: #fff !important;
          text-align: center;
          margin-bottom: 8px !important;
        }
        .card-desc {
          color: #aaa !important;
          text-align: center;
          display: block;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 1.8em !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
