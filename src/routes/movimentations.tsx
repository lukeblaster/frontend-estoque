import { DataTable } from "@/components/tables/data-table";
import { movementColumns } from "@/components/columns/movement-columns";
import { Movimentation } from "@/components/columns/movement-columns";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

function DialogMovement() {
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
                        Nova movimentação
                    </DialogTitle>
                    <DialogDescription>Adicione uma nova entrada ou saída</DialogDescription>
                </DialogHeader>

                {/* Componente de Dialog para adicionar novo equipamento */}
                <AddMovementForm />

            </DialogContent>
        </Dialog>
    )
}

export function Movimentations() {

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-semibold">Movimentações</h1>
            <DataTable data={data} columns={movementColumns} filter="product" dialogTable={DialogMovement()} />
        </div>
    )
}