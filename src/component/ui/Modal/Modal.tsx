import { Button, Modal } from '@mantine/core'

import { COLOR } from '@/common/const'

type ModalProps = {
  opened: boolean
  onClose: () => void
  buttonWord: string
  onSubmit: () => void
  modalTitle?: string
  description: string
  isLoading?: boolean
}

/**
 * @package
 */

export const CustomModal: React.FC<ModalProps> = ({
  opened: isOpened,
  onClose: handleClose,
  buttonWord,
  onSubmit: handleSubmit,
  modalTitle,
  description,
  isLoading,
}) => {
  return (
    <Modal opened={isOpened} onClose={handleClose} centered withCloseButton={false}>
      <div className=' w-full p-5'>
        <div className=' mb-4 border-b border-r-0 border-t-0 border-l-0 border-solid border-gray-200 font-semibold'>
          <p>{modalTitle}</p>
        </div>
        <div className=' mb-4 border-b border-r-0 border-t-0 border-l-0 border-solid border-gray-200'>
          <div className=' mb-4 rounded-md bg-gray-100 p-3'>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
        </div>
        <div className=' flex w-full justify-end gap-x-3'>
          <Button variant='default' type='button' onClick={handleClose} className=' hover:transform-none'>
            キャンセル
          </Button>
          <Button
            type='button'
            onClick={handleSubmit}
            className={` bg-[${COLOR.main}] hover:transform-none hover:bg-[${COLOR.main}]`}
            loading={isLoading}
          >
            {buttonWord}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
