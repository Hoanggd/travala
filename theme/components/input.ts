import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

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
			opacity: 0.4,
			cursor: 'not-allowed',
		},
		_placeholder: {
			color: 'rgba(190, 190, 190, 1)',
		},
	},
})

const variantOutline = definePartsStyle((props) => {
	return {
		field: {
			borderRadius: '10px',
			fontSize: 'sm',
			fontWeight: 500,
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
