import { redirect } from 'next/navigation';
import { getSessionToken } from '@/services/session';
import Chip from '@/components/chip/chip';
import TaskDashboard from '@/components/task/task-dashboard';
import { dashboardAssignedTasks } from '@/services/dashboard-assigned-tasks';
import { authProfile } from '@/services/auth-profile';
import ModalCreateProject from '@/components/modal/modal-create-project';
import CreateProjectButton from '@/components/buttons/create-project-button';
import { handleCreateProject } from '@/app/(app)/action';
import Tag from '@/components/tag/tag';
import TaskSearch from './task-search';
import ModalTaskDisplay from '@/components/modal/modal-task-display';

import type { Task } from '@/types/api.types';

import styles from './page.module.css';

export default async function Dashboard(
  { searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const token = await getSessionToken();

  if (!token) {
    redirect('/signin');
  }

  const authProfileResp = await authProfile(token);
  const userName = await authProfileResp.success && authProfileResp.data.user.name || '';
  const dashboardAssignedTasksResp = await dashboardAssignedTasks(token);
  const tasks = dashboardAssignedTasksResp.success && dashboardAssignedTasksResp.data.tasks || [];
  const resolvedParams = await searchParams;
  const isKanban = Object.hasOwn(resolvedParams, 'kanban');
  const searchQuery = (resolvedParams.search as string || '').toLowerCase();
  const taskId = (resolvedParams.taskid as string || '').toLowerCase();
  const createProjectModalId = 'create-project-modal';

  let taskSearch = tasks, tasksTodo: Task[] = [], tasksInProgress: Task[] = [], tasksDone: Task[] = [];
  let taskToDisplay = undefined;

  if (isKanban) {
    tasksTodo = tasks.filter(task => task.status === 'TODO');
    tasksInProgress = tasks.filter(task => task.status === 'IN_PROGRESS');
    tasksDone = tasks.filter(task => task.status === 'DONE');
  }

  if (searchQuery) {
    taskSearch = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery) ||
      (task.description && task.description.toLowerCase().includes(searchQuery)) ||
      (task.project && task.project.name.toLowerCase().includes(searchQuery))
    );

    // naive solution
    // taskSearch = tasks.filter(task =>
    //   JSON.stringify(task).toLowerCase().includes(searchQuery)
    // );
  }

  if (taskId) {
    taskToDisplay = tasks.find(task => task.id === taskId);
  }


  return (
    <div>
      <section className={styles['dashboard-header']}>
        <div>
          <h2 className={'headings-h4-neutral-grey-800'}>Tableau de bord</h2>
          <p className={'body-l-black'}>Bonjour {userName}, voici un aperçu de vos projets et tâches</p>
        </div>

        <CreateProjectButton modalId={createProjectModalId} />

        <ModalCreateProject id={createProjectModalId} formAction={handleCreateProject} />
      </section>

      <div className={styles['dashboard-type']}>
        <Chip type='tasks' className={!isKanban ? styles['chip-active'] : ''}>Liste</Chip>
        <Chip type='kanban' className={isKanban ? styles['chip-active'] : ''}>Kanban</Chip>
      </div>

      {taskToDisplay && <ModalTaskDisplay id={'modal-task-display'} userName={userName} task={taskToDisplay} />}

      {/* List */}
      {
        !isKanban &&
        <section className={styles['dashboard-tasks-container']}>
          <div className={styles['dashboard-tasks-header']}>
            <div>
              <h3 className={'headings-h5-neutral-grey-800'}>Mes tâches assignées</h3>
              <p className={'body-m-neutral-grey-600'}>Par ordre de priorité</p>
            </div>

            <TaskSearch defaultValue={searchQuery} />
          </div>
          <div className={styles['dashboard-tasks-content']}>
            {taskSearch.map((task) => (
              <TaskDashboard
                key={task.id}
                {...task}
              />
            ))}
          </div>
        </section>
      }

      {/* Kanban */}
      {
        isKanban &&
        <section className={styles['dashboard-kanban-container']}>
          <div className={`${styles['dashboard-kanban-tasks']} ${styles['dashboard-kanban-tasks-todo']}`}>
            <h5 className='headings-h5-neutral-grey-800'>A faire <Tag type='grey'>{tasksTodo.length}</Tag></h5>

            {tasksTodo.map(task => (
              <TaskDashboard
                key={task.id}
                {...task}
              />
            ))}
          </div>

          <div className={`${styles['dashboard-kanban-tasks']} ${styles['dashboard-kanban-tasks-in-progress']}`}>
            <h5 className='headings-h5-neutral-grey-800'>En cours <Tag type='grey'>{tasksInProgress.length}</Tag></h5>

            {tasksInProgress.map(task => (
              <TaskDashboard
                key={task.id}
                {...task}
              />
            ))}
          </div>

          <div className={`${styles['dashboard-kanban-tasks']} ${styles['dashboard-kanban-tasks-done']}`}>
            <h5 className='headings-h5-neutral-grey-800'>Terminées <Tag type='grey'>{tasksDone.length}</Tag></h5>

            {tasksDone.map(task => (
              <TaskDashboard
                key={task.id}
                {...task}
              />
            ))}
          </div>
        </section>
      }


    </div>
  );
}