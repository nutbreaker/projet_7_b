'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Task } from "@/types/api.types";
import TaskProject from "../task/task-project";
import Modal from "./modal";


import styles from './modal-task-display.module.css';


export default function ModalTaskDisplay({ id, userName, task }: { id: string, userName: string, task: Task }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const modalCloseHander = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete('taskid');
        router.push(`${pathname}?${params.toString()}`);
    }

    // add to the macrotask, so that the component has time to render
    // To my great surprise, it works, go figure...
    setTimeout(() => {
        (document.getElementById(id) as HTMLDialogElement)?.showModal();
    }, 100);

    return (
        <Modal id={id} className={styles['modal-task-display']} onClose={modalCloseHander}>
            <TaskProject
                {...task}
                userName={userName}
                className={styles['modal-task-content']}
                editable={false}
            />
        </Modal>
    );
}