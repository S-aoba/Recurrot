import { Alert, Anchor, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import { IconDatabase } from '@tabler/icons-react'
import type { NextPage } from 'next'
import Image from 'next/image'

import type { AuthForm } from './Auth.page'

/**
 * @package
 */

type AUthProps = {
  windowSize: {
    width: number
    height: number
  }
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  onForm: UseFormReturnType<AuthForm, (values: AuthForm) => AuthForm>
  onSubmit: (values: AuthForm) => Promise<void>
  isRegister: boolean
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
}

export const Auth: NextPage<AUthProps> = ({
  windowSize,
  error,
  setError,
  onForm: handleForm,
  onSubmit: handleSubmit,
  isRegister,
  setIsRegister,
  isLoading,
}) => {
  return (
    <div className=' flex min-h-screen flex-col bg-[#fafafa]'>
      <header className=' flex h-14 max-h-14 items-center justify-center bg-white'>
        <div className=' flex w-full max-w-[1200px] items-center justify-between px-8'>
          <Image src='/logo.svg' height={50} width={150} alt='Recurrot' priority />
          {/* height:{windowSize.height} width:{windowSize.width} */}
        </div>
      </header>
      <main className=' flex flex-col items-center justify-center gap-y-5'>
        {windowSize.width < 500 ? (
          <Image src={'/auth.svg'} alt='authLogo' width={400} height={300} priority />
        ) : (
          <Image src={'/auth.svg'} alt='authLogo' width={500} height={300} priority />
        )}
        <div className=' flex h-fit w-full max-w-[500px] justify-center px-5'>
          {error && (
            <Alert my='md' variant='filled' title='Authorization Error' color='red' radius='md'>
              {error}
            </Alert>
          )}
          <form onSubmit={handleForm.onSubmit(handleSubmit)} className=' flex w-full flex-col gap-y-5'>
            <div className=' flex flex-col gap-y-1'>
              <span>メールアドレス</span>
              <TextInput
                id='email'
                placeholder='example@gmail.com'
                styles={{ input: { border: 'none' } }}
                className='rounded bg-white py-1 shadow-md'
                disabled={isLoading}
                {...handleForm.getInputProps('email')}
              />
            </div>
            <div className=' flex flex-col gap-y-1'>
              <span>パスワード(5文字以上)</span>
              <PasswordInput
                id='password'
                placeholder='password'
                styles={{ input: { border: 'none' } }}
                className='rounded bg-white py-1 shadow-md'
                disabled={isLoading}
                {...handleForm.getInputProps('password')}
              />
            </div>
            <Group mt='xl' position='right'>
              <Anchor
                component='button'
                type='button'
                size='xs'
                className='text-gray-600'
                onClick={() => {
                  setIsRegister(!isRegister)
                  setError('')
                }}
              >
                {isRegister ? 'ログインはこちら' : '新規作成はこちら'}
              </Anchor>
              <Button
                className=' hover:transform-none'
                leftIcon={<IconDatabase size={14} />}
                color='blue'
                type='submit'
                loading={isLoading}
              >
                {isRegister ? '新規登録' : 'ログイン'}
              </Button>
            </Group>
          </form>
        </div>
      </main>
    </div>
  )
}
