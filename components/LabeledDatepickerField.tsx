import { FormControl, Text } from '@chakra-ui/react'
import { parseDate } from '@internationalized/date'
import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@/components/DatePicker/DatePicker'

interface LabeledDatepickerFieldProps {
	name: string
	label?: string
	size?: DatePickerProps['size'] | 'sm'
	showLabel?: DatePickerProps['showLabel']
	placeholder?: string
	isRequired?: boolean
}

function LabeledDatepickerField({
	name,
	label,
	size,
	showLabel,
	placeholder,
	isRequired,
}: LabeledDatepickerFieldProps) {
	const {
		control,
		formState: { errors, isSubmitting },
	} = useFormContext()
	const error = get(errors, name)?.message as string

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControl isInvalid={!!error}>
					<DatePicker
						isDisabled={isSubmitting}
						label={
							<Text fontSize="sm">
								{label}
								{isRequired && (
									<Text color={'red.500'} as="span" fontWeight={900}>
										*
									</Text>
								)}
							</Text>
						}
						value={field.value ? parseDate(field.value.split('T')[0]) : (null as any)}
						onChange={(value) => field.onChange(value?.toString() || null)}
						onBlur={field.onBlur}
						error={error}
						size={size}
						showLabel={showLabel}
						placeholder={placeholder}
					/>
				</FormControl>
			)}
		/>
	)
}

export default LabeledDatepickerField
