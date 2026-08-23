'use client';

import { useActionState } from 'react';
import Form from 'next/form';
import Modal from "./modal";

import styles from './modal-create-project.module.css';
import Button from '../buttons/button';
import { Task } from '@/types/api.types';


export default function ModalDeleteProjectTask(
    { id, task, formAction }: {
        id: string,
        task: Task,
        formAction: any,
    }
) {
    const [state, action] = useActionState(formAction, { error: '', fields: { id: '' }, details: [] });

    return (
        <Modal id={id} className={styles['modal-delete-project']}>

            <h1 className={'headings-h4-neutral-grey-800'}>Supprimer le projet</h1>

            <p>Etes-vous sûr de vouloir supprimer la tâche ?</p>

            <Form className={''} action={action}>
                <input type="hidden" name="project-id" value={task.projectId} />
                <input type="hidden" name="task-id" value={task.id} />
                {
                    state.error &&
                    <span className={`${styles['error-message']} body-s-system-error-red`}>{state.error}</span>
                }

                {
                    state.error && state.details.length > 0 &&
                    <ul>{state.details.map(({ message }, i) => <li key={i} className={`${styles['error-message']} body-s-system-error-red`}>{message}</li>)}</ul>
                }

                <Button className={''}>Oui</Button>
            </Form>
        </Modal>
    );
}