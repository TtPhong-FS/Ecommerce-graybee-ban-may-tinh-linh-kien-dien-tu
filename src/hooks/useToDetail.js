import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toSlug } from '../utils'

export const useToDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toDetail = ({ id, name }) => {
    const pathName = toSlug(name)
    navigate(`/products/${pathName}`)
  }

  return toDetail
}
