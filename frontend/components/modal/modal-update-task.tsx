'use client';

import Form from "next/form";
import { useState, useActionState } from 'react';

import Modal from "./modal";
import Input from "../form-element/input";
import Select from "../form-element/select";

import useSearchUsers from '@/hooks/useSearchUsers';

import styles from './modal-create-task.module.css';
import Button from "../buttons/button";
import Tag from "../tag/tag";
import { Project, Task, TaskAssignee } from "@/types/api.types";
import { isoStringDate } from "@/utils/date-formatter";
import SelectAssignee from "../form-element/selectAssignee";

export default function ModalUpdateTask(
    { id, formAction, project, task }: {
        id: string,
        formAction: any,
        project: Project,
        task: Task
    }
) {
    const optionsFetcher = useSearchUsers();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate || '');
    const isFormInvalid = !title || !description || !dueDate;
    const [state, action] = useActionState(formAction, { error: '', fields: { title: task.title, description: task.description, dueDate: isoStringDate(task.dueDate), assigneeIds: task.assignees, status: task.status }, details: [] });
    const projectMembers = [...project.members, { userId: project.owner.id, ...project.owner, user: { ...project.owner } }];
    const defaultAssignees = task.assignees.map(assignee => ({ userId: assignee.user.id, ...assignee })) as TaskAssignee[];

    return (
        <Modal id={id} className={styles['modal-create-task']}>
            <h1 className={'headings-h4-neutral-grey-800'}>Modifier</h1>

            <Form className={styles['modal-create-task-form']} action={action}>
                <input type="hidden" name="project-id" value={task.projectId} />
                <input type="hidden" name="task-id" value={task.id} />

                <Input id='title' type='text' defaultValue={state.fields.title} label='Titre*' inputChangeHandler={(e) => setTitle(e.target.value.trim())} />

                <Input id='description' defaultValue={state.fields.description} type='text' label='Description*' inputChangeHandler={(e) => setDescription(e.target.value.trim())} />

                <Input id='due-date' defaultValue={state.fields.dueDate} type='date' label='Echéance*' inputChangeHandler={(e) => setDueDate(e.target.value.trim())} />

                {/* <Select name={'assignees'} label={'Assigné à'} defaultValue={state.fields.assignees.map(assignee => assignee.user)} optionsFetcher={optionsFetcher}></Select> */}

                <SelectAssignee
                    name={'assignees'}
                    label={'Assigné à'}
                    defaultValue={defaultAssignees}
                    members={projectMembers}
                />


                <fieldset className={styles['modal-form-status-radio']}>
                    <legend className={'body-s-black'}>Statut :</legend>

                    <label>
                        <input type="radio" id="todo" name="task-status" value="TODO" defaultChecked={state.fields.status === 'TODO'} />
                        <Tag type='error'>A faire</Tag>
                    </label>

                    <label>
                        <input type="radio" id="in-progress" name="task-status" value="IN_PROGRESS" defaultChecked={state.fields.status === 'IN_PROGRESS'} />
                        <Tag type='light'>En cours</Tag>
                    </label>

                    <label>
                        <input type="radio" id="done" name="task-status" value="DONE" defaultChecked={state.fields.status === 'DONE'} />
                        <Tag type='success'>Terminée</Tag>
                    </label>
                </fieldset>

                {
                    state.error &&
                    <span className={`${styles['error-message']} body-s-system-error-red`}>{state.error}</span>
                }

                {
                    state.error && state.details.length > 0 &&
                    <ul>{state.details.map(({ message }, i) => <li key={i} className={`${styles['error-message']} body-s-system-error-red`}>{message}</li>)}</ul>
                }

                <Button className={styles['modal-create-task-send-button']} isPending={false} disabled={isFormInvalid}>Enregistrer</Button>
            </Form>
        </Modal>
    );
}