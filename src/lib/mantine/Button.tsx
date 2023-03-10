import { Button } from '@mantine/core'
import type { ReactNode } from 'react'

type CustomButtonProps = {
  color: 'blue' | 'yellow' | 'red'
  children: ReactNode
}

/**
 * @package
 */

export const CustomButton: React.FC<CustomButtonProps> = ({ color, children }) => {
  return (
    <Button color={color} className=' hover:transform-none'>
      {children}
    </Button>
  )
}
