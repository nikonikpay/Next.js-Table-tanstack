'use client'

import React, {useState} from 'react';
import {
    ColumnDef, ColumnFilter, ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState, VisibilityState
}                        from "@tanstack/table-core";
import {
    flexRender,
    useReactTable
}                        from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
}                        from "@/components/ui/table";
import {
    Button
}                        from "@/components/ui/button";
import {
    state
}                        from "sucrase/dist/types/parser/traverser/base";
import {Input}           from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
}                        from "@/components/ui/dropdown-menu";
import {downloadToExcel} from "@/lib/xlsx";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[]
}


export function PeopleDataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    console.log('this is row selection', rowSelection)

    const table = useReactTable({
                                    data,
                                    columns,
                                    getCoreRowModel         : getCoreRowModel(),
                                    getPaginationRowModel   : getPaginationRowModel(),
                                    getSortedRowModel       : getSortedRowModel(),
                                    getFilteredRowModel     : getFilteredRowModel(),
                                    onSortingChange         : setSorting,
                                    onColumnFiltersChange   : setColumnFilters,
                                    onColumnVisibilityChange: setColumnVisibility,
                                    onRowSelectionChange    : setRowSelection,
                                    state                   : {

                                        sorting,
                                        columnFilters,
                                        columnVisibility,
                                        rowSelection

                                    }
                                })

    return (

        <div className = {'min-h-screen bg-amber-50 p-4 '}>

            <div className = {'flex items-center py-4'}>
                <Input placeholder = {"filter first name"}
                       value = {table.getColumn('first_name')?.getFilterValue() as string || ''}
                       onChange = {e => {
                           table.getColumn('first_name')?.setFilterValue(e.target.value)
                       }}
                       className = {'max-w-sm'}

                />

                <DropdownMenu >

                    <DropdownMenuTrigger >
                        <Button variant = {'outline'}
                                className = {'ml-auto'}
                        >
                            Columns
                        </Button >

                    </DropdownMenuTrigger >

                    <DropdownMenuContent align = {'end'}
                                         className = {'bg-white'}
                    >

                        {table.getAllColumns().filter(column => column.getCanHide()).map(
                            column => {
                                return (
                                    <DropdownMenuCheckboxItem key = {column.id}
                                                              className = {'capitalize'}
                                                              checked = {column.getIsVisible()}
                                                              onCheckedChange = {(value) => {
                                                                  column.toggleVisibility(value)
                                                              }}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem >
                                )
                            }
                        )

                        }
                    </DropdownMenuContent >


                </DropdownMenu >

                <Button onClick = {() => downloadToExcel()}>
                    Export to excel
                </Button >

            </div >


            {/* table*/}
            <div className = {'rounded-md border  max-h-screen  overflow-y-scroll'}>

                <Table >
                    <TableHeader >
                        {table.getHeaderGroups().map(
                            headerGroup => {
                                return (
                                    <TableRow key = {headerGroup.id}>
                                        {headerGroup.headers.map(header => {
                                            return (

                                                <TableHead key = {header.id}>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                    }

                                                </TableHead >)
                                        })}
                                    </TableRow >
                                )
                            }
                        )}

                    </TableHeader >


                    <TableBody >
                        {
                            table.getRowModel().rows?.length ? (

                                table.getRowModel().rows.map(row => (
                                    <TableRow key = {row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key = {cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell >
                                        ))}
                                    </TableRow >
                                ))


                            ) : (

                                <TableRow >
                                    <TableCell >No result</TableCell >
                                </TableRow >
                            )
                        }

                    </TableBody >

                </Table >

            </div >

            {/*pagination*/}

            <div className = {'flex items-center  justify-start space-x-2 py-4'}>
                <Button variant = {'outline'}
                        size = {'sm'}
                        onClick = {() => {
                            table.previousPage()
                        }}
                        disabled = {!table.getCanPreviousPage()}

                >

                    Previous


                </Button >

                <Button variant = {'outline'}
                        size = {'sm'}
                        onClick = {() => {
                            table.nextPage()
                        }}
                        disabled = {!table.getCanNextPage()}

                >

                    Next


                </Button >
            </div >

            <div className = {'flex-1 text-sm text-muted-foreground'}>

                {table.getFilteredSelectedRowModel().rows.length} of {' '}
                {table.getFilteredRowModel().rows.length} row(s) selected

            </div >

        </div >


    )


}


export default PeopleDataTable

