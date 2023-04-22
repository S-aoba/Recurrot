import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { isActiveTabAtom, isMainActiveTabAtom } from '@/store/atom'

import type { MainNavTab, SubNavTab } from '../type'

export const useNavTab = (main: MainNavTab, sub: SubNavTab) => {
  const setActiveTab = useSetAtom(isActiveTabAtom)
  const setIsMainActiveTab = useSetAtom(isMainActiveTabAtom)

  useEffect(() => {
    setIsMainActiveTab(main)
    setActiveTab(sub)
  }, [setActiveTab, setIsMainActiveTab, main, sub])
}
