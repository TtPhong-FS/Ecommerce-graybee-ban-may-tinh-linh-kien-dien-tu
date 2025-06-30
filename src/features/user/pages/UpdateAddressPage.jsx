import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddressProvider } from '../form'
import { getAddressForUpdateAsync } from '../redux'

export default function UpdateAddressPage() {
  const [ready, setReady] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const [isUpdate, setIsUpdate] = useState(true)

  const { dispatch, navigate } = useAppContext()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () =>
      await handleAsync({
        asyncAction: (id) => dispatch(getAddressForUpdateAsync(id)).unwrap(),
        onSuccess: (res) => {
          setInitialData(res?.data)
          setIsUpdate(true)
          setReady(true)
        },
        values: id,
        navigate
      })
    fetchData()
  }, [id])

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <>
      <Dialog open onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật địa chỉ</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <Spin spinning={!ready}>
            <AddressProvider isUpdate={isUpdate} initialData={initialData} />
          </Spin>
        </DialogContent>
      </Dialog>
    </>
  )
}
