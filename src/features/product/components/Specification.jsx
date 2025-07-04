import { useSelector } from 'react-redux'

export function Specification() {
  const specifications = useSelector((state) => state.product.details?.specifications)
  if (!specifications) return null

  return specifications?.length === 0 ? (
    <div className="text-muted-foreground italic card">Sản phẩm hiện chưa có thông số kỹ thuật</div>
  ) : (
    <div className="gap-4 p-4 bg-white">
      <h1 className="mb-3">Thông số sản phẩm</h1>
      <div className="flex flex-col gap-4">
        {specifications?.map((detail) => (
          <div key={detail.label} className="flex items-center">
            <h3 className="min-w-[160px]">{detail.label}</h3>
            <span>{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
