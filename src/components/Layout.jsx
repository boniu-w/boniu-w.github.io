import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.add('is-preload')
    return () => document.body.classList.remove('is-preload')
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.classList.toggle('is-menu-visible', !menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.classList.remove('is-menu-visible')
  }

  return (
    <div id="wrapper">
      <header id="header">
        <div className="inner">
          <Link to="/" className="logo">
            <span className="symbol"><img src="/images/logo.svg" alt="" /></span>
            <span className="title">公子求雨</span>
          </Link>
          <nav>
            <ul>
              <li><a href="#menu" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>Menu</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <nav id="menu" className={menuOpen ? 'visible' : ''}>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/essay" onClick={closeMenu}>我的文章</Link></li>
          <li><Link to="/album" onClick={closeMenu}>我的相册</Link></li>
          <li><Link to="/collection" onClick={closeMenu}>我的收藏</Link></li>
        </ul>
      </nav>

      <main id="main">
        <Outlet />
      </main>

      <footer id="footer">
        <div className="inner">
          <section>
            <h2>Get in touch</h2>
            <form method="post" action="#">
              <div className="fields">
                <div className="field half">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="field half">
                  <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div className="field">
                  <textarea name="message" id="message" placeholder="Message"></textarea>
                </div>
              </div>
              <ul className="actions">
                <li><input type="submit" value="Send" className="primary" /></li>
              </ul>
            </form>
          </section>
          <section>
            <h2>Follow</h2>
            <ul className="icons">
              <li><a href="#" className="icon brands style2 fa-twitter"><span className="label">Twitter</span></a></li>
              <li><a href="#" className="icon brands style2 fa-facebook-f"><span className="label">Facebook</span></a></li>
              <li><a href="#" className="icon brands style2 fa-instagram"><span className="label">Instagram</span></a></li>
              <li><a href="#" className="icon brands style2 fa-dribbble"><span className="label">Dribbble</span></a></li>
              <li><a href="#" className="icon brands style2 fa-github"><span className="label">GitHub</span></a></li>
              <li><a href="#" className="icon brands style2 fa-500px"><span className="label">500px</span></a></li>
              <li><a href="#" className="icon solid style2 fa-phone"><span className="label">Phone</span></a></li>
              <li><a href="#" className="icon solid style2 fa-envelope"><span className="label">Email</span></a></li>
            </ul>
          </section>
          <ul className="copyright">
            <li>&copy; Untitled. All rights reserved</li>
            <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Layout
