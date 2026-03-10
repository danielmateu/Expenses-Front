import { useCallback, useEffect, useState } from "react";
import { Expense, CreateExpensePayload, UseExpensesState } from '../interfaces/interfaces';
import { previousDay } from "date-fns";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export default function useExpenses() {

    const [state, setState] = useState<UseExpensesState>({
        expenses: [],
        loading: false,
        error: null
    });

    //  fetch all expenses
    const fetchExpenses = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            const response = await fetch(`${API_BASE_URL}/expenses`)
            if (!response.ok) {
                throw new Error('Error al obetener los gastos')
            }
            const data = await response.json()
            const expenses = Array.isArray(data) ? data : data.data || []
            setState((prev) => ({ ...prev, expenses, loading: false }))
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ha ocurrido un error desconocido'
            setState((prev) => ({ ...prev, error: message, loading: false }))
        }
    }, [])

    // Create a new Expense
    const createExpense = useCallback(async (payload: CreateExpensePayload) => {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            const response = await fetch(`${API_BASE_URL}/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Error al crear el gasto')
            }

            const data = await response.json()
            const newExpense = data.data || data
            setState((prev) => ({
                ...prev,
                expenses: [newExpense, ...prev.expenses],
                loading: false
            }))
            return newExpense
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ha ocurrido un error desconocido'
            setState((prev) => ({ ...prev, error: message, loading: false }))
            throw error
        }
    }, [])

    const updateExpense = useCallback(async (id: string, payload: CreateExpensePayload) => {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'No se ha podido actualizar')
            }

            const data = await response.json()
            const updatedExpense = data.data || data

            setState((prev) => ({
                ...prev,
                expenses: prev.expenses.map((e) => (e.id === id ? updatedExpense : e)),
                loading: false
            }))

            return updatedExpense

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ha ocurrido un error'
            setState((prev) => ({ ...prev, loading: false, error: message }))
            throw error
        }
    }, [])
    const deleteExpense = useCallback(async (id: string) => {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'No se ha podido eliminar el gasto')
            }

            setState((prev) => ({
                ...prev,
                expenses: prev.expenses.filter((e) => (e.id !== id)),
                loading: false
            }))
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ha ocurrido un error'
            setState((prev) => ({ ...prev, loading: false, error: message }))
            throw error
        }
    }, [])

    useEffect(() => {
        fetchExpenses()
    }, [fetchExpenses])

    return {
        ...state,
        fetchExpenses,
        createExpense,
        refetch: fetchExpenses,
        updateExpense,
        deleteExpense
    };
}