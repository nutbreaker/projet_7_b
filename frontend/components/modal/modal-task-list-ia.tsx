'use client';

import Form from "next/form";

import Modal from "./modal";
import Input from "../form-element/input";

import styles from './modal-task-list-ia.module.css';
import AIButton from "../ia-button/ia-button";
import Button from "../buttons/button";


export default function ModalTaskListIA(
    { id }: { id: string, }
) {

    return (
        <Modal id={id} className={styles['modal-task-ia']}>
            <h1 className={'headings-h4-neutral-grey-800'}>Vos tâches...</h1>

            <div className={styles['modal-task-content']}>
                <article className={styles['task-ia']}>
                    <div className={styles['task-ia-header']}>
                        <h2 className={`headings-h5-neutral-grey-800`}>Nom de la tâche</h2>
                        <p className={`body-s-neutral-grey-600`}>Description de la tâche</p>
                    </div>
                    <div className={styles['task-ia-footer']}>
                        <ul>
                            <li><span className={styles['task-ia-delete']}>Supprimer</span></li>
                            <li className={styles['task-ia-separator']}>|</li>
                            <li><span className={styles['task-ia-update']}>Modifier</span></li>
                        </ul>
                    </div>
                </article>
                <article className={styles['task-ia']}>
                    <div className={styles['task-ia-header']}>
                        <h2 className={`headings-h5-neutral-grey-800`}>Nom de la tâche</h2>
                        <p className={`body-s-neutral-grey-600`}>Description de la tâche</p>
                    </div>
                    <div className={styles['task-ia-footer']}>
                        <ul>
                            <li><span className={styles['task-ia-delete']}>Supprimer</span></li>
                            <li className={styles['task-ia-separator']}>|</li>
                            <li><span className={styles['task-ia-update']}>Modifier</span></li>
                        </ul>
                    </div>
                </article>
                <article className={styles['task-ia']}>
                    <div className={styles['task-ia-header']}>
                        <h2 className={`headings-h5-neutral-grey-800`}>Nom de la tâche</h2>
                        <p className={`body-s-neutral-grey-600`}>Description de la tâche</p>
                    </div>
                    <div className={styles['task-ia-footer']}>
                        <ul>
                            <li><span className={styles['task-ia-delete']}>Supprimer</span></li>
                            <li className={styles['task-ia-separator']}>|</li>
                            <li><span className={styles['task-ia-update']}>Modifier</span></li>
                        </ul>
                    </div>
                </article>
            </div>
            <Button className={styles['modal-create-ia-task-button']} isPending={false}>+ Ajouter des tâches</Button>

            <div className={styles['modal-task-ia-form-container']}>
                <Form
                    className={styles['modal-task-ia-form']}
                    action={''}
                >
                    <Input id='name' type='text' className={styles['modal-task-ia-input']} placeholder={'Décrivez les tâches que vous souhaitez ajouter...'} />

                    <AIButton ariaLabel="Créer une tâche" />
                </Form>
            </div>
        </Modal>
    );
}