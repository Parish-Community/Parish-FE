export interface FilterModeProps {
  label: string;
  key: React.Key;
}
export interface SearchProps {
  className?: string;
  changeHandler?: (searchText: string) => void;
  shape?: "circle" | "rectangle";
}
