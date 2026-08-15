'use client';

import { useState, useActionState } from 'react';
import Form from 'next/form';
import Modal from "./modal";
import Input from '../form-element/input';
import Select from '../form-element/select';
import Button from '../buttons/button';
import useSearchUsers from '@/hooks/useSearchUsers';

import styles from './modal-create-project.module.css';
import { Project } from '@/types/api.types';


export default function ModalUpdateProject(
    { id, project, formAction }: {
        id: string,
        project: Project,
        formAction: any,
    }
) {
    const optionsFetcher = useSearchUsers();
    const [title, setTitle] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const isFormInvalid = title === '' || description === '';
    const [state, action] = useActionState(formAction, { error: '', fields: { name: project.name, description: project.description, contributors: project.members.map(member => member.user) }, details: [] });

    return (
        <Modal id={id} className={styles['modal-create-project']}>

            <h4 className={'headings-h4-neutral-grey-800'}>Modifier un projet</h4>

            <Form className={''} action={action}>
                <input type="hidden" name="project-id" value={project.id} />

                <Input id='name' type='text' defaultValue={state.fields.name} label='Titre*' inputChangeHandler={(e) => setTitle(e.target.value.trim())} />
                <Input id='description' defaultValue={state.fields.description} type='text' label='Description*' inputChangeHandler={(e) => setDescription(e.target.value.trim())} />

                <Select name={'contributors'} label={'Contributeurs'} defaultValue={state.fields.contributors} optionsFetcher={optionsFetcher}></Select>

                {
                    state.error &&
                    <span className={`${styles['error-message']} body-s-system-error-red`}>{state.error}</span>
                }

                {
                    state.error && state.details.length > 0 &&
                    <ul>{state.details.map(({ message }, i) => <li key={i} className={`${styles['error-message']} body-s-system-error-red`}>{message}</li>)}</ul>
                }

                <Button className={''} isPending={false} disabled={isFormInvalid}>Enregistrer</Button>
            </Form>
        </Modal>
    );
}