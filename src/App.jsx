import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Essay from './pages/Essay'
import Album from './pages/Album'
import Collection from './pages/Collection'
import Generic from './pages/Generic'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="essay" element={<Essay />} />
        <Route path="album" element={<Album />} />
        <Route path="collection" element={<Collection />} />
        <Route path="generic" element={<Generic />} />
      </Route>
    </Routes>
  )
}

export default App
