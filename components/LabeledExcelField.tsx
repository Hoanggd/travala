/* eslint-disable react/display-name */
import { PropsWithoutRef, forwardRef, useRef } from 'react'

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Icon,
	Input,
	Select,
	SimpleGrid,
	Text,
} from '@chakra-ui/react'
import { cloneDeep, get, set } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'
import { FiUpload } from 'react-icons/fi'
import { TiArrowSortedDown } from 'react-icons/ti'
import * as xlsx from 'xlsx'

import { extractFile, truncateFileName } from '@/libs/common'

export interface LabeledExcelFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
	/** Field name. */
	name: string
	/** Field label. */
	label?: string
}

const COLUMNS = {
	transDate: {
		label: 'Trans.date',
	},
	name: {
		label: 'Name',
	},
	crAmount: {
		label: 'Cr.Amount',
	},
	drAmount: {
		label: 'Dr.Amount',
	},
	recDate: {
		label: 'Rec.date',
	},
} as const

type ColumnKey = keyof typeof COLUMNS

/**Values saved in form data*/
type ExcelValue = {
	file?: File
	columnOptions?: { value: string; label: string }[]
	columns?: Record<string, string>
}

export const LabeledExcelField = forwardRef<HTMLInputElement, LabeledExcelFieldProps>(({ label, name, ...props }) => {
	const {
		control,
		formState: { isSubmitting, errors },
	} = useFormContext<{ excel: ExcelValue }>()

	const error = get(errors, name)?.message as string
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel as="span" lineHeight={1} fontSize={'sm'}>
				{label}
			</FormLabel>
			<Controller
				control={control}
				name={'excel'}
				render={({ field }) => {
					const value = field.value
					const file = value?.file
					const columnOptions = value?.columnOptions
					const { name, extension } = extractFile(file)
					const truncatedName = `${truncateFileName(name)}.${extension}`

					return (
						<Box>
							<HStack>
								<Button
									isDisabled={isSubmitting}
									onClick={() => inputRef.current?.click()}
									w="135px"
									variant="outline"
									rightIcon={<Icon as={FiUpload} />}
								>
									Upload
								</Button>
								<Box>
									<Input
										{...props}
										ref={inputRef}
										onChange={(e) => {
											const file = e.target.files?.[0]

											if (file) {
												const reader = new FileReader()
												reader.onload = function (e) {
													const data = e.target?.result
													const readedData = xlsx.read(data, { type: 'binary' })
													const wsname = readedData.SheetNames[0]
													const ws = readedData.Sheets[wsname]

													/* Convert array to json*/
													const dataParse = xlsx.utils.sheet_to_json(ws, { header: 1 })
													const columnOptions = dataParse[0] as string[]
													field.onChange({
														file,
														columnOptions: columnOptions.map((item) => ({ value: item, label: item })),
													})
												}
												reader.readAsBinaryString(file)
											}
										}}
										accept=".xls,.xlsx,.csv,.tsv"
										display="none"
										type="file"
										size="lg"
									/>
									{file && (
										<Text fontSize="sm" color="blue.500" fontWeight={500}>
											{truncatedName}
										</Text>
									)}
								</Box>
							</HStack>
							{/* Temporary hide column options */}
							{false && columnOptions && (
								<SimpleGrid columns={5} mt={6} rounded="10px" borderWidth={'1px'} overflow="hidden">
									{Object.keys(COLUMNS).map((columnKey) => {
										const columnName = COLUMNS[columnKey as ColumnKey].label

										return (
											<Box key={columnKey}>
												<Box bg="#FBFBFB" pos="relative">
													<HStack spacing={1} pos="absolute" top={2.5} left={4}>
														<Text color="gray.600" fontSize="xs" fontWeight={500}>
															{columnName}
														</Text>
														<Icon boxSize={4} color="gray.400" as={TiArrowSortedDown} />
													</HStack>
													<Select
														variant="unstyled"
														borderBottomWidth="1px"
														borderRadius={0}
														color="transparent"
														cursor="pointer"
														h={10}
														onChange={(e) => {
															const selected = e.target.value
															const newValue = set(cloneDeep(value), `columns.${columnKey}`, selected)
															field.onChange(newValue)
														}}
														sx={{
															'> *': {
																color: 'gray.800',
															},
														}}
													>
														{columnOptions?.map((item, index) => (
															<option key={item.value + index} value={item.value}>
																{item.label}
															</option>
														))}
													</Select>
												</Box>
												<Flex fontSize="sm" p={4} pr={2} alignItems="center" h={'60px'}>
													<Text noOfLines={1} wordBreak="break-all">
														{value.columns?.[columnKey] ?? ''}
													</Text>
												</Flex>
											</Box>
										)
									})}
								</SimpleGrid>
							)}
						</Box>
					)
				}}
			/>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	)
})

export default LabeledExcelField
