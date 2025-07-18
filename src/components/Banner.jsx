import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const subBanners = [
  {
    id: 1,
    images: 'https://file.hstatic.net/200000722513/file/loa.png'
  },
  {
    id: 2,
    images: 'https://file.hstatic.net/200000722513/file/m_n_h_nh_thang_06_edit.png'
  },
  { id: 3, images: 'https://file.hstatic.net/200000722513/file/chu_t.png' },
  { id: 4, images: 'https://file.hstatic.net/200000722513/file/pc_rx_6500xt.png' }
]

export function SubBanner() {
  return (
    <section className="hidden lg:flex gap-4 mb-8 px-2">
      {subBanners.map((sb) => (
        <div key={sb.id} className="w-1/4">
          <img src={sb.images} alt="" />
        </div>
      ))}
    </section>
  )
}

export function RightBanner() {
  const laptop = useSelector((state) => state.carousel.carousels['laptop'])
  const pc = useSelector((state) => state.carousel.carousels['pc_gaming'])

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 z-10 gap-2 p-2">
      <div className="col-span-8 grid grid-rows-12">
        <Link className="min-w-[630px] max-h-[270px] row-span-7" to={'#'}>
          <img
            src="https://file.hstatic.net/200000722513/file/thang_06_laptop_gaming_800x400_-_web_slider.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="flex justify-between items-center row-span-4">
          <Link to={`/collections/${laptop?.categorySlug}`} className="max-w-[318px] w-full h-[158px]">
            <img
              src="https://file.hstatic.net/200000722513/file/lp_gaming.png"
              alt="https://file.hstatic.net/200000722513/file/lp_gaming.png"
              className="h-full w-full object-cover"
            />
          </Link>
          <Link to={`/collections/${pc?.categorySlug}`} className="max-w-[318px] w-full h-[158px]">
            <img
              src="https://file.hstatic.net/200000722513/file/lp_gearvn.png"
              alt="https://file.hstatic.net/200000722513/file/lp_gearvn.png"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </div>
      <div className="col-span-4 lg:flex flex-col gap-1 hidden">
        <div className="row-span-2 h-[140px]">
          <img
            src="https://file.hstatic.net/200000722513/file/tcdm.png"
            alt="https://file.hstatic.net/200000722513/file/tcdm.png"
            className="h-[140px] w-full row-span-2 object-cover"
          />
        </div>
        <div className="row-span-2 h-[140px]">
          <img
            src="https://file.hstatic.net/200000722513/file/ph_m_c_.png"
            alt="https://file.hstatic.net/200000722513/file/ph_m_c_.png"
            className="h-[140px] w-full row-span-2 object-cover"
          />
        </div>
        <div className="row-span-2 h-[140px]">
          <img
            src="https://file.hstatic.net/200000722513/file/pc.png"
            alt="https://file.hstatic.net/200000722513/file/pc.png"
            className="h-[140px] w-full row-span-2 object-cover"
          />
        </div>
      </div>
    </div>
  )
}
