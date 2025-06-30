import { Link } from 'react-router-dom'

const ghnLogo = 'https://placehold.co/80x30/FFFFFF/000000?text=GHN' // [Image of GHN Logo]
const emsLogo = 'https://placehold.co/80x30/FFFFFF/000000?text=EMS' // [Image of EMS Logo]
const gvnLogo = 'https://placehold.co/80x30/FFFFFF/000000?text=GVN' // [Image of GVN Logo]
const viettelpostLogo = 'https://placehold.co/80x30/FFFFFF/000000?text=ViettelPost' // [Image of Viettel Post Logo]
const jntLogo = 'https://placehold.co/80x30/FFFFFF/000000?text=JNT' // [Image of J&T Express Logo]

const internetBankingLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=IB' // [Image of Internet Banking Logo]
const jcbLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=JCB' // [Image of JCB Logo]
const mastercardLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=MC' // [Image of MasterCard Logo]
const zalopayLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=ZaloPay' // [Image of ZaloPay Logo]
const momoLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=MoMo' // [Image of MoMo Logo]
const vnpayLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=VNPay' // [Image of VNPay Logo]
const visaLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=Visa' // [Image of Visa Logo]
const tienmatLogo = 'https://placehold.co/60x30/FFFFFF/000000?text=Cash' // [Image of Cash Logo]

export const Footer = () => {
  return (
    <footer className="text-gray-900 py-10 px-4 font-inter">
      <div className="w-full max-w-[74rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="col-span-1">
            <h5 className="font-bold text-gray-800 mb-4 uppercase">VỀ TECHSTORE</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* CHÍNH SÁCH */}
          <div className="col-span-1">
            <h5 className="font-bold text-gray-800 mb-4 uppercase">CHÍNH SÁCH</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* THÔNG TIN */}
          <div className="col-span-1">
            <h5 className="font-bold text-gray-800 mb-4 uppercase">THÔNG TIN</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Hệ thống cửa hàng
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Hướng dẫn thanh toán
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Hướng dẫn trả góp
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Tra cứu địa chỉ bảo hành
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-400 transition-colors duration-200">
                  Build PC
                </Link>
              </li>
            </ul>
          </div>

          {/* TỔNG ĐÀI HỖ TRỢ */}
          <div className="col-span-1">
            <h5 className="font-bold text-gray-800 mb-4 uppercase">
              TỔNG ĐÀI HỖ TRỢ <span className="text-sm font-normal">(8:00 - 21:00)</span>
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                Mua hàng:{' '}
                <Link to="#" className="text-blue-400 hover:underline transition-colors duration-200">
                  1900.5301
                </Link>
              </li>
              <li>
                Bảo hành:{' '}
                <Link to="#" className="text-blue-400 hover:underline transition-colors duration-200">
                  1900.5325
                </Link>
              </li>
              <li>
                Khiếu nại:{' '}
                <Link to="#" className="text-blue-400 hover:underline transition-colors duration-200">
                  1800.6173
                </Link>
              </li>
              <li>
                Email:{' '}
                <Link to="#" className="text-blue-400 hover:underline transition-colors duration-200">
                  cskh@techstore.com
                </Link>
              </li>
            </ul>
          </div>

          {/* ĐƠN VỊ VẬN CHUYỂN */}
          <div className="col-span-1 lg:col-span-1">
            <h5 className="font-bold text-gray-800 mb-4 uppercase">ĐƠN VỊ VẬN CHUYỂN</h5>
            <div className="grid grid-cols-3 gap-2">
              <img
                src={ghnLogo}
                alt="GHN"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/80x30?text=Logo'
                }}
              />
              <img
                src={emsLogo}
                alt="EMS"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/80x30?text=Logo'
                }}
              />
              <img
                src={gvnLogo}
                alt="GVN"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/80x30?text=Logo'
                }}
              />
              <img
                src={viettelpostLogo}
                alt="Viettel Post"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/80x30?text=Logo'
                }}
              />
              <img
                src={jntLogo}
                alt="J&T Express"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/80x30?text=Logo'
                }}
              />
            </div>
          </div>

          {/* CÁCH THỨC THANH TOÁN */}
          <div className="col-span-1 lg:col-span-1">
            <h5 className="font-bold text-gray-800 mb-4 uppercase">CÁCH THỨC THANH TOÁN</h5>
            <div className="grid grid-cols-4 gap-2">
              <img
                src={internetBankingLogo}
                alt="Internet Banking"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
              <img
                src={jcbLogo}
                alt="JCB"
                className="h-8 w-auto rounded-md bg-transparent p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
              <img
                src={mastercardLogo}
                alt="MasterCard"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
              <img
                src={zalopayLogo}
                alt="ZaloPay"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
              <img
                src={momoLogo}
                alt="MoMo"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
              <img
                src={vnpayLogo}
                alt="VNPay"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
              <img
                src={visaLogo}
                alt="Visa"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
              <img
                src={tienmatLogo}
                alt="Tiền mặt"
                className="h-8 w-auto rounded-md bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/60x30?text=Logo'
                }}
              />
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} TtPhong . All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
