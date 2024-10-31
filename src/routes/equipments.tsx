import { DataTable } from "@/components/tables/data-table"
import { Equipment, equipmentColumns } from "@/components/columns/equipment-columns"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" 
import { AddEquipmentForm } from "@/components/forms/add-equipment-form"
import { Plus } from "lucide-react"

const data: Equipment[] = [
    {
        id: "ajjs761",
        name: "Nível",
        quantityInStock: 45
    },
    {
        id: "ajjs761",
        name: "Cabo de força",
        quantityInStock: 78
    },
    {
        id: "ajjs761",
        name: "Furadeira",
        quantityInStock: 10
    },
    {
        id: "ajjs761",
        name: "Chave Phillips",
        quantityInStock: 13
    },
    {
        id: "ajjs761",
        name: "Chave Inglesa",
        quantityInStock: 22
    },
    {
        id: "ajjs761",
        name: "Escada",
        quantityInStock: 11
    },
]

function DialogEquipment() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-400 ml-2 text-white">
                    <Plus /> Adicionar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Novo produto
                    </DialogTitle>
                    <DialogDescription>Adicione um novo produto</DialogDescription>
                </DialogHeader>

                {/* Componente de Dialog para adicionar novo equipamento */}
                <AddEquipmentForm />

            </DialogContent>
        </Dialog>
    )
}

export function Equipments() {
    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-semibold">Equipamentos</h1>
            <DataTable data={data} columns={equipmentColumns} filter="name" dialogTable={DialogEquipment()} />
        </div>
    )
}