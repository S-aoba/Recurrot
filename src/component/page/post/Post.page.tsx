import { useDisclosure } from '@mantine/hooks'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { Modal } from '@/component/ui/Modal'
import { editedQuestionAtom, isQuestionDisabledAtom, questionDescriptionAtom, resetQuestionAtom } from '@/store/atom'

import { Post } from './Post'

/**
 * @package
 */

export const PostPage = () => {
  const router = useRouter()

  const editedQuestion = useAtomValue(editedQuestionAtom)
  const isQuestionReady = useAtomValue(isQuestionDisabledAtom)

  const resetEditedQuestion = useSetAtom(resetQuestionAtom)

  const [isOpened, { open: handleOpen, close: handleClose }] = useDisclosure(false)

  const [description, _] = useAtom(questionDescriptionAtom)

  const { createQuestionMutation } = useMutateQuestion()

  const handleDiscardChangesAndRedirectToPostedQuestions = () => {
    if (editedQuestion.title !== '' || editedQuestion.hashtags.length !== 0 || description) {
      const isOk = window.confirm('入力した内容は破棄されます。よろしいですか？')
      if (isOk) {
        resetEditedQuestion()
        router.push('/dashboard/posted-questions')
        return
      }
      return
    }
    router.push('/dashboard/posted-questions')
    return
  }

  const handleCreateQuestion = () => {
    if (editedQuestion.id === '0') {
      createQuestionMutation.mutate({
        title: editedQuestion.title,
        description,
        hashtags: editedQuestion.hashtags,
      })
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
        onSubmit={handleCreateQuestion}
        buttonWord={'投稿する'}
        modalTitle={'Recurrotに投稿する'}
        description='
        <p>
          コミュニティガイドライン をご確認ください みんながより良い体験をするためのマナーについて書かれています。
          <br />ご意見やご要望は Recurrot Discussions へお願いします。
        </p>
            '
      />
      <Post
        onHandleOpen={handleOpen}
        isQuestionReady={isQuestionReady}
        onHandleClick={handleDiscardChangesAndRedirectToPostedQuestions}
      />
    </>
  )
}
