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
    <div className="flex gap-4">
      {subBanners.map((sb) => (
        <div key={sb.id} className="w-1/4">
          <img src={sb.images} alt="" />
        </div>
      ))}
    </div>
  )
}

export function RightBanner() {
  const laptop = useSelector((state) => state.carousel.carousels['laptop'])
  const pc = useSelector((state) => state.carousel.carousels['pc_gaming'])

  return (
    <div className="flex gap-4 p-2">
      <div>
        <Link to={'#'}>
          <img
            src="https://file.hstatic.net/200000722513/file/thang_06_laptop_gaming_800x400_-_web_slider.jpg"
            alt=""
            className="w-xl"
          />
        </Link>
        <div className="flex">
          <Link to={`/collections/${laptop?.categorySlug}`} className="w-1/2">
            <img src="https://file.hstatic.net/200000722513/file/lp_gaming.png" alt="" />
          </Link>
          <Link to={`/collections/${pc?.categorySlug}`} className="w-1/2">
            <img src="https://file.hstatic.net/200000722513/file/lp_gearvn.png" alt="" />
          </Link>
        </div>
      </div>
      <div className="w-1/4 max-md:hidden">
        <Link>
          <img src="https://file.hstatic.net/200000722513/file/tcdm.png" alt="" />
        </Link>

        <Link>
          <img src="https://file.hstatic.net/200000722513/file/ph_m_c_.png" alt="" />
        </Link>

        <Link>
          <img src="https://file.hstatic.net/200000722513/file/pc.png" alt="" />
        </Link>
      </div>
    </div>
  )
}
