import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddMovementForm } from "@/components/forms/add-movement-form";

const data: Movimentation[] = [
    {
        id: "m5gr84i9",
        amount: 20,
        status: "sucesso",
        movementType: "entrada",
        product: "Alicate Universal",
    },
    {
        id: "3u1reuv4",
        amount: 7,
        status: "sucesso",
        movementType: "entrada",
        product: "Chave Phillips",
    },
    {
        id: "derv1ws0",
        amount: 17,
        status: "processando",
        movementType: "entrada",
        product: "Nível",
    },
    {
        id: "5kma53ae",
        amount: 35,
        status: "sucesso",
        movementType: "saida",
        product: "Furadeira",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "saida",
        product: "Chave Estrela",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "entrada",
        product: "Chave Estrela",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "entrada",
        product: "Chave Estrela",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "saida",
        product: "Chave Estrela",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "saida",
        product: "Chave Estrela",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "saida",
        product: "Chave Estrela",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "saida",
        product: "Chave Estrela",
    },
    {
        id: "bhqecj4p",
        amount: 47,
        status: "falha",
        movementType: "entrada",
        product: "Chave Estrela",
    },
]

export type Movimentation = {
    id: string
    amount: number
    status: "pendente" | "processando" | "sucesso" | "falha",
    movementType: "entrada" | "saida",
    product: string
}

// Colunas da tabela
export const columns: ColumnDef<Movimentation>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <div className="uppercase">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "product",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Produto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("product")}</div>,
    },
    {
        accessorKey: "movementType",
        header: () => <div className="">Tipo</div>,
        cell: ({ row }) => {
            return <div className="capitalize">{row.getValue("movementType")}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Quantidade</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            return <div className="text-right font-medium">{amount} unid.</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-neutral-50">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="hover:bg-neutral-200 cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-neutral-200 cursor-pointer">View customer</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-200 cursor-pointer">View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function MovementTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="h-full">

            {/* Cabeçalho */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar movimentações..."
                    value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("product")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-neutral-50">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize hover:bg-neutral-200 cursor-pointer"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-green-400 hover:bg-green-500 ml-2 text-white">
                            <Plus /> Adicionar
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Nova movimentação
                            </DialogTitle>
                            <DialogDescription>Adicione uma nova entrada ou saída</DialogDescription>
                        </DialogHeader>
                        
                        {/* Componente de Dialog para adicionar nova movimentação */}
                        <AddMovementForm />

                    </DialogContent>
                </Dialog>
            </div>

            {/* Conteúdo */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Rodapé */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div>

        </div>
    )
}