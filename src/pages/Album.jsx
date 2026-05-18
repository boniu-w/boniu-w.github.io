import { Row, Col, Image, Typography } from 'antd'

const { Title, Text } = Typography

const images = [
  '/images/pic01.jpg', '/images/pic02.jpg', '/images/pic03.jpg',
  '/images/pic04.jpg', '/images/pic05.jpg', '/images/pic06.jpg',
  '/images/pic07.jpg', '/images/pic08.jpg', '/images/pic09.jpg',
]

function Album() {
  return (
    <div className="album-page">
      <div className="page-header">
        <Title level={2} className="page-title">我的相册</Title>
        <Text className="page-subtitle">记录生活的美好瞬间</Text>
      </div>

      <div className="gallery">
        <Row gutter={[16, 16]}>
          {images.map((src, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <div className="image-wrapper">
                <Image
                  src={src}
                  alt={`图片 ${index + 1}`}
                  className="gallery-image"
                  placeholder={
                    <div className="placeholder">加载中...</div>
                  }
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .album-page {
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
        .gallery {
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .image-wrapper {
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .image-wrapper:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 30px rgba(78, 205, 196, 0.2);
        }
        .gallery-image {
          display: block;
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }
        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          background: rgba(255,255,255,0.05);
          color: #666;
        }
      `}</style>
    </div>
  )
}

export default Album
