import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { useHref, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { AddressProvider } from '../form'
import { deleteAddressByIdAsync } from '../redux'

export default function AddressModal() {
  const { dispatch, navigate } = useAppContext()
  const href = useHref()
  const { id } = useParams()
  // console.log()

  const handleClose = () => {
    navigate(-1)
  }

  const handleDelete = async (id) => {
    await handleAsync({
      asyncAction: (id) => dispatch(deleteAddressByIdAsync(id)).unwrap(),
      onSuccess: (res) => {
        if (res?.status === 200) {
          toast.success(res.message)
          navigate('/account/address')
        }
      },
      navigate,
      values: id
    })
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className={`${href.split('/').reverse()[1] === 'delete' ? 'block' : 'hidden'} `}>
            {href.split('/').reverse()[1] === 'delete' && 'Xoá địa chỉ'}
          </DialogTitle>
          <DialogDescription className={`${href.split('/').reverse()[1] === 'delete' ? 'block' : 'hidden'} `}>
            {href.split('/').reverse()[1] === 'delete' && 'Bạn có chắc chắn muốn xoá địa chỉ này?'}
          </DialogDescription>
        </DialogHeader>
        {href.split('/').reverse()[0] === 'create' && (
          <div>
            <AddressProvider isUpdate={false} initialData={null} />
          </div>
        )}
        {href.split('/').reverse()[1] === 'delete' && (
          <DialogFooter>
            <DialogClose onClick={() => handleDelete(id)}>
              <Button>Tiếp tục xoá</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="outline">Huỷ bỏ</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
