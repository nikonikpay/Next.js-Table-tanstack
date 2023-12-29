'use client'
import {ColumnDef}                 from "@tanstack/table-core";
import {Person}                    from "@/people";
import {allowedDisplayValues}      from "next/dist/compiled/@next/font/dist/constants";
import {Button}                    from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
}                                  from "@/components/ui/dropdown-menu";
import {ArrowUpDown, MoreVertical} from "lucide-react";
import {Checkbox}                  from "@/components/ui/checkbox";


export const columns: ColumnDef<Person>[] = [

    {
        id    : 'select',
        header: ({table}) => {
           return  <Checkbox checked = {table.getIsAllPageRowsSelected()}
                      onCheckedChange = {(value) => {
                          table.toggleAllPageRowsSelected(!!value)
                      }}
            />

        },
        cell: ({row})=>{
          return   <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value=>{
                row.toggleSelected(!!value)
            })}

            />
        }

    },

    {
        header     : ({column}) => {

            return (
                <Button className = {'ghost'}
                        onClick = {() => {
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }}
                >

                    Person Id
                    <ArrowUpDown className = {'ml-2 h-4 w-4'} />


                </Button >

            )

        },
        accessorKey: "id"
    },

    {
        header     : "First name",
        accessorKey: "first_name"
    },
    {
        header     : "Last Name",
        accessorKey: "last_name"

    },
    {
        header     : "Email",
        accessorKey: "email"
    },
    {
        header     : "Gender",
        accessorKey: "gender"
    },
    {
        header     : "Date of Birth",
        accessorKey: "date_of_birth",
        cell       : ({row}) => {
            const date_of_birth = row.getValue('date_of_birth');
            const formattedDate = new Date(date_of_birth as string).toLocaleDateString()

            return <div className = {'font-medium'}>{formattedDate}</div >

        },
        enableSorting : false,
        enableHiding: false
    },
    {
        id  : 'actions',
        cell: ({row}) => {

            const person = row.original
            const personId = person.id

            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant = {'ghost'}
                                className = {'w-8 h-8 p-0'}
                        >
                            <MoreVertical className = {'h-4 w-4'} />


                        </Button >


                    </DropdownMenuTrigger >

                    <DropdownMenuContent className = {'bg-white'}>
                        <DropdownMenuLabel >
                            Actions
                        </DropdownMenuLabel >
                        <DropdownMenuItem onClick = {
                            () => {
                                navigator.clipboard.writeText(personId.toString())

                            }

                        }
                        >Copy User name</DropdownMenuItem >
                    </DropdownMenuContent >

                </DropdownMenu >


            )
        }
    }


]