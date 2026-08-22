import Tag from '@/components/tag/tag';
import { nameFormatter } from '@/utils/name.formatter';

import styles from './add-comment.module.css';

type AddCommentProps = {
    authorName: string,
    projectId: string,
    taskId: string,
    redirectUrl: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement, Element>) => void
}

export default function AddComment({ authorName, projectId, taskId, redirectUrl, onChange }: AddCommentProps) {
    return (
        <div className={styles['task-add-comment']}>
            <Tag type='light' className={styles['task-add-comment-initials']}>{nameFormatter(authorName)}</Tag>


            <input type="hidden" name="project-id" value={projectId} />
            <input type="hidden" name="task-id" value={taskId} />
            <input type="hidden" name="redirect-url" value={redirectUrl} />

            <textarea
                aria-label="Ajouter un commentaire"
                id="comment-content"
                onChange={onChange}
                className={'body-2xs-black'}
                name="comment-content"
                placeholder='Ajouter un commentaire...'></textarea>
        </div>
    );
}