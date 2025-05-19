import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function Specification() {
  const detail = useSelector((state) => state.product.details?.detail)
  if (!detail) return null

  return (
    <div className="gap-4 p-4">
      <h1 className="mb-3">Thông số sản phẩm</h1>
      {Object.entries(detail)
        .filter(([key, value]) => key !== 'detailType' && value !== null && value !== '')
        .map(([key, value]) => (
          <div key={key} className="">
            <table className="flex border-[1px]">
              <thead className="min-w-[140px] bg-accent">
                <th className="flex flex-col p-2 text-start text-accent-foreground">{key?.toUpperCase()}</th>
              </thead>
              <tbody className="bg-background w-full">
                {detail?.detailType === 'pc' ? (
                  <Link to={`/products/${value}`} className="flex font-medium flex-col p-2 link">
                    {value}
                  </Link>
                ) : (
                  <tr className="flex flex-col p-2 text-primary">{value}</tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  )
}
