'use client'

import ExpenseForm from "@/components/expense/expense-form";
import ExpenseList from "@/components/expense/expense-list";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import useExpenses from "@/hooks/use-expenses";
import { CreateExpensePayload, Expense } from "@/interfaces/interfaces";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {

  const { createExpense, expenses, loading, error, updateExpense, deleteExpense } = useExpenses()

  // console.log(expenses)

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

  const handleUpdateExpense = async (payload: CreateExpensePayload) => {
    if (!editingExpense) return
    setFormError(null)

    try {
      await updateExpense(editingExpense.id, payload)
      setIsDialogOpen(false)
      toast.info('Gasto actualizado', {
        description: 'Gasto actualizado correctamente'
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se ha podido actualizar el gasto'
    }
  }

  const handleDeleteExpense = (expenseId: string) => { }

  const handleOpenUpdateDialog = (expense: Expense) => {
    setEditingExpense(expense)
    setIsDialogOpen(true)
  }

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
        {(error || formError) && (
          <Alert variant='destructive'>
            <AlertDescription>{error || formError}</AlertDescription>
          </Alert>
        )}

        {/* Loading  */}
        {loading && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Cargando gastos...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleOpenDialog}
            variant='action_button'>
            + Agregar Gasto
          </Button>
          {/* DialogFormulario */}
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
            isLoading={loading}
            initialData={editingExpense || undefined}
            title={editingExpense ? 'Actualizar Gasto' : 'Nuevo Gasto'}
            description={editingExpense ? 'Actualiza los datos' : 'Crea un nuevo gasto'}
            open={isDialogOpen}
            onOpenChange={handleDialogOpenChange}
          />
        </div>

        {/* Lista Gastos */}
        {!loading &&
          <ExpenseList
            expenses={expenses}
            onUpdate={handleOpenUpdateDialog}
            onDelete={handleDeleteExpense}
          />
        }

      </div>

    </div>
  )
}
