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
import { deleteReviewProductAsync, getCommentRatingByIdAsync } from '@/features/account'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useHref, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import ReviewProvider from '../form/ReviewProvider'

export default function ReviewModal() {
  const { dispatch, navigate } = useAppContext()
  const href = useHref()
  const { slug, id } = useParams()

  const [ready, setReady] = useState(true)
  const [initialData, setInitialData] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)
  const [open, setOpen] = useState(true)

  const isEdit = href.split('/').reverse()[1] === 'edit'
  const visible = href.split('/').reverse()[1] === 'edit' || href.split('/').reverse()[0] === 'review'

  // console.log()

  const handleClose = () => {
    navigate(-1)
  }

  const handleDelete = (id) => {
    handleAsync({
      asyncAction: (id) => dispatch(deleteReviewProductAsync(id)).unwrap(),
      onSuccess: (res) => {
        if (res?.status === 200) {
          toast.success(res.message)
          setOpen(false)
        }
      },
      toast,
      values: id
    })
  }

  useEffect(() => {
    if (isEdit) {
      setReady(false)
      handleAsync({
        asyncAction: (id) => dispatch(getCommentRatingByIdAsync(id)).unwrap(),
        onSuccess: (res) => {
          setReady(true)
          setInitialData(res.data)
          setIsUpdate(true)
        },
        toast,
        values: id
      })
    }
    return () => {
      setOpen(false)
    }
  }, [id, dispatch, isEdit])

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <Spin spinning={!ready}>
          <DialogHeader>
            <DialogTitle className="mb-4">
              {href.split('/').reverse()[1] === 'delete' ? 'Xoá đánh giá' : 'Đánh giá sản phẩm '}
            </DialogTitle>
            <DialogDescription className={`${href.split('/').reverse()[0] === 'delete' ? 'block' : 'hidden'} `}>
              {href.split('/').reverse()[1] === 'delete' && 'Bạn chắc chắn muốn xoá đánh giá của mình về sản phẩm này?'}
            </DialogDescription>
          </DialogHeader>
          {visible && (
            <div>
              <ReviewProvider isUpdate={isUpdate} initialData={initialData} />
            </div>
          )}
        </Spin>
        {href.split('/').reverse()[1] === 'delete' && (
          <DialogFooter>
            <DialogClose onClick={() => handleDelete(id)}>
              <Button>Tiếp tục xoá</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="outline">Huỷ xoá</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
