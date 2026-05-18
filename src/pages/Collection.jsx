import { Card, Row, Col, Typography, Image } from 'antd'
import { StarOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const collections = [
  { id: 1, title: '诗集精选', desc: '浮萍聚散总无名', image: '/images/pic13.jpg' },
  { id: 2, title: '旅行记忆', desc: '百年不过檐前雨', image: '/images/pic01.jpg' },
  { id: 3, title: '读书笔记', desc: '滴落虚空第几重', image: '/images/pic02.jpg' },
  { id: 4, title: '摄影作品', desc: '镜里观花水月间', image: '/images/pic03.jpg' },
]

function Collection() {
  return (
    <div className="collection-page">
      <div className="page-header">
        <Title level={2} className="page-title">我的收藏</Title>
        <Text className="page-subtitle">珍藏每一份美好</Text>
      </div>

      <Row gutter={[24, 24]}>
        {collections.map((item) => (
          <Col xs={24} sm={12} md={6} key={item.id}>
            <Card
              className="collection-card"
              cover={
                <div className="card-cover">
                  <Image src={item.image} alt={item.title} preview={false} />
                </div>
              }
              hoverable
            >
              <Card.Meta
                title={<Title level={5}>{item.title}</Title>}
                description={<Text className="card-desc">{item.desc}</Text>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <style>{`
        .collection-page {
          max-width: 1200px;
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
        .collection-card {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          transition: all 0.3s ease;
        }
        .collection-card:hover {
          transform: translateY(-8px);
          border-color: rgba(78, 205, 196, 0.4) !important;
        }
        .card-cover {
          height: 150px;
          overflow: hidden;
        }
        .card-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .collection-card .ant-card-body {
          padding: 16px !important;
        }
        .collection-card .ant-card-meta-title {
          color: #fff !important;
          text-align: center;
        }
        .card-desc {
          color: #aaa !important;
          text-align: center;
          display: block;
        }
      `}</style>
    </div>
  )
}

export default Collection
