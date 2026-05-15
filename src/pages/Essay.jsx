function Essay() {
  return (
    <div className="inner">
      <h1>我的文章</h1>
      <span className="image main">
        <img
          src="/images/banner/雕塑2.png"
          alt=""
          style={{
            width: '100%',
            aspectRatio: '21 / 9',
            objectFit: 'cover'
          }}
        />
      </span>
      <p>这里是文章列表页面...</p>
      <p>露坠荷叶碎成星，风过松林叠作鸣。蛛丝缠尽飞虫影，浮萍聚散总无名。</p>
      <p>花开见佛佛非相，叶落归尘尘是空。三千世界水中月，八万因缘镜里风。</p>
    </div>
  )
}

export default Essay
