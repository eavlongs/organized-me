export interface TodoItem {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    time: Date;
    createdAt: Date;
    finishedAt: Date | null;
}
