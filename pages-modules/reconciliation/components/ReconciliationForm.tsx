import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'

import { useAutomationReconciliation } from '@/pages-modules/reconciliation/mutations'
import { useAccountOptions, useAccountTypeOptions } from '@/pages-modules/reconciliation/queries'
import { ReconciliationSchema } from '@/pages-modules/reconciliation/validation'

import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useFormContext, useWatch } from 'react-hook-form'
import { usePrevious } from 'react-use'

import Form from '@/components/Form'
import LabeledDatepickerField from '@/components/LabeledDatepickerField'
import LabeledExcelField from '@/components/LabeledExcelField'
import LabeledSelectField from '@/components/LabeledSelectField'
import LabeledTextField from '@/components/LabeledTextField'

type FormStep = 1 | 2

const Step1 = ({ onSubmit }: { onSubmit: () => void }) => {
	const { setValue } = useFormContext()
	const accountOptions = useAccountOptions().data || []

	const accountValue = useWatch({ name: 'account' })?.value
	const previousAccountValue = usePrevious(accountValue)
	const accountTypeValue = useWatch({ name: 'accountType' })?.value

	const typeOptions = useAccountTypeOptions(accountValue).data || []

	useEffect(() => {
		if (accountValue !== previousAccountValue) {
			setValue('accountType', null)
		}
	}, [accountValue, previousAccountValue, setValue])

	return (
		<Box>
			<Text fontSize="sm" fontWeight={400} color="gray.600" textAlign="center">
				Which type of account you want to reconcile?
			</Text>
			<SimpleGrid columns={2} spacing={8} mt={7}>
				<LabeledSelectField options={accountOptions} name="account" placeholder="Choose an account" />
				<LabeledSelectField
					options={typeOptions}
					name="accountType"
					placeholder="Account type"
					noOptionsMess="Choose an account first"
				/>
			</SimpleGrid>
			<Button onClick={onSubmit} visibility={accountTypeValue != null ? 'visible' : 'hidden'} w="full" size="lg" mt={8}>
				Next
			</Button>
		</Box>
	)
}

const Step2 = () => {
	const account = useWatch({ name: 'account' })
	const accountType = useWatch({ name: 'accountType' })
	const { formState } = useFormContext()

	return (
		<Box>
			<Text fontSize="sm" fontWeight={400} color="gray.600" textAlign="center">
				{`Reconciliation report for ${account?.label} - ${accountType?.label}`}
			</Text>
			<SimpleGrid spacing={6} mt={8}>
				<LabeledTextField name="accountNo" label="Account number" />
				<LabeledDatepickerField name="startDate" label="Starting balance date" />
				<LabeledDatepickerField name="endDate" label="Ending balance date" />
				{account?.value === 'partner' && <LabeledExcelField name="excel" label="Upload Excel file" />}
			</SimpleGrid>
			<Button
				type="submit"
				w="full"
				size="lg"
				mt={8}
				isDisabled={!formState.isValid}
				isLoading={formState.isSubmitting}
			>
				Reconcile
			</Button>
		</Box>
	)
}

type ReconciliationFormProps = {
	mutation: ReturnType<typeof useAutomationReconciliation>
}

export const ReconciliationForm = ({ mutation }: ReconciliationFormProps) => {
	const toast = useToast({ status: 'error', description: 'Something went wrong.' })
	const [parent] = useAutoAnimate()
	const [step, setStep] = useState<FormStep>(1)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const router = useRouter()

	const handleClose = () => {
		setStep(1)
		onClose()
	}

	return (
		<>
			<Button onClick={onOpen}>Start</Button>
			{isOpen && (
				<Modal isOpen={isOpen} onClose={handleClose} blockScrollOnMount={false}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Reconciliation account</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Form
								schema={ReconciliationSchema}
								onSubmit={async (data) => {
									try {
										await mutation.mutateAsync(data)
										setStep(1)
										onClose()
									} catch (error) {
										toast()
									}
								}}
							>
								<Box ref={parent}>
									{step === 1 && <Step1 onSubmit={() => setStep(2)} />}
									{step === 2 && <Step2 />}
								</Box>
							</Form>
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</>
	)
}
