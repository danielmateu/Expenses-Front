import { Expense } from "@/interfaces/interfaces";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { formatCurrency, formatDate, getCategoryColor } from "@/lib/utils";
import { Badge } from "../ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pencil, Trash } from "lucide-react";



interface ExpenseListProps {
    expenses: Expense[]
    onUpdate: (expense: Expense) => void
    onDelete: (expenseId: string) => void
}

const categoryLabels: Record<string, string> = {
    Food: 'Comida',
    Transport: 'Transporte',
    Entertainment: 'Entretenimiento',
    Utilities: 'Servicios',
    Health: 'Salud',
    Other: 'Otro'
}

export default function ExpenseList({
    expenses,
    onUpdate,
    onDelete,
}: ExpenseListProps) {

    if (expenses.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No hay gastos</CardTitle>
                    <CardDescription>No hay gastos registrados. Crea uno para comenzar</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    return (
        <div className="space-y-4">
            <Card className='bg-muted/50'>
                <CardHeader>
                    <CardTitle className='text-2xl'>{formatCurrency(total)}</CardTitle>
                    <CardDescription>Gasto total</CardDescription>
                </CardHeader>
            </Card>
            <div className="space-y-2">
                {expenses.map((expense) => (
                    <Card
                        key={expense.id}
                        className="transition-all hover:shadow-md"
                    >
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <Badge variant={getCategoryColor(expense.category)}>
                                            {categoryLabels[expense.category] || expense.category}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(expense.date)}
                                        </span>
                                    </div>
                                    <p className="mt-2 font-medium">
                                        {expense.description}
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="text-right">
                                        <div className="text-lg font-bold">
                                            {formatCurrency(expense.amount)}
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Ellipsis className="h-4 w-4 hover:text-red-600 transition cursor-pointer" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-40' align='start'>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    onClick={() => onUpdate(expense)}
                                                >Actualizar
                                                    <DropdownMenuShortcut>
                                                        <Pencil size={18} />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className={'text-destructive'}
                                                    onClick={() => onDelete(expense.id)}
                                                >
                                                    Eliminar
                                                    <DropdownMenuShortcut>
                                                        <Trash size={18} />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
}