import { PropsWithoutRef, ReactNode, useState } from 'react'

import { Button, HStack, Text, chakra } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { isFunction } from 'lodash'
import { FormProvider, UseFormProps, useForm } from 'react-hook-form'
import { z } from 'zod'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  children?: ReactNode
  submitText?: string
  schema?: S | ((v: z.infer<S>) => S)
  onSubmit: (
    values: z.infer<S>,
    { reset }: { reset: () => void }
  ) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>['defaultValues']
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = 'FORM_ERROR'

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: 'all',
    resolver: schema
      ? (values, context, options) => {
          const zodSchema: S = isFunction(schema) ? schema(values) : schema
          return zodResolver(zodSchema)(values, context, options)
        }
      : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <FormProvider {...ctx}>
      <chakra.form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values, { reset: ctx.reset })) || {}
          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value)
            } else {
              ctx.setError(key as any, {
                type: 'submit',
                message: value,
              })
            }
          }
        })}
        className="form"
        {...props}
      >
        {children}

        {formError && (
          <Text role="alert" fontSize="sm" color="red.500">
            {formError}
          </Text>
        )}

        {submitText && (
          <HStack justifyContent="flex-end">
            <Button
              mt={8}
              w="full"
              type="submit"
              isDisabled={ctx.formState.isSubmitting || !ctx.formState.isValid}
            >
              {submitText}
            </Button>
          </HStack>
        )}
      </chakra.form>
    </FormProvider>
  )
}

export default Form
