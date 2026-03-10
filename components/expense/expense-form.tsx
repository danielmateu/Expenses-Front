'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { CreateExpensePayload, Expense } from '@/interfaces/interfaces';
// import { CreateExpensePayload, Expense } from '@/hooks/use-expenses';

const expenseFormSchema = z.object({
    description: z
        .string()
        .min(3, 'La descripción debe tener al menos 3 caracteres.')
        .max(255, 'La descripción debe tener máximo 255 caracteres.'),
    amount: z
        .number()
        .min(0.01, 'El monto debe ser mayor a cero.')
        .max(999999.99, 'El monto es demasiado grande.'),
    category: z
        .string()
        .min(2, 'La categoría debe tener al menos 2 caracteres.')
        .max(50, 'La categoría debe tener máximo 50 caracteres.'),
    date: z
        .string()
        .refine(
            (date) => !isNaN(Date.parse(date)),
            'La fecha debe ser una fecha válida.'
        ),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

interface ExpenseFormProps {
    onSubmit: (payload: CreateExpensePayload) => Promise<void>;
    isLoading: boolean;
    initialData?: Expense;
    title: string;
    description: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ExpenseForm({
    onSubmit,
    isLoading,
    initialData,
    title,
    description,
    open,
    onOpenChange,
}: ExpenseFormProps) {
    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseFormSchema),
        defaultValues: {
            description: '',
            amount: 0,
            category: 'Food',
            date: new Date().toISOString().split('T')[0],
        },
    });

    // Actualizar valores cuando cambia initialData u open
    useEffect(() => {
        if (open && initialData) {
            form.reset({
                description: initialData.description,
                amount: initialData.amount,
                category: initialData.category,
                date: initialData.date.split('T')[0],
            });
        } else if (open && !initialData) {
            form.reset({
                description: '',
                amount: 0,
                category: 'Food',
                date: new Date().toISOString().split('T')[0],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initialData?.id]);

    const handleSubmit = async (data: ExpenseFormValues) => {
        try {
            await onSubmit(data as CreateExpensePayload);
            onOpenChange(false);
            toast(initialData ? 'Gasto actualizado.' : 'Gasto registrado.');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al guardar el gasto.';
            toast.error(message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FieldGroup>
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="expense-description">
                                        Descripción
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="expense-description"
                                        placeholder="Ej: Compra en supermercado"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="amount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="expense-amount">Monto</FieldLabel>
                                    <Input
                                        {...field}
                                        id="expense-amount"
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0.01"
                                        value={field.value || ''}
                                        onChange={(e) => {
                                            const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                            field.onChange(value);
                                        }}
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="category"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="expense-category">Categoría</FieldLabel>
                                    <select
                                        {...field}
                                        id="expense-category"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <option value="Food">Comida</option>
                                        <option value="Transport">Transporte</option>
                                        <option value="Entertainment">Entretenimiento</option>
                                        <option value="Utilities">Servicios</option>
                                        <option value="Health">Salud</option>
                                        <option value="Other">Otro</option>
                                    </select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="date"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="expense-date">Fecha</FieldLabel>
                                    <Input
                                        {...field}
                                        id="expense-date"
                                        type="date"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <div className="flex gap-2 justify-end">
                        <Button type="submit" disabled={isLoading || form.formState.isSubmitting}>
                            {isLoading || form.formState.isSubmitting ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
