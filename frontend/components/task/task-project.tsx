'use client';

import Form from 'next/form';
import { usePathname, useSearchParams } from 'next/navigation';
import { useActionState, useState, useId } from 'react';
import Tag from '@/components/tag/tag';
import Comment from '@/components/comment/comment';
import AddComment from '@/components/comment/add-comment';
import Button from '@/components/buttons/button';
import { dateFormatter } from '@/utils/date-formatter';
import { nameFormatter } from '@/utils/name.formatter';

import type { Project, Task } from '@/types/api.types';

import styles from './task-project.module.css';
import OpenModalProjectTaskButton from '../buttons/open-modal-project-task-button';
import ModalUpdateTask from '../modal/modal-update-task';
import ModalDeleteProjectTask from '../modal/modal-delete-project-task';
import { handleAddComment, handleDeleteProjectTask, handleUpdateProjectTask } from '@/app/(app)/projects/actions';

export default function TaskProject({ userName, project, task, editable = true, className = '' }: { userName: string, project?: Project, task: Task, editable?: boolean, className?: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const formattedDate = dateFormatter(task.dueDate);
    const commentsCount = task.comments.length;
    const statusValues = {
        'TODO': { type: 'error' as const, label: 'A faire' },
        'IN_PROGRESS': { type: 'warning' as const, label: 'En cours' },
        'DONE': { type: 'success' as const, label: 'Terminée' },
        'CANCELLED': { type: 'grey' as const, label: 'Annulée' }
    };
    const assigneesEls = task.assignees.map((assignee, index) => (
        <span className={styles['task-project-assignee']} key={index}>
            <Tag type='grey' className={styles['task-project-assignee-initials']}>{nameFormatter(assignee.user.name)}</Tag>
            <Tag type='grey'>{assignee.user.name}</Tag>
        </span>
    ));
    const [isTextareaEmpty, setIsTextareaEmpty] = useState(true);
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsTextareaEmpty(e.target.value.trim().length === 0);
    const editModalId = `edit-modal-${task.id}`;
    const deleteModalId = `delete-modal-${task.id}`;

    const [addCommentState, addCommentAction] = useActionState(
        handleAddComment,
        {
            error: '',
            fields: {
                projectId: '',
                taskId: '',
                content: ''
            },
            details: []
        }
    );
    const fullUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
    const anchorName = `--task-project-menu-${useId()}`;


    return (
        <article className={`${styles['task-project']} ${className}`}>
            <div className={styles['task-project-header']}>
                <h5 className={`headings-h5-neutral-grey-800`}>
                    {task.title}
                    <Tag
                        className={styles['task-project-header-tag']}
                        type={statusValues[task.status].type}
                    >{statusValues[task.status].label}</Tag>

                    {editable && <div className={styles['task-project-menu-container']}>
                        <button popoverTarget={`settings-${task.id}`} style={{ '--anchor-name': anchorName } as React.CSSProperties} className={styles['task-project-menu-button']} aria-label="menu"></button>
                        <nav popover='' id={`settings-${task.id}`} style={{ '--position-anchor': anchorName } as React.CSSProperties} className={styles['task-project-menu-nav']}>
                            <ul>
                                <li><OpenModalProjectTaskButton modalId={editModalId} label={'Editer'} /></li>
                                <li><OpenModalProjectTaskButton modalId={deleteModalId} label={'Supprimer'} /></li>
                            </ul>
                        </nav>

                        <ModalUpdateTask id={editModalId} project={project as Project} task={task} formAction={handleUpdateProjectTask} />
                        <ModalDeleteProjectTask id={deleteModalId} task={task} formAction={handleDeleteProjectTask} />
                    </div>
                    }
                </h5>
                <p className={`body-s-neutral-grey-600`}>{task.description}</p>


            </div>

            <div className={styles['task-project-content']}>
                <p className='body-xs-neutral-grey-600'>Echéance : <span className={styles['task-project-due-date']}>{formattedDate}</span></p>
                <p className={`${styles['task-project-assignees']} body-xs-neutral-grey-600`}>Assigné à : {assigneesEls}</p>
            </div>

            <hr />

            <div className={styles['task-project-footer']}>
                <details className={styles['task-project-comments']}>
                    <summary>Commentaire ({commentsCount})</summary>
                    <div className={styles['task-project-comments-container']}>
                        {task.comments.map((comment, index) => <Comment key={index} authorName={comment.author.name} createdAt={comment.createdAt} content={comment.content} />)}

                        <Form className={styles['task-project-form']} action={addCommentAction}>
                            <AddComment
                                onChange={handleTextChange}
                                redirectUrl={fullUrl}
                                projectId={task.projectId}
                                taskId={task.id} authorName={userName} />

                            {
                                addCommentState.error &&
                                <span className={`${styles['error-message']} body-s-system-error-red`}>{addCommentState.error}</span>
                            }

                            {
                                addCommentState.error && addCommentState.details.length &&
                                <ul>{addCommentState.details.map(({ message }, i) => <li key={i} className={`${styles['error-message']} body-s-system-error-red`}>{message}</li>)}</ul>
                            }

                            <Button className={styles['task-project-form-button']} isPending={false} disabled={isTextareaEmpty}>Envoyer</Button>
                        </Form>
                    </div>
                </details>
            </div>
        </article>
    );
}