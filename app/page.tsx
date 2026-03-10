'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function Page() {

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);

  const handleOpenDialog = () => {
    setEditingExpense(null)
    setIsDialogOpen(true)
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
        </div>

        {/* Lista Gastos */}

      </div>

    </div>
  )
}
