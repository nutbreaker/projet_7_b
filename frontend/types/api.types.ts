export type ErrorDetail = {
    field?: string[],
    message?: string[],
};

export type ErrorResponse = {
    success: false,
    message: string,
    error: string,
    details?: ErrorDetail[],
};

export type Success<T> = {
    success: true,
    message: string,
    data: T,
};

export type ProjectRole = "OWNER" | "ADMIN" | "CONTRIBUTOR";

export type PostProject = {
    name: string,
    description: string,
    contributors: User[]
}

export type ProjectMember = {
    id: string,
    role: ProjectRole,
    user: User,

    joinedAt: string,
};

export type Project = {
    id: string,
    name: string,

    description: string,
    ownerId: string,
    owner: User,
    members: ProjectMember[],

    createdAt: string,
    updatedAt: string,
};

export type ProjectWithTasks = Project & { tasks: Task[] };

export type Projects = {
    projects: Project[]
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskAssigneeIds = string[];

export type TaskAssignee = {
    id: string,

    userId: string,
    taskId: string,

    user: User,

    assignedAt: string,
};

export type User = {
    id: string,

    email: string,
    name: string,

    createdAt: string,
    updatedAt: string,
};
export type Users = {
    data: {
        users: User[]
    }
};
export type UserData = {
        user: User
};

export type CommentAuthor = {
    id: string,

    email: string,
    name: string,

    createdAt: string,
    updatedAt: string,
};

export type Comment = {
    id: string,

    content: string,
    taskId: string,

    authorId: string,
    author: CommentAuthor,

    createdAt: string,
    updatedAt: string,
};

export type Task = {
    id: string,

    title: string,
    description?: string,

    status: TaskStatus,

    priority: TaskPriority,
    dueDate: string,

    project: Project,

    projectId: string,
    creatorId: string,

    assignees: TaskAssignee[],
    comments: Comment[],

    createdAt: string,
    updatedAt: string,
};

export type Tasks = {
    tasks: Task[]
};

export type PostTask = {
    projectId: string,
    title: string,
    description: string,
    dueDate: string,
    status: TaskStatus,
    assigneeIds: TaskAssigneeIds
}