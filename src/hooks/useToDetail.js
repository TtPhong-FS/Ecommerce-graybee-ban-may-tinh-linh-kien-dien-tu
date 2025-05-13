import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveIdToState } from '../pages/product/features/slice'
import { toSlug } from '../utils'

export const useToDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toDetail = ({ id, name }) => {
    const pathName = toSlug(name)
    navigate(`/products/${pathName}`)
    dispatch(saveIdToState(id))
  }

  return toDetail
}
