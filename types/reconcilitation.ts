export type Reconciliation = {
	type: number
	accNum: string
	fcyNum: string
	partTranType: 'cr' | 'dr'
	tranAMT: number
	usdAmt: number
	tranDate: string
	tranParticular: string
	matched: boolean
	matchNarraration: boolean
	narration: string
	/**YYYYMMDD */
	tranDateStr: string
}
