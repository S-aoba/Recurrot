import { useDisclosure } from '@mantine/hooks'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Head from 'next/head'

import { useDescriptionEditor } from '@/common/hook/useDescriptionEditor'
import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { Modal } from '@/component/ui/Modal'
import { editedQuestionAtom, isQuestionDisabledAtom, questionDescriptionAtom, resetQuestionAtom } from '@/store/atom'

import { Post } from './Post'

/**
 * @package
 */

export const PostPage = () => {
  const editedQuestion = useAtomValue(editedQuestionAtom)
  const isQuestionReady = useAtomValue(isQuestionDisabledAtom)

  const resetEditedQuestion = useSetAtom(resetQuestionAtom)

  const [isOpened, { open: handleOpen, close: handleClose }] = useDisclosure(false)

  const [description, _] = useAtom(questionDescriptionAtom)

  const { createQuestionMutation } = useMutateQuestion()

  const { questionEditor } = useDescriptionEditor()

  const handleOnClick = () => {
    resetEditedQuestion()
  }

  const handleSubmit = () => {
    if (editedQuestion.id === '0' && questionEditor) {
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        description,
        hashtags: editedQuestion.hashtags,
      })
      questionEditor.commands.setContent('')
    }
  }
  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Modal
        opened={isOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
        buttonWord={'投稿する'}
        modalTitle={'Recurrotに投稿する'}
        description='
        <p>
          コミュニティガイドライン をご確認ください みんながより良い体験をするためのマナーについて書かれています。
          <br />ご意見やご要望は Recurrot Discussions へお願いします。
        </p>
            '
      />
      <Post onHandleOpen={handleOpen} isQuestionReady={isQuestionReady} onHandleClick={handleOnClick} />
    </>
  )
}
