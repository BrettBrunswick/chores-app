import { Chore } from './chore';

export interface Person {
    id: number,
    name: string,
    chores: Chore[],
    effortCompleted: number
}