export interface TodoItem {
    id: string;
    userId: string;
    title: string;
    description: string;
    time: Date;
    createdAt: Date;
    finishedAt: Date | null;
}
