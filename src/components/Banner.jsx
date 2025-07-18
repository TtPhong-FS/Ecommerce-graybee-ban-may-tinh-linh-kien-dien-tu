import { BannerFooter1, BannerMain, BannerMain1, BannerMain2, BannerRight1, BannerRight2, BannerRight3 } from '@/assets'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const subBanners = [
  {
    id: 1,
    images: BannerFooter1
  },
  {
    id: 2,
    images: BannerFooter1
  },
  { id: 3, images: BannerFooter1 },
  { id: 4, images: BannerFooter1 }
]

export function SubBanner() {
  return (
    <section className="hidden lg:flex gap-4 mb-8 px-2 mt-2">
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
        <Link className="max-w-[630px] max-h-[270px] row-span-7" to={'#'}>
          <img src={BannerMain} alt="" className="w-full h-full object-cover" />
        </Link>
        <div className="flex justify-between items-center row-span-4">
          <Link to={`/collections/${laptop?.categorySlug}`} className="max-w-[318px] w-full lg:h-[158px]">
            <img
              src={BannerMain1}
              alt="https://file.hstatic.net/200000722513/file/lp_gaming.png"
              className="h-full w-full object-cover"
            />
          </Link>
          <Link to={`/collections/${pc?.categorySlug}`} className="max-w-[318px] w-full lg:h-[158px]">
            <img
              src={BannerMain2}
              alt="https://file.hstatic.net/200000722513/file/lp_gearvn.png"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </div>
      <div className="col-span-4 lg:flex flex-col gap-1 hidden">
        <div className="row-span-2 h-[140px]">
          <img
            src={BannerRight3}
            alt="https://file.hstatic.net/200000722513/file/tcdm.png"
            className="h-[140px] w-full row-span-2 object-cover"
          />
        </div>
        <div className="row-span-2 h-[140px]">
          <img
            src={BannerRight1}
            alt="https://file.hstatic.net/200000722513/file/ph_m_c_.png"
            className="h-[140px] w-full row-span-2 object-cover"
          />
        </div>
        <div className="row-span-2 h-[140px]">
          <img
            src={BannerRight2}
            alt="https://file.hstatic.net/200000722513/file/pc.png"
            className="h-[140px] w-full row-span-2 object-cover"
          />
        </div>
      </div>
    </div>
  )
}
