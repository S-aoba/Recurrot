import { MainNavTab } from './MainNavTab'
import { SubNavTab } from './SubNavTab'

/**
 * @package
 */

export const Navigation = () => {
  return (
    <div className=' flex flex-col items-center justify-center text-sm'>
      <NavigationWrapper>
        <MainNavTab />
      </NavigationWrapper>
      <NavigationWrapper>
        <SubNavTab />
      </NavigationWrapper>
    </div>
  )
}

type NavigationWrapperProps = {
  children: React.ReactNode
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({ children }) => {
  return (
    <div className=' flex w-full items-center justify-center border border-t-0 border-r-0 border-l-0 border-solid border-gray-200'>
      <div className=' flex w-full max-w-[1200px] items-center gap-x-3 overflow-x-scroll px-8'>{children}</div>
    </div>
  )
}
