import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const { category, manufacturer } = useParams()
  console.log(category, manufacturer)
  return <div></div>
}

export default ProductPage
