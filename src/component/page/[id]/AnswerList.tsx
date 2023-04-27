import { ActionIcon, Avatar, Menu, Tooltip } from '@mantine/core'
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import { useState } from 'react'

import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { useQueryAnswerList } from '@/common/hook/useQueryAnswerList'
import type { AnswerType } from '@/common/type'
import { answerDescriptionAtom, editedAnswerAtom } from '@/store/atom'

import { UpdateAnswerForm } from '../../ui/Form/Answer'
import { AnswerLoading } from '../../ui/Loading'
import { DetailDescription } from './DetailDescription'

/**
 * @package
 */

type AnswerListProps = {
  questionId: string
  userId: string
}

export const AnswerList: NextPage<AnswerListProps> = ({ questionId, userId }) => {
  const { data: answerList, status: answerListStatus } = useQueryAnswerList(questionId)

  if (answerListStatus === 'loading') return <AnswerLoading />

  return (
    <>
      <div className=' w-full'>
        <p className=' mb-0 pb-2 text-2xl'>
          <span className=' font-semibold text-[#1976d2]'>{answerList && answerList.length}</span> 件の回答
        </p>
      </div>

      {answerList &&
        answerList.map((answer: AnswerType) => {
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
  answer: AnswerType
  userId?: string
  isEdit?: boolean
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>
}

const Answer: React.FC<Props> = ({ answer, userId }) => {
  const year = answer.createdAt.toString().slice(0, 4)
  const month = answer.createdAt.toString().slice(5, 7)
  const day = answer.createdAt.toString().slice(8, 10)

  const [isEdit, setIsEdit] = useState(false)
  const [_, setDescription] = useAtom(answerDescriptionAtom)
  const [editedAnswer, setEditedAnswer] = useAtom(editedAnswerAtom)

  const { deleteAnswerMutation } = useMutateAnswer(answer.questionId)

  const handleSetAnswer = () => {
    if (answer && setIsEdit) {
      setDescription(answer.description)
      setEditedAnswer({ ...editedAnswer, id: answer.id })
      setIsEdit(!isEdit)
    }
  }

  const handleDeleteAnswer = () => {
    deleteAnswerMutation.mutate(answer.id)
  }

  return (
    <>
      <div className=' w-full rounded-md bg-white p-5 shadow'>
        <div className=' py-5'>
          <div className=' flex items-center justify-between pb-2'>
            <div className=' flex items-center gap-x-2 text-sm'>
              <Avatar
                src={answer.user.profileImage}
                radius={'xl'}
                className=' hover: cursor-pointer border border-solid border-gray-200 shadow-sm'
              />
              <div className=' flex gap-x-2'>
                <span>
                  {answer && answer.user.userName === null ? '名無しユーザー' : answer && answer.user.userName}
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
                    <Menu.Item onClick={handleDeleteAnswer} icon={<IconTrash size={14} />}>
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
