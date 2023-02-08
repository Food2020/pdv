import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { PageButton, ButtonPagination } from "./PageButton";

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDobleRightIcon,
	ChevronDobleLeftIcon,
	documentArrow,
} from "../../icons/index";

import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	useFilters,
	useSortBy,
	usePagination,
	useExpanded,
} from "react-table";

function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<label className="flex gap-x-2 items-baseline">
			<span className="text-gray-700">Pesquisa: </span>
			<input
				type="text"
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				value={value || ""}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} registros...`}
			/>
		</label>
	);
}

export default function Tabela({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
		rows,
	} = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<>
			<div className="flex gap-x-2">
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
				{headerGroups.map((headerGroup) =>
					headerGroup.headers.map((column) =>
						column.Filter ? (
							<div key={column.id}>{column.render("Filter")}</div>
						) : null
					)
				)}
				<CSVLink
					data={data}
					separator={";"}
					className={`text-white
                bg-green-700
                px-1 py-1 rounded-md`}
				>
					{documentArrow("h-8 w-8")}
				</CSVLink>
			</div>
			<div className="mt-2 flex flex-col">
				<div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table
								{...getTableProps()}
								className="min-w-full divide-y divide-gray-200"
							>
								<thead className="bg-gray-50">
									{headerGroups.map((headerGroup, index) => (
										<tr key={index} {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map((column, i) => (
												<th
													key={i}
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}
												>
													{column.render("Header")}
													<span>
														{column.isSorted
															? column.isSortedDesc
																? " ▼"
																: " ▲"
															: ""}
													</span>
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody
									{...getTableBodyProps()}
									className="bg-white divide-y divide-gray-200"
								>
									{page.map((row, i) => {
										prepareRow(row);
										return (
											<tr key={i} {...row.getRowProps()}>
												{row.cells.map((cell, index) => {
													return (
														<td
															key={index}
															{...cell.getCellProps()}
															className="px-6 py-4 whitespace-nowrap"
														>
															{cell.render("Cell")}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className="py-3 flex items-center justify-between">
				<div className="flex-1 flex justify-between sm:hidden">
					<ButtonPagination
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						Previous
					</ButtonPagination>
					<ButtonPagination onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</ButtonPagination>
				</div>
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div className="flex gap-x-2">
						<span className="text-sm text-gray-700">
							Página <span className="font-medium">{state.pageIndex + 1}</span>{" "}
							de <span className="font-medium">{pageOptions.length}</span>
						</span>
						<label>
							<span className="sr-only">Items por página</span>
							<select
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								value={state.pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[5, 10, 20].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Exibir {pageSize}
									</option>
								))}
							</select>
						</label>
					</div>
					<div>
						<nav
							className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
							aria-label="Pagination"
						>
							<PageButton
								className="rounded-l-md"
								onClick={() => gotoPage(0)}
								disabled={!canPreviousPage}
							>
								<span className="sr-only">First</span>
								{ChevronDobleLeftIcon("h-5 w-5")}
							</PageButton>
							<PageButton
								onClick={() => previousPage()}
								disabled={!canPreviousPage}
							>
								<span className="sr-only">Previous</span>
								{ChevronLeftIcon("h-5 w-5")}
							</PageButton>
							<PageButton onClick={() => nextPage()} disabled={!canNextPage}>
								<span className="sr-only">Next</span>
								{ChevronRightIcon("h-5 w-5")}
							</PageButton>
							<PageButton
								className="rounded-r-md"
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
							>
								<span className="sr-only">Last</span>
								{ChevronDobleRightIcon("h-5 w-5")}
							</PageButton>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}
