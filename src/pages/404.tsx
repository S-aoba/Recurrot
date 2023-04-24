import { Button, Container, createStyles, Group, rem, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { WrapperLayout } from '@/component/layout/WrapperLayout'

const useStyles = createStyles((theme) => {
  return {
    root: {
      paddingBottom: rem(80),
    },

    inner: {
      position: 'relative',
    },

    image: {
      ...theme.fn.cover(),
      opacity: 0.75,
    },

    content: {
      paddingTop: rem(220),
      position: 'relative',
      zIndex: 1,

      [theme.fn.smallerThan('sm')]: {
        paddingTop: rem(120),
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      textAlign: 'center',
      fontWeight: 900,
      fontSize: rem(38),

      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(32),
      },
    },

    description: {
      maxWidth: rem(540),
      margin: 'auto',
      marginTop: theme.spacing.xl,
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
  }
})

const NotFoundPage = () => {
  const { classes } = useStyles()

  return (
    <WrapperLayout>
      <main className=' flex h-fit flex-1 justify-center bg-[#fafafa]'>
        <div className=' flex w-full max-w-[1200px] justify-center px-8'>
          <div className=' flex h-full w-full max-w-[850px] justify-center '>
            <Container className={classes.root}>
              <div className={classes.inner}>
                <div className={classes.content}>
                  <Title className={classes.title}>404</Title>
                  <Text color='dimmed' size='lg' align='center' className={classes.description}>
                    どうやらこのページは存在しないようです。残念。
                  </Text>
                  <Group position='center'>
                    <Link href={'/dashboard/new-questions'}>
                      <Button size='md' className=' bg-mainColor hover:transform-none hover:bg-mainColor'>
                        トップへ戻る
                      </Button>
                    </Link>
                  </Group>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </main>
    </WrapperLayout>
  )
}
export default NotFoundPage
