import { Box, Modal } from '@mui/material'
import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../../components/Loading'
import { LoginProvider } from '../components/LoginProvider'
import { SignUpProvider } from '../components/SignUpProvider'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '0.4rem'
}

export const AuthPage = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal onClose={handleClose} open={open}>
      <Box sx={style}>
        <Suspense fallback={<Loading />}>
          {location.pathname === '/signup' ? <SignUpProvider /> : <LoginProvider />}
        </Suspense>
      </Box>
    </Modal>
  )
}
