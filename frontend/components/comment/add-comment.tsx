import Tag from '@/components/tag/tag';
import { nameFormatter } from '@/utils/name.formatter';

import styles from './add-comment.module.css';

type AddCommentProps = {
    authorName: string, 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement, Element>) => void
}

export default function AddComment({ authorName, onChange }: AddCommentProps) {
    return (
        <div className={styles['task-add-comment']}>
            <Tag type='light' className={styles['task-add-comment-initials']}>{nameFormatter(authorName)}</Tag>

            <textarea 
            id="comment-content" 
            onChange={onChange}
            className={'body-2xs-black'} 
            name="comment-content" 
            placeholder='Ajouter un commentaire...'></textarea>
        </div>
    );
}