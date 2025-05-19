import { Button } from '@/components/ui/button'
import { Rate } from 'antd'

import { useSelector } from 'react-redux'

export const ReviewComment = () => {
  const reviews = useSelector((state) => state.product.details?.reviews)

  return (
    <div className="rounded-lg bg-white p-4">
      {!reviews || reviews.length === 0 ? (
        <div>
          <span className="description">Sản phẩm chưa có đánh giá nào</span>
        </div>
      ) : (
        <div>
          <div className="mb-6 font-semibold text-xl flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <span className="text-3xl">4.9</span>
                <span>/</span>
                <span className="text-gray-500 text-base">5</span>
              </div>
              <span>
                <Rate disabled allowHalf value={4.5} />
              </span>
              <h2>1000 ratings and 450 reviews</h2>
            </div>
            <Button type="button" variant="secondary" className="cursor-pointer h-[38px] w-full">
              Đánh giá sản phẩm
            </Button>
          </div>
          <div>
            {reviews.map((review) => (
              <div className="border-b-1 border-gray-300 pb-2 pt-2" key={review.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>
                      <Rate disabled allowHalf value={review.rating} />
                    </span>
                    <span>by {review.userName}</span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer h-[38px]"
                    onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid #1890ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.border = 'none')}
                  >
                    ...
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">{review.publishedAt}</span>
                  <span>{review.comment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
