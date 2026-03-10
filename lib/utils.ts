import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

export function getCategoryColor(category: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  const colorMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    Food: 'default',
    Transport: 'secondary',
    Entertainment: 'outline',
    Utilities: 'destructive',
    Health: 'secondary',
    Other: 'default'
  }
  return colorMap[category] || 'default'
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}
