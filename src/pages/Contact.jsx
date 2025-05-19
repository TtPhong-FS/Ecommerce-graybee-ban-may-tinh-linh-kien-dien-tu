import { RHFInputField } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Required')
})

export const Contact = () => {
  const methods = useForm({
    defaultValues: {
      name: '',
      age: 0
    },
    resolver: yupResolver(schema)
  })

  const onsubmit = methods.handleSubmit((values) => {
    console.log(values)
  })

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={onsubmit}>
          <RHFInputField name="name" />
          <RHFInputField type="number" name="age" />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  )
}
