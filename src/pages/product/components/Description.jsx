import { useSelector } from 'react-redux'

export const Description = () => {
  const description = useSelector((state) => state.product.details?.description)

  return (
    <div className="box">
      <div className="text-[1.1rem]">{description}</div>
    </div>
  )
}
