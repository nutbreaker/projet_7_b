import Tag from '@/components/tag/tag';
import { nameFormatter } from '@/utils/name.formatter';

import styles from './card-project.module.css';

type CardProjectProps = {
    title: string,
    description: string,
    owner: { name: string },
    members: [{ name: string }],
    tasks: [{ status: string }]
}

export default function CardProject({ title, description, owner, members, tasks }: CardProjectProps) {
    const teamCount = members.length + 1;
    const tasksCount = tasks.length;
    const tasksDoneCount = tasks.filter(task => task.status === 'DONE').length;
    const progression = (tasksCount && `${(tasksDoneCount / tasksCount * 100) | 0}%`) || 0;
    const ownerInitials = nameFormatter(owner.name);
    const membersInitials = members.map(member => nameFormatter(member.name));

    console.log(styles['card-project-project-member']);

    return (
        <article className={styles['card-project']}>
            <div className={styles['card-project-header']}>
                <h5 className={`headings-h5-neutral-grey-800`}>{title}</h5>
                <p className={`body-s-neutral-grey-600`}>{description}</p>
            </div>

            <div className={styles['card-project-content']}>
                <p className={`body-xs-neutral-grey-600`}>Progression  <span className={`body-xs-neutral-grey-800`}>{progression}</span></p>
                <div className={styles['card-project-progression-bar']} style={{ '--project-progression': `${progression}` }}></div>
                <p className={`body-2xs-neutral-grey-600`}>{tasksDoneCount}/{tasksCount} tâches terminées</p>
            </div>

            <div className={styles['card-project-footer']}>
                <p className={`${styles['card-project-team']} body-2xs-neutral-grey-600`}>Equipes ({teamCount})</p>
                <div className={`${styles['card-project-team-content']}`}>
                    <Tag type='light' className={styles['card-project-owner']}>{ownerInitials}</Tag>
                    <Tag type='light'>Propriétaire</Tag>

                    <div className={styles['card-project-members']}>
                        {membersInitials.map(
                            (member, index) => (
                                <Tag key={index} type='grey' style={{ '--member-margin-left': `calc(${index}* var(--member-ml-coef))` }} className={styles['card-project-project-member']}>{member}</Tag>
                            )
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}