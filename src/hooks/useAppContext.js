import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function useAppContext() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return {
    dispatch,
    navigate
  }
}
