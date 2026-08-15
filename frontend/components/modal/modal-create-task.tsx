'use client';

import Form from "next/form";
import { useState, useActionState } from 'react';

import Modal from "./modal";
import Input from "../form-element/input";

import styles from './modal-create-task.module.css';
import Button from "../buttons/button";
import Tag from "../tag/tag";
import { Project } from "@/types/api.types";
import SelectAssignee from "../form-element/selectAssignee";

export default function ModalCreateTask(
    { id, project, formAction }: {
        id: string,
        project: Project,
        formAction: any,
    }
) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const isFormInvalid = !title || !description || !dueDate;
    const [state, action] = useActionState(
        formAction,
        {
            error: '',
            fields: {
                projectId: '',
                title: '',
                description: '',
                dueDate: '',
                status: '',
                assigneeIds: []
            },
            details: []
        }
    );

    return (
        <Modal id={id} className={styles['modal-create-task']}>
            <h4 className={'headings-h4-neutral-grey-800'}>Créer une tâche</h4>

            <Form className={styles['modal-create-task-form']} action={action}>
                <input type="hidden" name="project-id" value={project.id} />

                <Input id='title' type='text' minLength={2} defaultValue={state?.fields?.title || ''} label='Titre*' inputChangeHandler={(e) => setTitle(e.target.value.trim())} />

                <Input id='description' maxLength={1000} defaultValue={state?.fields?.description || ''} type='text' label='Description*' inputChangeHandler={(e) => setDescription(e.target.value.trim())} />

                <Input id='due-date' defaultValue={state?.fields?.dueDate || ''} type='date' label='Echéance*' inputChangeHandler={(e) => setDueDate(e.target.value.trim())} />

                <SelectAssignee  name={'assignees'} label={'Assigné à'} defaultValue={state?.fields?.assigneeIds || []} members={project.members}></SelectAssignee>

                <fieldset className={styles['modal-form-status-radio']}>
                    <legend className={'body-s-black'}>Statut :</legend>

                    <label>
                        <input type="radio" id="todo" name="task-status" value="TODO" defaultChecked={state?.fields?.status === 'TODO'} />
                        <Tag type='error'>A faire</Tag>
                    </label>

                    <label>
                        <input type="radio" id="in-progress" name="task-status" value="IN_PROGRESS" defaultChecked={state?.fields?.status === 'IN_PROGRESS'} />
                        <Tag type='light'>En cours</Tag>
                    </label>

                    <label>
                        <input type="radio" id="done" name="task-status" value="DONE" defaultChecked={state?.fields?.status === 'DONE'} />
                        <Tag type='success'>Terminée</Tag>
                    </label>
                </fieldset>

                {
                    state.error &&
                    <span className={`${styles['error-message']} body-s-system-error-red`}>{state.error}</span>
                }

                {
                    state.error && state?.details?.length > 0 &&
                    <ul>{state.details.map(({ message }, i) => <li key={i} className={`${styles['error-message']} body-s-system-error-red`}>{message}</li>)}</ul>
                }

                <Button className={styles['modal-create-task-send-button']} isPending={false} disabled={isFormInvalid}>+ Ajouter une tâche</Button>
            </Form>
        </Modal>
    );
}