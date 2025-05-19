import { useParams } from 'react-router-dom'

export const ProductPage = () => {
  const { category, manufacturer } = useParams()
  console.log(category, manufacturer)
  return <div></div>
}
