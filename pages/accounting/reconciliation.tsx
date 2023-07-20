import { useRouter } from 'next/router'

import { ReactElement, useMemo, useState } from 'react'

import { NextPageWithLayout } from '@/pages/_app'

import { ReconciliationForm } from '@/pages-modules/reconciliation/components/ReconciliationForm'
import { useAutomationReconciliation } from '@/pages-modules/reconciliation/mutations'

import { Reconciliation } from '@/types/reconcilitation'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
	Badge,
	Box,
	BoxProps,
	Button,
	HStack,
	Icon,
	IconButton,
	SimpleGrid,
	Text,
	Tooltip,
	VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { SortingState, createColumnHelper } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { AiOutlineCalendar } from 'react-icons/ai'

import { formatCurrency } from '@/libs/common'

import DashboardLayout from '@/layouts/DashboardLayout'

import Container from '@/components/Container'
import { DataTable } from '@/components/DataTable'
import { PageHeading } from '@/components/PageHeading'

type StatCardProps = {
	title: string
} & BoxProps

const TRANSACTION_STATUS = {
	matched: {
		label: 'Matched',
		colorScheme: 'green',
		color: 'green.800',
	},
	unreconcile: {
		label: 'Unreconcile',
		colorScheme: 'red',
		color: 'red.500',
	},
}

const columnHelper = createColumnHelper<Reconciliation>()

const StatCard = ({ title, children, ...rest }: StatCardProps) => {
	return (
		<VStack minH="120px" py={'14px'} spacing={'5px'} fontSize="14px" borderRadius={'10px'} {...rest}>
			<Text lineHeight={1.5} as={'h3'} fontSize={20} fontWeight={600}>
				{title}
			</Text>
			<VStack sx={{ p: { lineHeight: 1.5 } }} spacing={1}>
				{children}
			</VStack>
		</VStack>
	)
}

