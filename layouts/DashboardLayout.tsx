import { useRouter } from 'next/router'

import React from 'react'

import { Link } from '@chakra-ui/next-js'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Avatar,
	Box,
	Center,
	HStack,
	Icon,
	SimpleGrid,
	Text,
	VStack,
	chakra,
} from '@chakra-ui/react'
import { dropRight, takeRight } from 'lodash'
import { IconType } from 'react-icons'
import { BiCommand, BiHelpCircle } from 'react-icons/bi'
import { LuSettings } from 'react-icons/lu'
import { MdDashboard } from 'react-icons/md'

import { Logo } from '@/components/Logo'

type MenuItemInfo = {
	label: string
	href: string
	icon?: IconType
	children?: MenuItemInfo[]
}

const MENU_ITEMS: MenuItemInfo[] = [
	{
		label: 'Dashboard',
		href: '/',
		icon: MdDashboard,
	},
	{
		label: 'Accounting',
		href: '/accounting',
		icon: BiCommand,
		children: [
			{
				label: 'Reconciliation',
				href: '/accounting/reconciliation',
			},
		],
	},
	{
		label: 'Settings',
		href: '/setting',
		icon: LuSettings,
	},
	{
		label: 'Help center',
		href: '/help-center',
		icon: BiHelpCircle,
	},
]

const MenuItemLink = ({ href, label, icon }: MenuItemInfo) => {
	const router = useRouter()
	const path = router.asPath.split('?')[0]
	const isActive = href === '/' ? path === href : path.includes(href)

	return (
		<Link
			href={href}
			bg={isActive ? 'red.100' : undefined}
			color={isActive ? 'red.500' : 'gray.700'}
			borderRightColor={isActive ? 'red.500' : 'transparent'}
			borderRightWidth={'4px'}
			_hover={{ textDecor: 'none', bg: isActive ? undefined : 'gray.100' }}
			pos={'relative'}
			pl={6}
			display="flex"
			alignItems="center"
			h="48px"
		>
			{icon && <Icon boxSize={6} as={icon} color={isActive ? 'red.500' : 'gray.400'} />}
			{!icon && <Box w={6} />}
			<Text ml="23">{label}</Text>
		</Link>
	)
}

const MenuItem = ({ children, ...restProps }: MenuItemInfo) => {
	const router = useRouter()
	const path = router.asPath.split('?')[0]

	if (children) {
		const isActive = path.includes(restProps.href)
		return (
			<Accordion defaultIndex={[0]} allowMultiple p={0}>
				<AccordionItem p={0} border="none">
					<AccordionButton p={0} pr={6} _hover={{}} color={isActive ? 'gray.600' : 'gray.400'}>
						<Box as="span" flex="1" textAlign="left" pl={6} display="flex" alignItems="center" h="48px">
							<Icon boxSize={6} as={restProps.icon} />
							<Text ml="23" color={isActive ? 'gray.900' : 'gray.700'}>
								{restProps.label}
							</Text>
						</Box>
						<AccordionIcon boxSize={6} />
					</AccordionButton>
					<AccordionPanel px={0} py={1}>
						{children.map((item) => (
							<MenuItemLink key={item.label} {...item} />
						))}
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		)
	}

	return <MenuItemLink {...restProps} />
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
	const mainMenu = dropRight(MENU_ITEMS, 2)
	const settingMenu = takeRight(MENU_ITEMS, 2)

	return (
		<>
			<chakra.aside pos="fixed" top={0} left={0} w={'240px'} bg="gray.50" h="100svh" display="flex" flexDir="column">
				<Center h={92} mb={4}>
					<Logo />
				</Center>
				<Box flex={1} overflowY="auto" pt={1}>
					<VStack align="stretch">
						{mainMenu.map((menuItem) => (
							<MenuItem key={menuItem.label} {...menuItem} />
						))}
					</VStack>
				</Box>
				<VStack align="stretch">
					{settingMenu.map((menuItem) => (
						<MenuItem key={menuItem.label} {...menuItem} />
					))}
				</VStack>
				<HStack px={6} py={7} spacing={4} shadow="0px 1px 0px 0px #F1F1F1 inset" mt={2}>
					<Avatar size="sm" border="2px" />
					<Box>
						<Text noOfLines={1} lineHeight={1} fontWeight={500}>
							Louise Thompson
						</Text>
						<Text fontSize="xs">Enterprise plan</Text>
					</Box>
				</HStack>
			</chakra.aside>
			<chakra.main pl={'240px'}>{children}</chakra.main>
		</>
	)
}

export default DashboardLayout
