import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const baseStyleOverlay = defineStyle({
	bg: 'blackAlpha.500',
	zIndex: 'modal',
})

const baseStyleHeader = defineStyle({
	px: '35px',
	pt: '8',
	pb: '0',
	fontSize: '20px',
	fontWeight: 'bold',
	textAlign: 'center',
	lineHeight: 1.2,
})

const baseStyleCloseButton = defineStyle({
	position: 'absolute',
	top: '3',
	insetEnd: '3',
	color: 'gray.400',
	borderRadius: 10,
})

const baseStyleFooter = defineStyle({
	px: '35px',
	pt: '4',
	pb: '8',
})

const baseStyle = definePartsStyle((props) => ({
	overlay: baseStyleOverlay,
	header: baseStyleHeader,
	closeButton: baseStyleCloseButton,
	footer: baseStyleFooter,
	body: { px: 10, pb: 8 },
}))

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
	if (value === 'full') {
		return definePartsStyle({
			dialog: {
				maxW: '100vw',
				minH: '$100vh',
				my: '0',
				borderRadius: '0',
			},
		})
	}
	return definePartsStyle({
		dialog: { maxW: value, borderRadius: '16px' },
	})
}

const sizes = {
	xs: getSize('xs'),
	sm: getSize('sm'),
	md: getSize('md'),
	lg: getSize('lg'),
	xl: getSize('xl'),
	'2xl': getSize('647px'),
	'3xl': getSize('3xl'),
	'4xl': getSize('4xl'),
	'5xl': getSize('5xl'),
	'6xl': getSize('6xl'),
	full: getSize('full'),
}

export const modalTheme = defineMultiStyleConfig({
	baseStyle,
	sizes,
	defaultProps: { size: '2xl' },
})
