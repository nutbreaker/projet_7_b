
import Tag from '@/components/tag/tag';
import { nameFormatter } from '@/utils/name.formatter';
import { dateTimeFormatter } from '@/utils/date-formatter';

import styles from './comment.module.css';

type commentProps = {
    authorName: string,
    createdAt: string,
    content: string
}

export default function Comment({ authorName, createdAt, content }: commentProps) {
    return (
        <div className={styles['task-comment']}>
            <Tag type='grey' className={styles['task-comment-initials']}>{nameFormatter(authorName)}</Tag>
            <div className={styles['task-comment-content']}>
                <h5 className={'body-s-black'}>{authorName}</h5>
                <span className={'body-2xs-neutral-grey-600'}>{dateTimeFormatter(createdAt)}</span>
                <p className={'body-2xs-black'}>{content}</p>
            </div>
        </div>
    );
}