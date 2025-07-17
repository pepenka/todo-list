export type Task = {
    id: number;
    name: string;
    status: string;
}

export const statuses = [
    {value: 'to do', content: 'Нужно сделать'},
    {value: 'done', content: 'Сделано'}
]