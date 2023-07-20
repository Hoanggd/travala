import Head from 'next/head'

import React from 'react'

import { Box, HStack, Text } from '@chakra-ui/react'

type PageHeadingProps = {
	title: string
	description?: string
	rightElement?: React.ReactNode
	leftElement?: React.ReactNode
}
export const PageHeading = ({ title, description, rightElement, leftElement }: PageHeadingProps) => {
	return (
		<Box>
			<Head>
				<title>{title}</title>
			</Head>
			<HStack spacing={4}>
				{leftElement}
				<Text as="h1" fontSize="28px" fontWeight={600}>
					{title}
				</Text>
				{rightElement}
			</HStack>
			{description && <Text mt={2}>{description}</Text>}
		</Box>
	)
}
