import React from 'react'

import { Icon, Text, forwardRef } from '@chakra-ui/react'
import { Select as ChSelect, ChakraStylesConfig, chakraComponents } from 'chakra-react-select'
import { TiArrowSortedUp } from 'react-icons/ti'

export type SelectProps = Parameters<typeof ChSelect>[0] & { noOptionsMess?: string }
export interface Option extends Record<any, any> {
	id?: number | string
	name?: string
}

const chakraStyles: ChakraStylesConfig = {
	indicatorSeparator: () => ({
		display: 'none',
	}),
	multiValue: (provided) => ({
		...provided,
		color: 'white',
		flexShrink: 0,
		h: '33px',
		fontSize: 'md',
		mr: 2,
		borderRadius: '4px',
	}),
	dropdownIndicator: (provided, { selectProps }) => ({
		...provided,
		bg: 'none',
		color: 'gray.400',
		px: 0,
		'> svg': {
			transform: `rotate(${selectProps.menuIsOpen ? 0 : -180}deg)`,
		},
	}),
	option: (provided, { isSelected }) => {
		return {
			...provided,
			fontSize: 'sm',
			fontWeight: 500,
			bg: isSelected ? 'rgba(237, 28, 36, 0.1)' : 'white',
			color: 'gray.700',
			_hover: {
				bg: 'rgba(237, 28, 36, 0.1)',
			},
			height: '48px',
			p: 0,
			pl: 4,
		}
	},
	control: (provided) => ({
		...provided,

		'> div': {
			px: 4,
		},
	}),
	menu: (provided) => ({
		...provided,
	}),
}
const components = {
	DropdownIndicator: (props: any) => (
		<chakraComponents.DropdownIndicator {...props}>
			<Icon as={TiArrowSortedUp} />
		</chakraComponents.DropdownIndicator>
	),
}

const Select = forwardRef<SelectProps, 'div'>((props, ref) => (
	<ChSelect
		isClearable={false}
		size="lg"
		chakraStyles={chakraStyles}
		ref={ref}
		menuPosition="fixed"
		selectedOptionColorScheme="red"
		components={components}
		isSearchable={false}
		noOptionsMessage={() => (
			<Text fontSize="sm" fontWeight={500}>
				{props.noOptionsMess}
			</Text>
		)}
		{...props}
	/>
))

export default Select
