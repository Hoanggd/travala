import dayjs from 'dayjs'
import { z } from 'zod'

import { validateIf } from '@/libs/common'

export const ReconciliationSchema = (v: any) => {
	return z.object({
		account: z.object({ value: z.any(), label: z.string() }),
		accountType: z.object({ value: z.any(), label: z.string() }),
		accountNo: z.string().min(1),
		startDate: z.string().min(1),
		endDate: z
			.string()
			.min(1)
			.refine((val) => dayjs(val).isSameOrAfter(v.startDate), {
				message: 'The Ending balance date cannot be before the Starting balance date, please check again',
			}),
		excel: validateIf(v?.account?.value === 'partner')(
			z.object({
				// Temporary hide column options
				// columns: z.object({
				// 	transDate: z.string().min(1),
				// 	name: z.string().min(1),
				// 	crAmount: z.string().min(1),
				// 	drAmount: z.string().min(1),
				// 	recDate: z.string().min(1),
				// }),
				file: z.any(),
			})
		),
	})
}

export type ReconciliationDto = z.infer<ReturnType<typeof ReconciliationSchema>>
