export interface FilterOption {
  value: string;
  label: string;
}

export interface ColumnFilterConfig {
  columnId: string;
  label: string;
  placeholder?: string;
  triggerClass?: string;
  options: FilterOption[];
  filterFn?: (row: any, columnId: string, filterValue: string[]) => boolean;
  allowNotEqual?: boolean; // Allow "not equal" mode
  defaultNotEqual?: boolean; // Default state for "not equal" mode
}
