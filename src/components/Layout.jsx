import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  // 处理菜单切换逻辑，同步状态到 body 以触发 CSS 动画
  const toggleMenu = () => {
    const nextState = !menuOpen
    setMenuOpen(nextState)
    document.body.classList.toggle('is-menu-visible', nextState)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.classList.remove('is-menu-visible')
  }

  // Escape 键关闭菜单
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <>
      <div id="wrapper">
        <header id="header">
          <div className="inner">
            <Link to="/" className="logo">
              <span className="symbol"><img src="/images/app_icon.ico" alt="" /></span>
              <span className="title">公子求雨</span>
            </Link>
            <nav>
              <ul>
                <li>
                  <a 
                    href="#menu" 
                    onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                  >
                    Menu
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main id="main">
          <Outlet />
        </main>

        <footer id="footer">
          <div className="inner">
            <section>
              <h2>Get in touch</h2>
              <form method="post" action="#">
                <div className="fields">
                  <div className="field half"><input type="text" name="name" id="name" placeholder="Name" /></div>
                  <div className="field half"><input type="email" name="email" id="email" placeholder="Email" /></div>
                  <div className="field"><textarea name="message" id="message" placeholder="Message"></textarea></div>
                </div>
                <ul className="actions">
                  <li><input type="submit" value="Send" className="primary" /></li>
                </ul>
              </form>
            </section>
            <section>
              <h2>Follow</h2>
              <ul className="icons">
                {/* 你的图标列表 */}
              </ul>
            </section>
            <ul className="copyright">
              <li>&copy; Untitled. All rights reserved</li>
              <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </div>
        </footer>
      </div>

      {/* 1. 点击遮罩层：只有当菜单打开时才渲染 */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999, // 确保它在 wrapper 之上，但在 menu 之下
            cursor: 'pointer'
          }}
        />
      )}

      {/* 必须放在 wrapper 外部，匹配 CSS 预期结构 */}
      <nav id="menu" className={menuOpen ? 'visible' : ''} style={{ zIndex: 10000 }}>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/essay" onClick={closeMenu}>我的文章</Link></li>
          <li><Link to="/album" onClick={closeMenu}>我的相册</Link></li>
          <li><Link to="/generic" onClick={closeMenu}>我的视频</Link></li>
          <li><Link to="/collection" onClick={closeMenu}>我的收藏</Link></li>
        </ul>
        {/* 必须包含 .close 类名，否则 CSS 动画无法触发关闭 */}
        <a className="close" onClick={closeMenu} style={{ cursor: 'pointer' }}>Close</a>
      </nav>
    </>
  )
}

export default Layout