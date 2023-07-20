import { ReconciliationDto } from '@/pages-modules/reconciliation/validation'

import { Reconciliation } from '@/types/reconcilitation'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'

import axios from '@/config/axios'

type ReconciliationResponse = {
	data: {
		reconciliationInfo: {
			accountStatementInfo: {
				totalAmount: number
				transactions: number
			}
			bankStatementInfo: {
				totalAmount: number
				transactions: number
			}
			data: Reconciliation[]
			differenceInfo: {
				accountStatementAmount: number
				accountStatementTransactions: string
				bankStatementAmount: number
				bankStatementTransactions: string
			}
			matchedInfo: {
				accountStatementAmount: number
				accountStatementTransactions: string
				bankStatementAmount: number
				bankStatementTransactions: string
			}
		}
	}
}

export const useAutomationReconciliation = () => {
	return useMutation({
		async mutationFn(data: ReconciliationDto) {
			let request

			if (data.account.value === 'partner') {
				const formData = new FormData()
				formData.append('startDate', dayjs(data.startDate).format('YYYYMMDD'))
				formData.append('endDate', dayjs(data.endDate).format('YYYYMMDD'))
				formData.append('template', data.accountType.value)
				formData.append('accountNo', data.accountNo)
				formData.append('file', data.excel.file)

				request = axios.post<ReconciliationResponse>('/api/AutomationReconciliation/compare-data-excel', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
			} else {
				request = axios.post<ReconciliationResponse>('/api/AutomationReconciliation/compare-data', {
					startDate: Number(dayjs(data.startDate).format('YYYYMMDD')),
					endDate: Number(dayjs(data.endDate).format('YYYYMMDD')),
					accountType: data.accountType.value,
					accountNo: data.accountNo,
				})
			}

			const res = await request
			const reconciliationInfo = res.data?.data?.reconciliationInfo || {}
			// const matchedCount = transactions?.filter((item) => item.matched)?.length
			// const bankStatementCount = transactions?.length
			// const accountStatementCount = transactions?.filter((item) => item.matchNarraration)?.length

			return {
				account: data.account.value,
				accountNo: data.accountNo,
				startDate: dayjs(data.startDate).format('MMMM DD YYYY'),
				endDate: dayjs(data.endDate).format('MMMM DD YYYY'),
				description: `Reconciliation report for ${data.account?.label} - ${data.accountType?.label}`,
				...reconciliationInfo,
				// transactions,
				// matchedCount,
				// bankStatementCount,
				// accountStatementCount,
			}
		},
		onError(e) {
			console.log('Error', e)
		},
	})
}
