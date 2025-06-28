import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function ProductEmpty() {
  return (
    <div className="flex flex-col items-center justify-center  my-8 text-center">
      {/* Icon hoặc hình ảnh minh họa */}
      <div className="mb-6">
        <svg
          className="w-20 h-20 text-gray-400 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>

      <h1 className="text-gray-800 mb-3">Không tìm thấy sản phẩm nào!</h1>

      <div className="w-xl">
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Rất tiếc, không có sản phẩm nào khớp với tìm kiếm của bạn Vui lòng thử tìm kiếm với từ khóa khác hoặc điều
          chỉnh bộ lọc.
        </p>
      </div>

      <div className="">
        <Button
          asChild
          variant="outline"
          onClick={() => console.log('Thực hiện hành động: Xem tất cả sản phẩm')}
          className="py-6 cursor-pointer"
        >
          <Link to={'/home'}>Xem tất cả sản phẩm</Link>
        </Button>
      </div>

      <p className="text-gray-500 mt-6 text-xs md:text-sm">Bạn có thể liên hệ hỗ trợ nếu cần thêm trợ giúp.</p>
    </div>
  )
}

export default ProductEmpty
