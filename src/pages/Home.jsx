import { Link } from 'react-router-dom'

const tiles = [
  { style: 'style1', image: '/images/pic01.jpg', title: '我的文章', desc: '露坠荷叶碎成星', link: '/essay' },
  { style: 'style2', image: '/images/pic02.jpg', title: '我的相册', desc: '风过松林叠作鸣', link: '/album' },
  { style: 'style3', image: '/images/pic03.jpg', title: '我的视频', desc: '蛛丝缠尽飞虫影', link: '/generic' },
  { style: 'style4', image: '/images/pic04.jpg', title: '我的收藏', desc: '浮萍聚散总无名', link: '/collection' },
  { style: 'style5', image: '/images/pic05.jpg', title: 'Aliquam', desc: '花开见佛佛非相', link: '/generic' },
  { style: 'style6', image: '/images/pic06.jpg', title: 'Veroeros', desc: '叶落归尘尘是空', link: '/generic' },
  { style: 'style2', image: '/images/pic07.jpg', title: 'Ipsum', desc: '三千世界水中月', link: '/generic' },
  { style: 'style3', image: '/images/pic08.jpg', title: 'Dolor', desc: '八万因缘镜里风', link: '/generic' },
  { style: 'style1', image: '/images/pic09.jpg', title: 'Nullam', desc: '执手时觉春衫暖', link: '/generic' },
  { style: 'style5', image: '/images/pic10.jpg', title: 'Ultricies', desc: '转身方知露华浓', link: '/generic' },
  { style: 'style6', image: '/images/pic11.jpg', title: 'Dictum', desc: '百年不过檐前雨', link: '/generic' },
  { style: 'style4', image: '/images/pic12.jpg', title: 'Pretium', desc: '滴落虚空第几重', link: '/generic' },
]

function Home() {
  return (
    <div className="inner">
      <header>
        <h1>
          欢迎来到 公子求雨 的个人站点<br />
          enjoy yourself
        </h1>
        <p>
          拉萨不在拉萨, 拉萨在路上 - Lhasa is not in Lhasa, Lhasa is on the way
        </p>
      </header>
      <section className="tiles">
        {tiles.map((tile, index) => (
          <article key={index} className={tile.style}>
            <span className="image">
              <img src={tile.image} alt="" />
            </span>
            <Link to={tile.link}>
              <h2>{tile.title}</h2>
              <div className="content">
                <p>{tile.desc}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Home
