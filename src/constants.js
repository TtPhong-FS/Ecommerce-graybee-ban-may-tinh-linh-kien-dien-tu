import { subYears } from 'date-fns'
import { Headset, Heart, LogOut, MapPin, MapPinHouse, Scroll, ScrollText, ShoppingCart, User } from 'lucide-react'

export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phone: /^[0-9]+$/
}

export const todayMinus18 = subYears(new Date(), 18)

export const days = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '26', label: '26' },
  { value: '27', label: '27' },
  { value: '28', label: '28' },
  { value: '29', label: '29' },
  { value: '30', label: '30' },
  { value: '31', label: '31' }
]

export const months = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' }
]

export const years = [
  { value: '1950', label: '1950' },
  { value: '1951', label: '1951' },
  { value: '1952', label: '1952' },
  { value: '1953', label: '1953' },
  { value: '1954', label: '1954' },
  { value: '1955', label: '1955' },
  { value: '1956', label: '1956' },
  { value: '1957', label: '1957' },
  { value: '1958', label: '1958' },
  { value: '1959', label: '1959' },
  { value: '1960', label: '1960' },
  { value: '1961', label: '1961' },
  { value: '1962', label: '1962' },
  { value: '1963', label: '1963' },
  { value: '1964', label: '1964' },
  { value: '1965', label: '1965' },
  { value: '1966', label: '1966' },
  { value: '1967', label: '1967' },
  { value: '1968', label: '1968' },
  { value: '1969', label: '1969' },
  { value: '1970', label: '1970' },
  { value: '1971', label: '1971' },
  { value: '1972', label: '1972' },
  { value: '1973', label: '1973' },
  { value: '1974', label: '1974' },
  { value: '1975', label: '1975' },
  { value: '1976', label: '1976' },
  { value: '1977', label: '1977' },
  { value: '1978', label: '1978' },
  { value: '1979', label: '1979' },
  { value: '1980', label: '1980' },
  { value: '1981', label: '1981' },
  { value: '1982', label: '1982' },
  { value: '1983', label: '1983' },
  { value: '1984', label: '1984' },
  { value: '1985', label: '1985' },
  { value: '1986', label: '1986' },
  { value: '1987', label: '1987' },
  { value: '1988', label: '1988' },
  { value: '1989', label: '1989' },
  { value: '1990', label: '1990' },
  { value: '1991', label: '1991' },
  { value: '1992', label: '1992' },
  { value: '1993', label: '1993' },
  { value: '1994', label: '1994' },
  { value: '1995', label: '1995' },
  { value: '1996', label: '1996' },
  { value: '1997', label: '1997' },
  { value: '1998', label: '1998' },
  { value: '1999', label: '1999' },
  { value: '2000', label: '2000' },
  { value: '2001', label: '2001' },
  { value: '2002', label: '2002' },
  { value: '2003', label: '2003' },
  { value: '2004', label: '2004' },
  { value: '2005', label: '2005' },
  { value: '2006', label: '2006' },
  { value: '2007', label: '2007' },
  { value: '2008', label: '2008' },
  { value: '2009', label: '2009' },
  { value: '2010', label: '2010' },
  { value: '2011', label: '2011' },
  { value: '2012', label: '2012' },
  { value: '2013', label: '2013' },
  { value: '2014', label: '2014' },
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' }
]

export const GENDER_OPTIONS = [
  {
    value: 'MALE',
    label: 'Nam'
  },
  {
    value: 'FEMALE',
    label: 'Nữ'
  },
  {
    value: 'ORTHER',
    label: 'Khác'
  }
]

export const NAVIGATION = [
  {
    path: '#',
    icon: Headset,
    badge: false,
    title: 'contact'
  },
  {
    path: '#',
    icon: MapPin,
    badge: false,
    title: 'showroom'
  },
  {
    path: '/account/order-history',
    icon: ScrollText,
    badge: false,
    title: 'orderHistory'
  },
  {
    path: '/cart/cart-buy-order-box',
    icon: ShoppingCart,
    badge: true,
    title: 'cart'
  }
]

export const PROFILE_NAVIGATION = [
  {
    key: 'favourites',
    title: 'favourites',
    icon: Heart,
    path: '/account/favourites'
  },
  {
    key: 'order-history',
    title: 'orderHistory',
    icon: Scroll,
    path: '/account/order-history'
  },
  {
    key: 'manage-address',
    title: 'manageAddress',
    icon: MapPinHouse,
    path: '/account/address'
  },
  {
    key: 'logout',
    title: 'logout',
    path: '/logout',
    icon: LogOut
  }
]

export const SIDEBAR_DRAWER_FOOTER_ICON = [
  {
    id: 1,
    icon: User,
    path: '/account'
  },
  {
    id: 2,
    icon: Heart,
    path: '/account/favourites'
  },
  {
    id: 3,
    icon: Scroll,
    path: '/account/order-history'
  },
  {
    id: 4,
    icon: MapPinHouse,
    path: '/account/address'
  },
  {
    id: 5,
    icon: LogOut,
    path: '/logout'
  }
]
