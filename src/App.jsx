import { Routes, Route } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import Layout from './components/Layout'
import Home from './pages/Home'
import Essay from './pages/Essay'
import Album from './pages/Album'
import Collection from './pages/Collection'
import Generic from './pages/Generic'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#4ecdc4',
          borderRadius: 8,
          colorBgContainer: 'rgba(255, 255, 255, 0.05)',
          colorBgElevated: 'rgba(30, 30, 40, 0.95)',
          colorText: '#e0e0e0',
          colorTextSecondary: '#a0a0a0',
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="essay" element={<Essay />} />
          <Route path="album" element={<Album />} />
          <Route path="collection" element={<Collection />} />
          <Route path="generic" element={<Generic />} />
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
