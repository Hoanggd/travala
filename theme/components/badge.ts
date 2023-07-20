import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

export const badgeTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: 'red',
  },
  baseStyle: {
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 100,
    px: 2.5,
    py: '5px',
  },
  variants: {
    subtle: defineStyle((props) => {
      const { colorScheme: c } = props
      
      return { color: `${c}.500` }
    }),
  },
})
