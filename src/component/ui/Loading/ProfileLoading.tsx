import { Button, Skeleton } from '@mantine/core'

export const ProfileLoading = () => {
  return (
    <main className=' flex h-fit flex-1 justify-center'>
      <div className=' flex w-full max-w-[1200px] justify-center px-8 '>
        <div className=' flex h-fit w-full items-center justify-center py-5 '>
          <div className=' w-full max-w-[700px] rounded-lg border-[3px] border-solid border-gray-200 shadow-lg'>
            <div className=' flex flex-col items-center justify-center gap-y-5 rounded-t bg-[#1976d2] p-5'>
              <Skeleton height={56} width={50} circle />
              <Button>変更する</Button>
            </div>
            <div className=' flex flex-col items-center p-5'>
              <div className=' flex w-11/12 flex-col gap-y-5'>
                <div>
                  ユーザーネーム
                  <Skeleton height={45} className=' w-full' />
                </div>
                <div className=' w-full'>
                  自己紹介
                  <Skeleton className=' h-52 w-full' />
                </div>
                <div className=' flex w-full flex-col gap-y-3'>
                  <div>
                    Twitter
                    <Skeleton height={45} width={50} className=' w-full' />
                  </div>
                  <div>
                    Github
                    <Skeleton height={45} width={50} className=' w-full' />
                  </div>
                </div>
                <div>
                  Website
                  <Skeleton height={45} width={50} className=' w-full' />
                </div>
                <div className=' flex w-full justify-between'>
                  <Button color='blue' type='button'>
                    変更する
                  </Button>
                  <Button color='red' type='button'>
                    ユーザーを削除する
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}