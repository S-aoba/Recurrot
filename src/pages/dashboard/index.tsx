import { WrapperLayout } from '@/component/layout/WrapperLayout'
import { Card } from '@/component/ui/Card'

const Dashboard = () => {
  return (
    <WrapperLayout>
      <main className=' flex h-fit justify-center'>
        <div className=' grid w-9/12 grid-cols-3 gap-10 py-5'>
          <Card />
        </div>
      </main>
    </WrapperLayout>
  )
}

export default Dashboard
