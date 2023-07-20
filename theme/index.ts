import { colors } from '@/theme/colors'
import { badgeTheme } from '@/theme/components/badge'
import { buttonTheme } from '@/theme/components/button'
import { inputTheme } from '@/theme/components/input'
import { modalTheme } from '@/theme/components/modal'
import { defineStyleConfig, extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  // fonts: {
  //   heading: `'Inter Variable', sans-serif`,
  //   body: `'Inter Variable', sans-serif`,
  // },
  colors,
  components: {
    Button: buttonTheme,
    Badge: badgeTheme,
    Modal: modalTheme,
    Input: inputTheme,
    FormLabel: defineStyleConfig({
      baseStyle: { lineHeight: 1, fontSize: 'sm' },
    }),
  },
  styles: {
    global: {
      'html, body': {
        color: 'gray.700',
        lineHeight: 'tall',
      },
      a: {
        color: 'blue.500',
      },
    },
  },
})
