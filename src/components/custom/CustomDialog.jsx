import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'

export default function CustomDialog({
  triggerElement,
  title,
  description,
  children,
  titleCancel = 'Cancel',
  titleOk = 'OK',
  onConfirm
}) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{titleCancel}</Button>
          </DialogClose>
          <Button type="button" onClick={handleConfirm}>
            {titleOk}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
CustomDialog.propTypes = {
  triggerElement: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  titleCancel: PropTypes.string,
  titleOk: PropTypes.string,
  onConfirm: PropTypes.func
}
