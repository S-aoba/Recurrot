import { ActionIcon, Avatar, Menu, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import { useState } from 'react'

import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { useQueryAnswers } from '@/common/hook/useQueryAnswers'
import type { AnswerAndPostedUserInfoType } from '@/common/type'
import { answerDescriptionAtom, editedAnswerAtom } from '@/store/question-atom'

import { DetailDescription } from '../DetaiDescription'
import { UpdateAnswerForm } from '../Form/Answer'
import { AnswerLoading } from '../Loading'
import { Modal } from '../Modal'

/**
 * @package
 */

type AnswerListProps = {
  questionId: string
  userId: string
}

export const AnswerList: NextPage<AnswerListProps> = ({ questionId, userId }) => {
  const { data: answers, status: answersStatus } = useQueryAnswers(questionId)

  if (answersStatus === 'loading') return <AnswerLoading />
  return (
    <>
      <div className=' w-full border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 bg-white px-3 sm:w-10/12'>
        <p className=' mb-0 pb-2 text-2xl'>
          <span className=' font-semibold text-blue-500'>{answers && answers.length}</span> 件の回答
        </p>
      </div>

      {answers &&
        answers.map((answer) => {
          return <Answer key={answer.id} answer={answer} userId={userId} />
        })}
    </>
  )
}

const AnswerBody: React.FC<Props> = ({ answer, isEdit, setIsEdit }) => {
  return (
    <>
      {isEdit && setIsEdit ? (
        <UpdateAnswerForm questionId={answer.questionId} setIsEdit={setIsEdit} />
      ) : (
        <DetailDescription description={answer.description} />
      )}
    </>
  )
}

type Props = {
  answer: AnswerAndPostedUserInfoType
  userId?: string
  isEdit?: boolean
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>
}

const Answer: React.FC<Props> = ({ answer, userId }) => {
  const year = answer.createdAt.toString().slice(0, 4)
  const month = answer.createdAt.toString().slice(5, 7)
  const day = answer.createdAt.toString().slice(8, 10)

  const [isDeleteAnswerOpened, { open: handleDeleteAnswerOpen, close: handleDeleteAnswerClose }] = useDisclosure(false)

  const [isEdit, setIsEdit] = useState(false)
  const [_, setDescription] = useAtom(answerDescriptionAtom)
  const [editedAnswer, setEditedAnswer] = useAtom(editedAnswerAtom)

  const { deleteAnswerMutation } = useMutateAnswer(answer.questionId)

  const defaultUserName = answer && answer.user.email.slice(0, answer.user.email.indexOf('@'))

  const handleSetAnswer = () => {
    if (answer && setIsEdit) {
      setDescription(answer.description)
      setEditedAnswer({ ...editedAnswer, id: answer.id })
      setIsEdit(!isEdit)
    }
  }

  const handleDeleteAnswer = () => {
    if (answer) {
      deleteAnswerMutation.mutate(answer.id)
      handleDeleteAnswerClose()
    }
  }

  return (
    <>
      <Modal
        opened={isDeleteAnswerOpened}
        onClose={handleDeleteAnswerClose}
        onSubmit={handleDeleteAnswer}
        buttonWord='削除する'
        modalTitle='本当に削除してもよろしいですか？'
      />

      <div className=' w-full border border-solid border-gray-200 bg-white p-5 sm:w-9/12'>
        <div className=' py-5'>
          <div className=' flex items-center justify-between border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2'>
            <div className=' flex items-center gap-x-2 text-sm'>
              <Avatar src={answer.user.profileImage} radius={'xl'} />
              <div className=' flex gap-x-2'>
                <span>
                  {answer && answer.user.userName === null ? defaultUserName : answer && answer.user.userName}
                </span>
                <span>
                  回答日: {year} / {month} / {day}
                </span>
              </div>
            </div>
            {answer.userId === userId && (
              <div className=' flex items-center justify-center gap-x-2'>
                <Tooltip label='編集する'>
                  <IconEdit size={23} className=' hover:cursor-pointer' onClick={handleSetAnswer} />
                </Tooltip>
                <Menu>
                  <Menu.Target>
                    <ActionIcon className=' hover:transform-none'>
                      <IconChevronDown color='black' size={23} className=' hover:cursor-pointer' />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={handleDeleteAnswerOpen} icon={<IconTrash size={14} />}>
                      削除する
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            )}
          </div>
          <AnswerBody answer={answer} isEdit={isEdit} setIsEdit={setIsEdit} />
        </div>
      </div>
    </>
  )
}
