import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Drawer } from 'antd'
import { useState } from 'react'
import {
  HomeOutlined,
  ReadOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  StarOutlined,
  MenuOutlined
} from '@ant-design/icons'

const { Header, Content, Footer } = Layout

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
  { key: '/essay', icon: <ReadOutlined />, label: <Link to="/essay">我的文章</Link> },
  { key: '/album', icon: <PictureOutlined />, label: <Link to="/album">我的相册</Link> },
  { key: '/generic', icon: <VideoCameraOutlined />, label: <Link to="/generic">我的视频</Link> },
  { key: '/collection', icon: <StarOutlined />, label: <Link to="/collection">我的收藏</Link> },
]

function LayoutComponent() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  const selectedKey = menuItems.find(item => 
    location.pathname === item.key || 
    (item.key !== '/' && location.pathname.startsWith(item.key))
  )?.key || '/'

  const menuClick = ({ key }) => {
    setDrawerOpen(false)
  }

  return (
    <Layout className="ant-layout-custom">
      <Header className="header">
        <Link to="/" className="logo">
          <img src="/images/app_icon.ico" alt="logo" />
          <span>公子求雨</span>
        </Link>
        
        <div className="mobile-menu">
          <MenuOutlined onClick={() => setDrawerOpen(true)} />
        </div>
        
        <Menu
          className="desktop-menu"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={menuClick}
          theme="dark"
        />
      </Header>

      <Content className="content">
        <Outlet />
      </Content>

      <Footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 公子求雨. All rights reserved.</p>
          <p>拉萨不在拉萨, 拉萨在路上</p>
        </div>
      </Footer>

      <Drawer
        title="菜单"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={menuClick}
        />
      </Drawer>

      <style>{`
        .ant-layout-custom {
          min-height: 100vh;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          background: rgba(20, 20, 30, 0.9) !important;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          font-size: 1.2em;
          font-weight: bold;
          text-decoration: none;
        }
        .logo img {
          width: 32px;
          height: 32px;
        }
        .desktop-menu {
          background: transparent !important;
          border: none !important;
          flex: 1;
          justify-content: flex-end;
        }
        .mobile-menu {
          display: none;
          font-size: 24px;
          color: #fff;
          cursor: pointer;
        }
        .content {
          min-height: calc(100vh - 134px);
          padding: 24px;
          background: #14141e;
        }
        .footer {
          background: rgba(20, 20, 30, 0.95) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          color: #888;
        }
        .footer-content p {
          margin: 4px 0;
        }
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </Layout>
  )
}

export default LayoutComponent
