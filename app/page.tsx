'use client'

import ExpenseForm from "@/components/expense/expense-form";
import { Button } from "@/components/ui/button"
import useExpenses from "@/hooks/use-expenses";
import { CreateExpensePayload } from "@/interfaces/interfaces";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {

  const { createExpense, expenses, loading, error } = useExpenses()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);

  const [formError, setFormError] = useState<string | null>(null);


  const handleCreateExpense = async (payload: CreateExpensePayload) => {
    setFormError(null)
    try {
      await createExpense(payload)
      setIsDialogOpen(false)
      toast.success('Gasto creado', {
        description: 'El gasto ha sido creado correctamente'
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se ha podido crear el nuevo gasto'
      setFormError(message)
      toast.error('Error', {
        description: message
      })
    }
  }

  const handleUpdateExpense = {}

  const handleOpenDialog = () => {
    setEditingExpense(null)
    setIsDialogOpen(true)
  }

  const handleDialogOpenChange = (newOpen: boolean) => {
    setIsDialogOpen(newOpen)
    if (!newOpen) {
      setEditingExpense(null)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            Expense Tracker
          </h1>
          <p className="text-muted-foreground">
            Registra y gestiona tus gastos
          </p>
        </div>

        {/* Error */}

        {/* Loading  */}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleOpenDialog}
            variant='action_button'>
            + Agregar Gasto
          </Button>
          {/* DialogFormulario */}
          <ExpenseForm
            // onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
            onSubmit={handleCreateExpense}
            isLoading={loading}
            initialData={editingExpense || undefined}
            title={editingExpense ? 'Actualizar Gasto' : 'Nuevo Gasto'}
            description={editingExpense ? 'Actualiza los datos' : 'Crea un nuevo gasto'}
            open={isDialogOpen}
            onOpenChange={handleDialogOpenChange}
          />
        </div>

        {/* Lista Gastos */}

      </div>

    </div>
  )
}
