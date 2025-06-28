import { RHFInputField, RHFRate } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { editReviewProductAsync, reviewProductAsync } from '@/features/user'
import { useAppContext, useLoading } from '@/hooks'
import { handleAsyncSubmit } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'
const schema = yup.object({
  comment: yup.string().required('Nội dung không được để trống')
})

export default function ReviewProvider({ isUpdate, initialData }) {
  const { dispatch, navigate } = useAppContext()
  const { slug, id } = useParams()

  const { isLoading, start, stop } = useLoading()
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: '',
      rating: ''
    },
    shouldUnregister: false
  })

  useEffect(() => {
    if (isUpdate) {
      methods.reset({
        ...initialData
      })
    }
  }, [isUpdate, initialData, methods])

  const handleSubmit = methods.handleSubmit((values) => {
    start('submiting')
    handleAsyncSubmit({
      asyncAction: ({ slug, values, id }) =>
        dispatch(
          isUpdate
            ? editReviewProductAsync({ id: id, request: values })
            : reviewProductAsync({ productSlug: slug, request: values })
        ).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
        navigate(-1)
      },
      setError: methods.setError,
      values: { slug, values, id }
    })
    stop('submiting')
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <RHFInputField name="comment" label="Nội dung" />
          <RHFRate name="rating" label="Đánh giá" />
        </div>
        <Button disabled={isLoading('submiting')} type="submit" variant="secondary" className="py-5 mt-6 w-full">
          Gửi đánh giá
        </Button>
      </form>
    </FormProvider>
  )
}

ReviewProvider.propTypes = {
  isUpdate: PropTypes.bool,
  initialData: PropTypes.object
}
