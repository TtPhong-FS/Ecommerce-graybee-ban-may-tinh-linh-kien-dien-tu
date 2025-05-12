import { Button } from '@/components/ui/button'
import { Box, styled, Typography } from '@mui/material'

import { Link } from 'react-router-dom'

const NotFoundContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  textAlign: 'center',
  padding: theme.spacing(4)
}))

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '6rem',
  fontWeight: 700,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2)
}))

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(3)
}))

export const NotFoundPage = () => {
  return (
    <NotFoundContainer className="bg-gray-100 dark:bg-gray-900">
      <ErrorCode variant="h1">404</ErrorCode>
      <ErrorMessage variant="h5">Oops! Trang bạn đang tìm kiếm không tồn tại.</ErrorMessage>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <Button variant="secondary" type="button" className="cursor-pointer h-[38px]">
          Về Trang Chủ
        </Button>
      </Link>
    </NotFoundContainer>
  )
}
