import { useRef } from 'react'

import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'
import { AriaButtonProps, useButton } from 'react-aria'

export function CalendarButton(props: AriaButtonProps<'button'>) {
	const ref = useRef(null)
	const { buttonProps } = useButton(props, ref)
	return (
		<ChakraButton
			rounded="8px"
			colorScheme="gray"
			variant="ghost"
			color="gray.600"
			{...buttonProps}
			ref={ref}
			size="sm"
			w={9}
			h={9}
		>
			{props.children}
		</ChakraButton>
	)
}

interface FieldButtonProps extends AriaButtonProps<'button'> {
	cProps?: ButtonProps
}

export function FieldButton(props: FieldButtonProps) {
	const ref = useRef(null)
	const { buttonProps } = useButton(props, ref)
	return (
		<ChakraButton
			rounded="8px"
			color="gray.600"
			colorScheme="gray"
			variant="ghost"
			{...buttonProps}
			{...props.cProps}
			ref={ref}
			size="sm"
			mr="2"
			w={9}
			h={9}
			_focusVisible={{ bg: 'gray.100' }}
		>
			{props.children}
		</ChakraButton>
	)
}
