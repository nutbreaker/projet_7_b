'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Tag from '@/components/tag/tag';
import { dateFormatter } from '@/utils/date-formatter';

import type { Task } from '@/types/api.types';

import styles from './task-dashboard.module.css';


export default function TaskDashboard({ id, title, description, status, dueDate, project, comments }: Task) {

    const pathname = usePathname();
    const params = useSearchParams()
    const { name: projectName } = project;
    const formattedDate = dateFormatter(dueDate);
    const commentsCount = comments.length;
    const statusValues = {
        'TODO': { type: 'error' as const, label: 'A faire' },
        'IN_PROGRESS': { type: 'warning' as const, label: 'En cours' },
        'DONE': { type: 'success' as const, label: 'Terminée' },
        'CANCELLED': { type: 'grey' as const, label: 'Annulée' }
    };

    return (
        <article className={styles['task-dashboard']}>
            <div className={styles['task-dashboard-header']}>
                <h4 className={`headings-h5-neutral-grey-800`}>{title}
                    <Tag
                        className={styles['task-dashboard-header-tag']}
                        type={statusValues[status].type}
                    >{statusValues[status].label}</Tag></h4>
                <p className={`body-s-neutral-grey-600`}>{description}</p>
            </div>
            <div className={styles['task-dashboard-footer']}>
                <ul>
                    <li><span className={styles['task-dashboard-project-name']}>{projectName}</span></li>
                    <li className={styles['task-dashboard-separator']}>|</li>
                    <li><span className={styles['task-dashboard-due-date']}>{formattedDate}</span></li>
                    <li className={styles['task-dashboard-separator']}>|</li>
                    <li><span className={styles['task-dashboard-comments']}>{commentsCount}</span></li>
                </ul>

                <Link className={styles['task-dashboard-link']}
                    href={{
                        pathname: pathname,
                        query: {
                            ...Object.fromEntries(params.entries()),
                            taskid: id
                        },
                    }}
                >Voir</Link>
            </div>
        </article>
    );
}