import { defineStyleConfig } from '@chakra-ui/react'

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    size: 'md',
    colorScheme: 'blue',
  },
  baseStyle: {
    fontWeight: 400,
    fontSize: 'sm',
  },
  sizes: {
    md: {
      fontSize: 'sm',
      borderRadius: 'full',
    },
  },
})
