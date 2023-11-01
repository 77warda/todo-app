export interface Todo {
  id: number;
  name: string;
  complete: boolean;
  pin: boolean;
  isLoading?: boolean;
}
