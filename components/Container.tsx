import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

type Container = BoxProps & {
	children: React.ReactNode
}

function Container({ children, ...rest }: Container) {
	return (
		<Box px={9} pb={4} pt={'30px'} {...rest}>
			{children}
		</Box>
	)
}

export default Container
