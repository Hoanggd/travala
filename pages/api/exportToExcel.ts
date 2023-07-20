import { NextApiRequest, NextApiResponse } from 'next'

import { Reconciliation } from '@/types/reconcilitation'
import { SortingState } from '@tanstack/react-table'
import dayjs from 'dayjs'
import fs from 'fs'
import { nanoid } from 'nanoid'
import * as XLSX from 'xlsx'

import '@/config/dayjs'

import { formatCurrency } from '@/libs/common'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const data = req.body
	const sortings: SortingState = data.sorting
	const isPartnerData: boolean = data.isPartnerData
	const sorting = sortings[0]
	const transations: Reconciliation[] = data.transactions || []

	const sortedTransactions = [...transations]
		.sort((a, b) => {
			if (!sorting) {
				return 0
			}

			if (sorting.id === 'matched') {
				const matchedA = Number(a.matched)
				const matchedB = Number(b.matched)
				if (sorting.desc) {
					return matchedB - matchedA
				} else {
					return matchedA - matchedB
				}
			}

			if (sorting.id === 'tranDate') {
				const timeA = new Date(a.tranDate).getTime()
				const timeB = new Date(b.tranDate).getTime()
				if (sorting.desc) {
					return timeB - timeA
				} else {
					return timeA - timeB
				}
			}

			return 0
		})
		?.map((item: Reconciliation) => ({
			'Trans. date': dayjs(item.tranDate).format('YYYY-MM-DD'),
			Name: item.tranParticular,
			'Cr. Amount': item.partTranType === 'cr' ? formatCurrency(isPartnerData ? item.usdAmt : item.tranAMT) : '',
			'Dr. Amount': item.partTranType === 'dr' ? formatCurrency(isPartnerData ? item.usdAmt : item.tranAMT) : '',
			'Rec. date': dayjs().utcOffset(data.utcOffset).format('YYYY-MM-DD'),
			Status: item.matched ? 'Matched' : 'Unreconcile',
		}))
	const worksheet = XLSX.utils.json_to_sheet(sortedTransactions)
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

	fs.mkdirSync('./files', { recursive: true })
	const filePath = `./files/${data.fileName}-${nanoid()}.xlsx`
	XLSX.writeFile(workbook, filePath)

	const fileStream = fs.createReadStream(filePath)
	fileStream.pipe(res).on('finish', () => {
		fs.unlinkSync(filePath)
	})
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
}
