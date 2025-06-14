import { useSelector } from 'react-redux'

export const Description = () => {
  const description = useSelector((state) => state.product.details?.description)

  return (
    description !== null && (
      <div className="box">
        <div className="text-[1.1rem]" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    )
  )
}
