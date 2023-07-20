import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

export const buttonTheme = defineStyleConfig({
	defaultProps: {
		colorScheme: 'red',
	},
	baseStyle: defineStyle((props) => {
		const c = props.colorScheme
		return {
			fontWeight: 500,
			_disabled: {
				opacity: 0.38,
			},
		}
	}),
	sizes: {
		md: {
			borderRadius: '8px',
			px: '28px',
			height: '38px',
			lineHeight: 1,
			fontSize: 'sm',
		},
		lg: {
			borderRadius: '10px',
			px: '28px',
			height: '48px',
			lineHeight: 1,
			fontSize: 'sm',
		},
		sm: {
			fontSize: 'sm',
		},
	},
	variants: {
		outline: defineStyle((props) => {
			const c = props.colorScheme
			return {
				color: `${c}.500`,
				borderColor: `${c}.500`,
			}
		}),
	},
})
