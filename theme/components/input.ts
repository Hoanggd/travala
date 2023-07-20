import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.8,
      cursor: 'not-allowed',
    },
    _placeholder: {
      color: 'gray.400',
    },
  },
})

const variantOutline = definePartsStyle((props) => {
  return {
    field: {
      borderRadius: '6px',
      fontSize: 'sm',
      _focusVisible: {
        borderColor: 'purple.500',
        boxShadow: `0 0 0 3px rgba(129,90,213,0.2)`,
        _hover: {
          borderColor: 'purple.500',
        },
      },
      _focus: {
        borderColor: 'purple.500',
        boxShadow: `0 0 0 3px rgba(129,90,213,0.2)`,
        _hover: {
          borderColor: 'purple.500',
        },
      },
      _invalid: {
        borderColor: 'red.500',
        boxShadow: 'none',
      },
    },
  }
})

const variantFilled = definePartsStyle((props) => {
  return {
    field: {
      fontWeight: 'semibold', // change font weight to semibold
    },
  }
})

const variants = {
  outline: variantOutline,
  filled: variantFilled,
}

const size = {
  md: defineStyle({
    fontSize: 'sm',
    px: '4',
    h: '10',
    borderRadius: 'none',
  }),
}

const sizes = {
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
})
