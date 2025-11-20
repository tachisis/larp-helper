import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to create filter options
export const createOptions = (values: string[]) =>
  values.map(value => ({
    value: value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));
