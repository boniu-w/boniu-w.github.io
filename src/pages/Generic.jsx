import { Card, Typography, Image } from 'antd'
import { VideoCameraOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

function Generic() {
  return (
    <div className="generic-page">
      <div className="page-header">
        <Title level={2} className="page-title">我的视频</Title>
        <Text className="page-subtitle">记录生活，分享感动</Text>
      </div>

      <div className="video-content">
        <Card className="video-card">
          <div className="video-placeholder">
            <VideoCameraOutlined />
            <Text>视频内容区域</Text>
          </div>
        </Card>

        <Card className="intro-card">
          <Title level={4}>关于我的视频</Title>
          <Paragraph className="intro-text">
            这里是我的视频作品集，收录了我旅行、生活的点滴。
            每一个画面都是珍贵的回忆，每一个故事都值得被记录。
          </Paragraph>
          <Paragraph className="intro-text">
            拉萨不在拉萨，拉萨在路上。人生的旅程就像一部未完待续的电影，
            我们都是自己故事的主角。
          </Paragraph>
        </Card>
      </div>

      <style>{`
        .generic-page {
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
        .video-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .video-card {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
        .video-placeholder {
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          color: #666;
          font-size: 48px;
        }
        .intro-card {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
        .intro-card h4 {
          color: #fff !important;
          margin-bottom: 16px !important;
        }
        .intro-text {
          color: #ccc !important;
          line-height: 1.8 !important;
        }
      `}</style>
    </div>
  )
}

export default Generic
