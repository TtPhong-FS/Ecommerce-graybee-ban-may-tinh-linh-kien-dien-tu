import { useSelector } from 'react-redux'

export function Specification() {
  const details = useSelector((state) => state.product.details?.details)
  if (!details) return null

  return (
    <div className="gap-4 p-4">
      <h1 className="mb-3">Thông số sản phẩm</h1>
      {details?.map((detail, index) => (
        <div key={index} className="">
          <table className="flex border-[1px]">
            <thead className="min-w-[140px] bg-accent">
              <th className="flex flex-col p-2 text-start text-accent-foreground">{detail?.label}</th>
            </thead>
            <tbody className="bg-background w-full">
              <tr className="flex flex-col p-2 text-primary">{detail?.value}</tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
