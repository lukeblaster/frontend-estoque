import { MovementTable } from "@/components/tables/movement-table";

export function Movimentations() {

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-semibold">Movimentações</h1>
            <MovementTable />
        </div>
    )
}