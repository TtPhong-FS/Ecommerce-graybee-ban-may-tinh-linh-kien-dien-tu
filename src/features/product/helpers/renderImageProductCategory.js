import {
  CpuLogo,
  DriveLogo,
  HeadphoneLogo,
  HeatsinkLogo,
  KeyboardLogo,
  LaptopLogo,
  LotchuotLogo,
  MainLogo,
  MonitorLogo,
  MouseLogo,
  PcLogo,
  PsuLogo,
  RamLogo,
  VgaLogo
} from '@/assets'

const imageMap = {
  laptop: LaptopLogo,
  'pc gaming': PcLogo,
  cpu: CpuLogo,
  'bàn phím': KeyboardLogo,
  'màn hình': MonitorLogo,
  'tai nghe': HeadphoneLogo,
  'bo mạch chủ': MainLogo,
  nguồn: PsuLogo,
  'tản nhiệt': HeatsinkLogo,
  'ổ cứng': DriveLogo,
  ram: RamLogo,
  chuột: MouseLogo,
  vga: VgaLogo,
  'lót chuột': LotchuotLogo
}

export function renderImageProductCategory(categoryName) {
  let imageCategory = ''

  const name = categoryName?.toLowerCase()

  imageCategory = imageMap[name]

  return imageCategory
}
