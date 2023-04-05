import { Button, Modal } from '@mantine/core'

type ModalProps = {
  opened: boolean
  onClose: () => void
  buttonWord: string
  onSubmit: () => void
  modalTitle?: string
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
}) => {
  return (
    <Modal opened={isOpened} onClose={handleClose} centered withCloseButton={false}>
      <div className=' w-full p-5'>
        <div className=' mb-4 border-b border-r-0 border-t-0 border-l-0 border-solid border-gray-200 font-semibold'>
          <p>{modalTitle}</p>
        </div>
        <div className=' mb-4 border-b border-r-0 border-t-0 border-l-0 border-solid border-gray-200'>
          <div className=' mb-4 rounded-md bg-gray-100 p-3'>
            <p>
              コミュニティガイドライン をご確認ください みんながより良い体験をするためのマナーについて書かれています。
              ご意見やご要望は Recurrot Discussions へお願いします。
            </p>
          </div>
        </div>
        <div className=' flex w-full justify-end gap-x-3'>
          <Button variant='default' type='button' onClick={handleClose} className=' hover:transform-none'>
            キャンセル
          </Button>
          <Button
            color={buttonWord === '削除する' ? 'red' : 'blue'}
            type='button'
            onClick={handleSubmit}
            className=' hover:transform-none'
          >
            {buttonWord}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
