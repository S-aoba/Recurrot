import { Alert, Button, Group, Menu, Modal, PasswordInput, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarEvent, IconDatabase, IconZoomQuestion } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'

import { useQueryUser } from '@/common/hook/useQueryUser'

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No email provided'),
  password: Yup.string().required('No password provided').min(5, 'Password should be min 5 chars'),
})

export type AuthForm = {
  email: string
  password: string
}

export const Header = () => {
  const { data, isSuccess } = useQueryUser()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isSignUpOpened, { open: handleSignUpOpen, close: handleSignUpClose }] = useDisclosure(false)
  const [isLoginOpened, { open: handleLoginOpen, close: handleLoginClose }] = useDisclosure(false)

  const [error, setError] = useState('')

  const handleForm = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  })

  const handleSignUpSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email: handleForm.values.email,
        password: handleForm.values.password,
      })

      handleForm.reset()
      handleLoginClose()
      router.reload()
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }

  const handleLoginSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: handleForm.values.email,
        password: handleForm.values.password,
      })
      handleForm.reset()
      handleLoginClose()
      router.reload()
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }

  const handleLogout = async () => {
    queryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.reload()
  }

  return (
    <header className=' flex h-14 max-h-14 w-full max-w-full justify-center py-3'>
      <div className=' flex w-9/12 items-center gap-x-5'>
        <span className=' text-3xl'>Recurrot</span>

        {data && (
          <>
            <span>userEmail :</span>
            {data?.email}
          </>
        )}
        {isSuccess ? (
          <>
            <Menu shadow='md' width={200}>
              <Menu.Target>
                <Button className=' hover:transform-none'>投稿する</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconZoomQuestion size={14} />} component='a' href='/questions/post'>
                  質問する
                </Menu.Item>
                <Menu.Item icon={<IconCalendarEvent size={14} />} component='a' href='/'>
                  イベントを投稿する
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button className=' hover:transform-none' onClick={handleLogout}>
              ログアウト
            </Button>
          </>
        ) : (
          <>
            <Modal
              opened={isSignUpOpened}
              onClose={handleSignUpClose}
              title='新規登録をお願いします'
              centered
              withCloseButton={false}
              size='lg'
            >
              {error && (
                <Alert my='md' variant='filled' title='Authorization Error' color='red' radius='md'>
                  {error}
                </Alert>
              )}
              <form onSubmit={handleForm.onSubmit(handleSignUpSubmit)}>
                <TextInput
                  mt='md'
                  id='email'
                  label='Email*'
                  placeholder='example@gmail.com'
                  {...handleForm.getInputProps('email')}
                />
                <PasswordInput
                  mt='lg'
                  id='password'
                  placeholder='password'
                  label='Password*'
                  description='Must be min 5 char'
                  {...handleForm.getInputProps('password')}
                />
                <Group mt='xl' position='right'>
                  <Button leftIcon={<IconDatabase size={14} />} color='blue' type='submit'>
                    新規登録する
                  </Button>
                </Group>
              </form>
            </Modal>

            <Modal
              opened={isLoginOpened}
              onClose={handleLoginClose}
              title='ログインをお願いします'
              centered
              withCloseButton={false}
              size='lg'
            >
              <form onSubmit={handleForm.onSubmit(handleLoginSubmit)}>
                <TextInput
                  mt='md'
                  id='email'
                  label='Email*'
                  placeholder='example@gmail.com'
                  {...handleForm.getInputProps('email')}
                />
                <PasswordInput
                  mt='lg'
                  id='password'
                  placeholder='password'
                  label='Password*'
                  description='Must be min 5 char'
                  {...handleForm.getInputProps('password')}
                />
                <Group mt='xl' position='right'>
                  <Button leftIcon={<IconDatabase size={14} />} color='blue' type='submit'>
                    ログイン
                  </Button>
                </Group>
              </form>
            </Modal>

            <Button className=' hover:transform-none' onClick={handleLoginOpen}>
              ログイン
            </Button>

            <Button className=' hover:transform-none' onClick={handleSignUpOpen}>
              新規登録
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
