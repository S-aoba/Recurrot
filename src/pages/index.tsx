import { Alert, Anchor, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { IconDatabase } from '@tabler/icons-react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No email provided'),
  password: Yup.string().required('No password provided').min(5, 'Password should be min 5 chars'),
})

export type AuthForm = {
  email: string
  password: string
}

const Home = () => {
  const [error, setError] = useState('')

  const [isRegister, setIsRegister] = useState(false)

  const router = useRouter()

  const handleForm = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: handleForm.values.email,
          password: handleForm.values.password,
        })
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: handleForm.values.email,
        password: handleForm.values.password,
      })
      handleForm.reset()
      router.push('/dashboard/new-questions')
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }

  return (
    <div className=' flex min-h-screen flex-col items-center justify-center'>
      <Head>
        <title>Recurrot</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=' flex h-fit justify-center'>
        {error && (
          <Alert my='md' variant='filled' title='Authorization Error' color='red' radius='md'>
            {error}
          </Alert>
        )}
        <form onSubmit={handleForm.onSubmit(handleSubmit)}>
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
            <Anchor
              component='button'
              type='button'
              size='xs'
              className='text-gray-300'
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
            >
              {isRegister ? 'ログインはこちら' : '新規作成はこちら'}
            </Anchor>
            <Button className=' hover:transform-none' leftIcon={<IconDatabase size={14} />} color='blue' type='submit'>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Group>
        </form>
      </main>
    </div>
  )
}
export default Home
