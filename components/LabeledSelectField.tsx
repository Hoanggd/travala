/* eslint-disable react/display-name */
import { forwardRef } from 'react'

import { FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import Select from '@/components/Select'

export interface LabeledSelectFieldProps {
	/** Field name. */
	name: string
	/** Field label. */
	label?: string
	options: { value: number | string; label: string }[]
	placeholder?: string
	noOptionsMess?: string
}

export const LabeledSelectField = forwardRef<HTMLInputElement, LabeledSelectFieldProps>(
	({
		label,
		name,
		placeholder,
		options = [
			{ label: 'Option 1', value: '1' },
			{ label: 'Option 2', value: '2' },
		],
		noOptionsMess,
	}) => {
		const {
			control,
			formState: { isSubmitting, errors },
		} = useFormContext()
		const error = get(errors, name)?.message as string

		return (
			<FormControl isInvalid={!!error}>
				<FormLabel>{label}</FormLabel>
				<Controller
					control={control}
					name={name}
					render={({ field }) => {
						return (
							<Select
								isDisabled={isSubmitting}
								{...field}
								noOptionsMess={noOptionsMess}
								options={options}
								placeholder={placeholder}
							/>
						)
					}}
				/>
				{error && <FormErrorMessage>{error}</FormErrorMessage>}
			</FormControl>
		)
	}
)

export default LabeledSelectField
