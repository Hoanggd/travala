import React, { useEffect, useState } from 'react'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, chakra } from '@chakra-ui/react'
import {
	ColumnDef,
	Row,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

export type DataTableProps<Data extends object> = {
	data: Data[]
	columns: ColumnDef<Data, any>[]
	onSortingChange?: (value: SortingState) => void
}

export function DataTable<Data extends object>({ data, columns, onSortingChange }: DataTableProps<Data>) {
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	})

	const { rows } = table.getRowModel()

	const parentRef = React.useRef<HTMLDivElement>(null)
	const parentOffsetRef = React.useRef(0)
	React.useLayoutEffect(() => {
		parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
	}, [])

	const virtualizer = useWindowVirtualizer({
		count: rows.length,
		estimateSize: () => 45,
		scrollMargin: parentOffsetRef.current,
	})
	const items = virtualizer.getVirtualItems()

	useEffect(() => {
		onSortingChange?.(sorting)
	}, [sorting, onSortingChange])

	return (
		<Box fontSize={'sm'}>
			<Box bg="#FBFBFB" color="gray.600">
				{table.getHeaderGroups().map((headerGroup) => (
					<Box key={headerGroup.id} display="flex" w="full">
						{headerGroup.headers.map((header) => {
							const meta: any = header.column.columnDef.meta
							const width = meta?.width || 1
							const sortable = meta?.sortable

							return (
								<Box
									flex={width}
									key={header.id}
									_first={{
										pl: 9,
									}}
									height={10}
									py={0}
									display="flex"
									alignItems="center"
								>
									<Box
										fontWeight={500}
										as={sortable ? 'button' : 'div'}
										onClick={sortable ? header.column.getToggleSortingHandler() : () => {}}
										display="flex"
										alignItems="center"
									>
										<chakra.span lineHeight={1}>
											{flexRender(header.column.columnDef.header, header.getContext())}
										</chakra.span>

										{sortable && (
											<chakra.span pl="2" fontSize="xs">
												{header.column.getIsSorted() ? (
													header.column.getIsSorted() === 'desc' ? (
														<TriangleDownIcon aria-label="sorted dESC" />
													) : (
														<TriangleUpIcon aria-label="sorted ascending" />
													)
												) : (
													<TriangleUpIcon opacity={0.4} transform="rotate(90deg)" />
												)}
											</chakra.span>
										)}
									</Box>
								</Box>
							)
						})}
					</Box>
				))}
			</Box>
			<div ref={parentRef} className="List">
				<div
					style={{
						height: virtualizer.getTotalSize(),
						width: '100%',
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							transform: `translateY(${items?.[0]?.start - virtualizer.options.scrollMargin}px)`,
						}}
					>
						{items.map((virtualRow) => {
							const row = rows[virtualRow.index] as Row<any>

							return (
								<Box
									key={virtualRow.key}
									data-index={virtualRow.index}
									ref={virtualizer.measureElement}
									className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
									display="flex"
									w="full"
									_notLast={{
										borderBottomWidth: '1px',
										borderColor: '#F1F1F1',
									}}
								>
									{row.getVisibleCells().map((cell) => {
										const meta: any = cell.column.columnDef.meta
										const width = meta?.width || 1

										return (
											<Box
												flex={width}
												height={'60px'}
												py={0}
												key={cell.id}
												display="flex"
												alignItems="center"
												_first={{
													pl: 9,
												}}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Box>
										)
									})}
								</Box>
							)
						})}
					</div>
				</div>
			</div>
		</Box>
	)
}
