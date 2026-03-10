export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateExpensePayload {
    description: string;
    amount: number;
    category: string;
    date: string;
}

export interface UseExpensesState {
    expenses: Expense[]
    loading: boolean
    error: string | null
}
