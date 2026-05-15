function Album() {
  const images = [
    '/images/pic01.jpg', '/images/pic02.jpg', '/images/pic03.jpg',
    '/images/pic04.jpg', '/images/pic05.jpg', '/images/pic06.jpg',
    '/images/pic07.jpg', '/images/pic08.jpg', '/images/pic09.jpg',
  ]

  return (
    <div className="inner">
      <h1>我的相册</h1>
      {/* <span className="image main">
        <img
          src="/images/banner/云路.png"
          alt=""
          style={{
            width: '100%',
            aspectRatio: '21 / 9',
            objectFit: 'cover'
          }}
        />
      </span> */}
      <div className="box alt">
        <div className="row gtr-uniform">
          {images.map((src, index) => (
            <div key={index} className="col-4">
              <span className="image fit"><img src={src} alt="" /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Album
