'use client';

import Form from "next/form";

import Modal from "./modal";
import Input from "../form-element/input";

import styles from './modal-create-task-ia.module.css';
import AIButton from "../ia-button/ia-button";


export default function ModalCreateTaskIA(
    { id }: { id: string, }
) {

    return (
        <Modal id={id} className={styles['modal-create-task-ia']}>
            <h4 className={'headings-h4-neutral-grey-800'}>Créer une tâche</h4>

            <div className={styles['modal-create-task-content']}></div>
            <Form
                className={styles['modal-create-task-ia-form']}
                action={''}
            >
                <Input id='name' type='text' className={styles['modal-create-task-ia-input']} placeholder={'Décrivez les tâches que vous souhaitez ajouter...'} />

                <AIButton ariaLabel="Créer une tâche" />
            </Form>
        </Modal>
    );
}