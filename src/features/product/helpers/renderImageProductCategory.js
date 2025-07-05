const imageMap = {
  laptop: 'https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png',
  'pc gaming': 'https://file.hstatic.net/200000636033/file/icon3_5c59c1dc52ec4b81a94a3edba293e895.png',
  cpu: 'https://file.hstatic.net/200000636033/file/icon6_056974287cd84e0d82eac05809b7e5d5.png',
  'bàn phím': 'https://file.hstatic.net/200000722513/file/ban_phim_93a4d3cefd8345dfac23829818a3c5d4.jpg',
  'màn hình':
    'https://product.hstatic.net/200000722513/product/asus_pg27aqdm_gearvn_53c46bd0ca1f40f1a7abfb0246800081_e341bb95b0724bee845ba8f093678245_master.jpg',
  'tai nghe': 'https://file.hstatic.net/200000722513/file/tai_nghe_ed3b4f52172f40929e1d3ab493099b73.jpg',
  'bo mạch chủ': 'https://file.hstatic.net/200000636033/file/icon5_71200675c9e64c32a11730486ba04b32.png',
  nguồn: 'https://file.hstatic.net/200000636033/file/icon9_ffd172460eb24c4d8bab6a7cd9a8cc46.png',
  'tản nhiệt': 'https://file.hstatic.net/200000636033/file/icon8_8f7b3fe2e8fb450b805857be9bb14edc.png',
  'ổ cứng': 'https://file.hstatic.net/200000636033/file/icon11_2f0ea4c77ae3482f906591cec8f24cea.png',
  ram: 'https://file.hstatic.net/200000636033/file/icon13_708c31c3ba56430dbec3f4cc7e1b14f0.png',
  chuột: 'https://file.hstatic.net/200000722513/file/chuot_aa348bf0177b4795a39ab66d51e62ed7.jpg',
  vga: 'https://file.hstatic.net/200000722513/file/asus-rog-strix-rtx4090-o24g-gaming-03_c948a4c2a9cf4adcbd522319bfcd4846.jpg',
  'lót chuột': 'https://res.cloudinary.com/dqntp2s9q/image/upload/ojospao2uzmaqr4klg0v.png'
}

export function renderImageProductCategory(categoryName) {
  let imageCategory = 'https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png'

  const name = categoryName?.toLowerCase()

  imageCategory = imageMap[name]

  return imageCategory
}
