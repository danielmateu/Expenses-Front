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

export function getCategoryColor (category: string): 'default' | 'secondary'| 'destructive'| 'outline' {
  const colorMap: Record<string,  'default' | 'secondary'| 'destructive'| 'outline'> = {
    Food: 'default',
    Transport: 'secondary',
    Entertainment: 'outline',
    Utilities: 'destructive',
    Health: 'secondary',
    Other: 'default'
  }
  return colorMap[category] || 'default'
}
 