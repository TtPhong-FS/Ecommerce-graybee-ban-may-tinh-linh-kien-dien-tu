import { Link } from 'react-router-dom'

function Promotions() {
  const promotions = [
    {
      title: 'NÂNG CẤP PC',
      description: 'Tiết kiệm đến 1.800.000đ',
      imageUrl: 'https://file.hstatic.net/200000722513/file/thang_03_thu_cu_doi_moi_banner_web_slider_800x400.jpg'
    },
    {
      title: 'Mua Microsoft 365',
      description: 'Giảm 100.000đ',
      subtext: 'Giá chỉ từ 20.000đ/tháng',
      imageUrl: 'https://file.hstatic.net/200000722513/file/gearvn-microsoft-365_2aa8dbe17b0941e180f6da14132d6a27.png'
    },
    {
      title: 'GÓC NHÌN DEAL XỊN',
      description: 'Giảm 53% / từ 1.590k',
      imageUrl: 'https://file.hstatic.net/200000722513/file/man_hinh_thang_04_banner_web_slider_800x400.jpg'
    },
    {
      title: 'LAP XỊN GIÁ RẺ - CHIẾN MÙA HÈ',
      description: '',
      imageUrl: 'https://file.hstatic.net/200000722513/file/thang_04_van_phong_banner_web_slider_800x400.jpg'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h5 className="font-bold text-gray-800 uppercase">Chuyên trang khuyến mãi</h5>
        <Link to={'#'} className="ml-auto link mr-4 max-md:text-sm">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 bg-white"
          >
            <img src={promo.imageUrl} alt={promo.title} className="w-full h-36 object-cover md:h-32 lg:h-40" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{promo.title}</h3>
              {promo.description && <p className="text-sm text-gray-600 mb-1">{promo.description}</p>}
              {promo.subtext && <p className="text-xs text-gray-500">{promo.subtext}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Promotions
