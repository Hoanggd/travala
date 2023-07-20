import { dropRight, round, takeRight } from 'lodash'
import { z } from 'zod'

export const formatCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
}).format

export const extractFile = (file?: File) => {
	const fileParts = file?.name?.split('.')
	const fileName = dropRight(fileParts).join('.')
	const extension = takeRight(fileParts)[0]
	const fileSize = file?.size || 0

	return {
		name: fileName,
		extension,
		type: file?.type,
		size: {
			inByte: fileSize,
			inKb: round(fileSize / 1024, 2),
			inMb: round(fileSize / 1024 / 1024, 2),
		},
	}
}

export const truncateFileName = (name: string, maxLength: number = 24) => {
	if (!name) {
		return ''
	}
	const length = name.length
	if (length > maxLength) {
		const startCharacters = name.slice(0, maxLength - 3)
		const last3Characters = name.slice(-3)
		return startCharacters + '...' + last3Characters
	}
	return name
}

export const validateIf = (isValidate: boolean) => {
	return (schema: z.ZodType<any, any>) => {
		if (isValidate) {
			return schema
		}
		return z.any()
	}
}
