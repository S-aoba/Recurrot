import { MainNavTab } from './MainNavTab'
import { SubNavTab } from './SubNavTab'

/**
 * @package
 */

export const Navigation = () => {
  return (
    <div className=' flex justify-center'>
      <nav className=' w-full'>
        <div className=' flex w-full justify-center border-t-0 border-l-0 border-r-0 border-b border-solid border-gray-200'>
          <div className=' flex w-9/12 list-none gap-x-5 py-3 text-sm'>
            <MainNavTab />
          </div>
        </div>
        <div className=' flex w-full justify-center border-t-0 border-l-0 border-r-0 border-b border-solid border-gray-200'>
          <div className=' flex w-9/12 list-none gap-x-5 py-3 text-sm'>
            <SubNavTab />
          </div>
        </div>
      </nav>
    </div>
  )
}
