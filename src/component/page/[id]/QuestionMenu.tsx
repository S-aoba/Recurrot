import { ActionIcon, Menu, Tooltip } from '@mantine/core'
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react'
import type { NextPage } from 'next'
import Link from 'next/link'

/**
 * @package
 */

type QuestionMenuProps = {
  onSetQuestion: () => void
  onDeleteQuestionOpen: () => void
}

export const QuestionMenu: NextPage<QuestionMenuProps> = ({
  onSetQuestion: handleSetQuestion,
  onDeleteQuestionOpen: handleDeleteQuestionOpen,
}) => {
  return (
    <div className=' flex items-center justify-center gap-x-2'>
      <Tooltip label='編集する'>
        <Link href={'/dashboard/questions/edit'} type='button' className=' flex justify-center text-black no-underline'>
          <IconEdit size={23} className=' hover:cursor-pointer' onClick={handleSetQuestion} />
        </Link>
      </Tooltip>
      <Menu>
        <Menu.Target>
          <ActionIcon className=' hover:transform-none'>
            <IconChevronDown color='black' size={23} className=' hover:cursor-pointer' />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={handleDeleteQuestionOpen} icon={<IconTrash size={14} />}>
            削除する
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
