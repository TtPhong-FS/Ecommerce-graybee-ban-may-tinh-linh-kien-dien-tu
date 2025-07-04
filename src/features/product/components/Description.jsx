import { useSelector } from 'react-redux'

export const Description = () => {
  const description = useSelector((state) => state.product.details?.description)

  return description !== null ? (
    <div className="card">
      <div className="text-base" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  ) : (
    <div className="card italic text-muted-foreground">Sản phẩm hiện tại chưa có mô tả</div>
  )
}
