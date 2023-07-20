import { useQuery } from '@tanstack/react-query'

import { ACCOUNT_OPTIONS, CMS_TYPE_OPTIONS, PARTNER_TYPE_OPTIONS, WALLET_TYPE_OPTIONS } from '@/constants/options'

export const useAccountOptions = () => {
	return useQuery({
		queryKey: ['useAccountOptions'],
		queryFn: () => {
			return ACCOUNT_OPTIONS
		},
	})
}

export const useAccountTypeOptions = (account: string) => {
	return useQuery({
		queryKey: ['useAccountTypeOptions', account],
		queryFn: () => {
			if (account === 'wallet') {
				return WALLET_TYPE_OPTIONS
			}
			if (account === 'cms') {
				return CMS_TYPE_OPTIONS
			}
			if (account === 'partner') {
				return PARTNER_TYPE_OPTIONS
			}
			return []
		},
	})
}
