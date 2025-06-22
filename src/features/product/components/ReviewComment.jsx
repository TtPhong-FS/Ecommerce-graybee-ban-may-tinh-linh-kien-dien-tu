import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAppContext } from '@/hooks'
import { getToken } from '@/utils'
import { Rate } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'sonner'

export const ReviewComment = () => {
  const token = getToken()

  const { navigate } = useAppContext()

  const reviews = useSelector((state) => state.product.details?.reviews)

  const decodedToken = jwtDecode(token)

  const handleReviewClick = () => {
    if (!token) {
      toast.warning('Oh no!', {
        description: 'Bạn phải đăng nhập mới có thể dùng tính năng này'
      })
    } else {
      navigate('review')
    }
  }

  const totalReviews = reviews?.length || 0
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0)
  const average = reviews.length ? totalRating / reviews.length : 0
  const reviewBreakdown = {
    5: reviews?.filter((r) => r.rating === 5),
    4: reviews?.filter((r) => r.rating === 4),
    3: reviews?.filter((r) => r.rating === 3),
    2: reviews?.filter((r) => r.rating === 2),
    1: reviews?.filter((r) => r.rating === 1)
  }
  const totalComments = reviews.length

  return (
    <div className="card">
      <Outlet />
      <div className="font-sans  max-w-5xl mr-auto">
        <h2 className="text-2xl font-bold mb-6">Đánh giá và bình luận</h2>

        <div className="flex items-start mb-6">
          {/* Left section: Average rating and review button */}
          <div className="flex-shrink-0 mr-8 text-center">
            <p className="text-5xl font-bold text-gray-800">{average}</p>
            <p className="text-sm text-gray-600 mb-2">{totalReviews} lượt đánh giá</p>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${i < average ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 6.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}
            </div>
            <Button variant="outline" className="py-5" onClick={handleReviewClick}>
              Đánh giá sản phẩm
            </Button>
          </div>

          {/* Right section: Rating breakdown bars */}
          <div className="flex-grow">
            {Object.entries(reviewBreakdown)
              .reverse()
              .map(([star, re]) => (
                <div key={star} className="flex items-center mb-2">
                  <span className="text-sm font-medium mr-2">{star}</span>
                  <svg
                    className="w-4 h-4 text-yellow-400 fill-current mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 6.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                  </svg>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="to-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(re.length / totalReviews) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">{re.length}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-8">
          <p className="text-lg font-bold mb-4">{totalComments} Bình luận</p>
          <div className="flex space-x-2">
            <Button variant="secondary" className="py-2 rounded-2xl">
              Tất cả
            </Button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                className="border border-gray-300 text-gray-700 py-1 px-4 rounded-full text-sm hover:bg-gray-100 transition duration-300"
              >
                {star} <span className="hidden sm:inline">⭐</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4">
            {reviews?.map((r, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/leerob.png" />
                      </Avatar>
                      <div className="flex flex-col gap-2">
                        <span>{r.poster}</span>
                        <span>{r.publishedAt}</span>
                      </div>
                    </div>
                    <span>-</span>
                    {<Rate value={r.rating} />}
                  </div>
                  {decodedToken.sub === r.uid && (
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer ">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <Link to={`edit/${r.id}`}>Chỉnh sửa</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`delete/${r.id}`}>Xoá</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
                <span className="mt-1 block">{r.comment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
