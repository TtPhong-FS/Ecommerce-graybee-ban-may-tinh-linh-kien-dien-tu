import { Button } from '@/components/ui/button'

import { useSelector } from 'react-redux'

const Contact = () => {
  const { cartItems } = useSelector((state) => state.cart)

  return <div>{cartItems?.length > 0 && cartItems?.map((cat, index) => <Button key={index} />)}</div>
}

export default Contact
