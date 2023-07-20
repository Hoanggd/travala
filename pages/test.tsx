import React from "react"

import {
	Box,
	Button,
	Container,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure,
} from "@chakra-ui/react"
import { z } from "zod"

import Form from "@/components/Form"
import LabeledDatepickerField from "@/components/LabeledDatepickerField"
import LabeledTextField from "@/components/LabeledTextField"

function TestPage() {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Container size="xl" py={10}>
			<Stack>
				<Box>
					<Button onClick={onOpen}>Open Modal</Button>
					<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Modal Title</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Form
									schema={z.object({
										number: z.string().min(1),
										date: z.string().min(1),
									})}
									onSubmit={async (e) => {
										console.log(e)
									}}
									submitText="Reconcile"
								>
									<Stack spacing={6}>
										<LabeledTextField label="Account number" name="number" />
										<LabeledTextField label="Starting balance date" name="date" />
										<LabeledDatepickerField label="Starting balance date" name="date2" />
									</Stack>
								</Form>
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
			</Stack>
		</Container>
	)
}

export default TestPage
