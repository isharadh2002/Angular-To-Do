export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}