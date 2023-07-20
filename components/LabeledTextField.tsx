/* eslint-disable react/display-name */
import { PropsWithoutRef, forwardRef } from 'react'

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
	/** Field name. */
	name: string
	/** Field label. */
	label?: string
	/** Field type. Doesn't include radio buttons and checkboxes */
	type?: 'text' | 'password' | 'email' | 'number'
	outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
	helperText?: string
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
	({ label, outerProps, name, helperText, ...props }, ref) => {
		const {
			register,
			formState: { isSubmitting, errors },
		} = useFormContext()
		const error = get(errors, name)?.message as string

		return (
			<FormControl {...outerProps} isInvalid={!!error}>
				<FormLabel>{label}</FormLabel>
				<Input autoComplete="off" disabled={isSubmitting} {...register(name)} {...props} size="lg" />
				{error && <FormErrorMessage>{error}</FormErrorMessage>}
			</FormControl>
		)
	}
)

export default LabeledTextField