const Page: NextPageWithLayout = () => {
	const router = useRouter()
	const reconcileMutation = useAutomationReconciliation()
	const data = reconcileMutation.data
	console.log('🚀 ~ data:', data)
	const isPartnerData = data?.account === 'partner'
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(() => {
		return [
			columnHelper.accessor('tranDate', {
				header: 'Trans. date',
				cell: ({ getValue }) => (
					<HStack>
						<Icon color="gray.400" boxSize={4} as={AiOutlineCalendar} />
						<span>{dayjs(getValue()).format('ddd DD MMM')}</span>
					</HStack>
				),
				meta: {
					width: 0.7,
					sortable: true,
				},
			}),
			columnHelper.accessor('tranParticular', {
				header: 'Name',
				cell: ({ getValue }) => (
					<Tooltip label={getValue()}>
						<Text noOfLines={1} wordBreak="break-all" pr={4}>
							{getValue()}
						</Text>
					</Tooltip>
				),
			}),
			columnHelper.display({
				header: 'Cr. Amount',
				cell: ({ row }) =>
					row.original.partTranType?.toLowerCase() === 'cr'
						? formatCurrency(isPartnerData ? row.original.usdAmt : row.original.tranAMT)
						: '',
			}),
			columnHelper.display({
				header: 'Dr. Amount',
				cell: ({ row }) =>
					row.original.partTranType?.toLowerCase() === 'dr'
						? formatCurrency(isPartnerData ? row.original.usdAmt : row.original.tranAMT)
						: '',
			}),
			columnHelper.display({
				header: 'Rec. date',
				cell: () => (
					<HStack>
						<Icon color="gray.400" boxSize={4} as={AiOutlineCalendar} />
						<span>{dayjs().format('ddd DD MMM')}</span>
					</HStack>
				),
				meta: {
					width: 0.7,
				},
			}),
			columnHelper.accessor('matched', {
				header: 'Status',
				cell: ({ getValue }) => {
					const status = getValue() ? TRANSACTION_STATUS.matched : TRANSACTION_STATUS.unreconcile

					return (
						<Badge colorScheme={status.colorScheme} color={status.color}>
							{status.label}
						</Badge>
					)
				},
				meta: {
					width: 0.7,
					sortable: true,
				},
			}),
		]
	}, [isPartnerData])

	const exportMutation = useMutation({
		mutationFn: async () => {
			const fileName = `${data?.accountNo}-${dayjs(data?.startDate).format('YYYYMMDD')}-${dayjs(data?.endDate).format(
				'YYYYMMDD'
			)}`
			await fetch('/api/exportToExcel', {
				body: JSON.stringify({
					transactions: data?.data,
					fileName,
					utcOffset: dayjs().utcOffset(),
					sorting,
					isPartnerData,
				}),
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					if (response.ok) return response.blob()
					else throw new Error('Failed to download the Excel file')
				})
				.then((blob) => {
					const url = URL.createObjectURL(blob)
					const link = document.createElement('a')
					link.href = url
					link.download = `${fileName}.xlsx`
					link.click()
				})
		},
	})

	return (
		<Box>
			<Container pb={0}>
				<PageHeading
					title={data?.accountNo ? `(${data.accountNo}) Reconciliation report` : 'Account reconciliation'}
					leftElement={
						data?.accountNo ? (
							<IconButton
								onClick={() => {
									router.reload()
								}}
								icon={<ArrowBackIcon boxSize={6} />}
								variant="ghost"
								colorScheme="gray"
								aria-label="back"
							/>
						) : null
					}
					rightElement={!data?.accountNo ? <ReconciliationForm mutation={reconcileMutation} /> : null}
				/>
			</Container>
			{data && (
				<>
					<Container pt={0}>
						<Text mt={2}>{data?.description}</Text>
						<HStack mt={'18px'} justify={'space-between'}>
							<Text>
								Report between <strong>{data?.startDate}</strong> and <strong>{data?.endDate}</strong>
							</Text>
							{data?.data && (
								<Button isLoading={exportMutation.isLoading} onClick={() => exportMutation.mutate()} w={'100px'}>
									Export
								</Button>
							)}
						</HStack>
						{data?.data ? (
							<SimpleGrid columns={4} spacing={4} mt={'26px'}>
								<StatCard bg="red.100" title="Bank statement">
									<Text>Transactions: {data?.bankStatementInfo?.transactions}</Text>
									<Text>Total amount: {formatCurrency(data?.bankStatementInfo?.totalAmount)}</Text>
								</StatCard>
								<StatCard bg="yellow.100" title="Account statement">
									<Text>Transactions: {data.accountStatementInfo.transactions}</Text>
									<Text>Total amount: {formatCurrency(data.accountStatementInfo.totalAmount)}</Text>
								</StatCard>
								<StatCard bg="green.100" title="Transactions matched">
									<VStack spacing={0}>
										<Text fontWeight={600}>Bank statement</Text>
										<Text>Transactions: {data.matchedInfo.bankStatementTransactions}</Text>
										<Text>Amount: {formatCurrency(data.matchedInfo.bankStatementAmount)}</Text>
									</VStack>
									<VStack spacing={0}>
										<Text fontWeight={600}>Account statement</Text>
										<Text>Transactions: {data.matchedInfo.accountStatementTransactions}</Text>
										<Text>Amount: {formatCurrency(data.matchedInfo.accountStatementAmount)}</Text>
									</VStack>
								</StatCard>
								<StatCard bg="purple.100" title="Difference">
									<VStack spacing={0}>
										<Text fontWeight={600}>Bank statement</Text>
										<Text>Transactions: {data.differenceInfo.bankStatementTransactions}</Text>
										<Text>Amount: {formatCurrency(data.differenceInfo.bankStatementAmount)}</Text>
									</VStack>
									<VStack spacing={0}>
										<Text fontWeight={600}>Account statement</Text>
										<Text>Transactions: {data.differenceInfo.accountStatementTransactions}</Text>
										<Text>Amount: {formatCurrency(data.differenceInfo.accountStatementAmount)}</Text>
									</VStack>
								</StatCard>
							</SimpleGrid>
						) : (
							<Box>
								<Text mt={4} fontSize="2xl" color="gray.400">
									No results found
								</Text>
							</Box>
						)}
					</Container>
					{data?.data && <DataTable onSortingChange={(v) => setSorting(v)} columns={columns} data={data?.data || []} />}
				</>
			)}
		</Box>
	)
}

Page.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout>{page}</DashboardLayout>
}

export default Page
