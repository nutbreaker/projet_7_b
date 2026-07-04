export type TaskProps = {
    id: string,
    userName: string,
    title: string,
    description: string,
    dueDate: string,
    project: object,
    comments: [],
    assignees: [],
    status: 'TODO' | 'IN_PROGRESS' | 'DONE',
}