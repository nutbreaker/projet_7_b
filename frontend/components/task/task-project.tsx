'use client';

import Form from 'next/form';
import { usePathname } from 'next/navigation';
import Tag from '@/components/tag/tag';
import Comment from '@/components/comment/comment';
import AddComment from '@/components/comment/add-comment';
import Button from '@/components/buttons/button';
import type { TaskProps } from './task.type';
import { dateFormatter } from '@/utils/date-formatter';
import { nameFormatter } from '@/utils/name.formatter';

import styles from './task-project.module.css';
import { useState } from 'react';

export default function TaskProject({ id, userName, title, description, status, comments, assignees, dueDate }: TaskProps) {
    const pathname = usePathname();
    const formattedDate = dateFormatter(dueDate);
    const commentsCount = comments.length;
    const statusValues = {
        'TODO': { type: 'error' as const, label: 'A faire' },
        'IN_PROGRESS': { type: 'warning' as const, label: 'En cours' },
        'DONE': { type: 'success' as const, label: 'Terminée' }
    };
    const assigneesEls = assignees.map((assignee, index) => (
        <span className={styles['task-project-assignee']} key={index}>
            <Tag type='grey' className={styles['task-project-assignee-initials']}>{nameFormatter(assignee.name)}</Tag>
            <Tag type='grey'>{assignee.name}</Tag>
        </span>
    ));
    const [isTextareaEmpty, setIsTextareaEmpty] = useState(true);
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsTextareaEmpty(e.target.value.trim().length === 0);

    return (
        <article className={styles['task-project']}>
            <div className={styles['task-project-header']}>
                <h5 className={`headings-h5-neutral-grey-800`}>
                    {title}
                    <Tag
                        className={styles['task-project-header-tag']}
                        type={statusValues[status].type}
                    >{statusValues[status].label}</Tag>
                </h5>
                <p className={`body-s-neutral-grey-600`}>{description}</p>

                <div className={styles['task-project-menu-container']}>
                    <button popoverTarget='settings' className={styles['task-project-menu-button']} aria-label="menu"></button>
                    <nav popover='' id='settings' className={styles['task-project-menu-nav']}>
                        <ul>
                            <li>Editer</li>
                            <li>Supprimer</li>
                        </ul>
                    </nav>
                </div>
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
                        {comments.map((comment, index) => <Comment key={index} authorName={comment.author.name} createdAt={comment.createdAt} content={comment.content} />)}

                        <Form className={styles['task-project-form']} action={pathname}>
                            <AddComment onChange={handleTextChange} authorName={userName} />
                            <Button className={styles['task-project-form-button']} isPending={false} disabled={isTextareaEmpty}>Envoyer</Button>
                        </Form>
                    </div>
                </details>
            </div>
        </article>
    );
}