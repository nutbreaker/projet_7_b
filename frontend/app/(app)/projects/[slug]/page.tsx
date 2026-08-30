import { getSessionToken } from '@/services/session';

import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Fragment } from 'react/jsx-runtime';
import { projectById, projectsIdTasks } from '@/services/projects-id-tasks';
import { authProfile } from '@/services/auth-profile';

import { nameFormatter } from '@/utils/name.formatter';

import Tag from '@/components/tag/tag';
import OpenModalButton from '@/components/buttons/open-modal-button';
import ModalCreateTask from '@/components/modal/modal-create-task';
import TaskProject from '@/components/task/task-project';

import TaskSearch from '../../task-search';

import type { Project, ProjectMember } from '@/types/api.types';

import styles from './page.module.css';
import Chip from '@/components/chip/chip';
import StatusFilter from './status-filter';
import OpenModalIAButton from '@/components/buttons/open-modal-ia-button';
import ModalCreateTaskIA from '@/components/modal/modal-create-task-ia';
import OpenModalUpdateProjectButton from '@/components/buttons/open-modal-update-project-button';
import ModalUpdateProject from '@/components/modal/modal-update-project';
import { handleUpdateProject, handleCreateTask } from '../actions';

export default async function Project({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const token = await getSessionToken() as string;

  if (!token) {
    redirect('/signin');
  }

  const updateProjectModalId = 'update-project-modal';
  const createTaskModalId = 'create-task-modal';
  const iaTaskModalId = 'ia-task-modal';
  const authProfileResp = await authProfile(token);
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const searchQuery = (resolvedSearchParams.search as string || '').toLowerCase();
  const isSortByDueDate = Object.hasOwn(resolvedSearchParams, 'calendar');
  const taskStatus = (resolvedSearchParams.status as string || '');
  const userName = authProfileResp.success && authProfileResp.data.user.name || '';
  const responseProjectById = await projectById(token, resolvedParams.slug);
  const responseProjectsIdTasks = await projectsIdTasks(token, resolvedParams.slug)
  const tasks = responseProjectsIdTasks.success && responseProjectsIdTasks.data.tasks || [];
  const { project } = responseProjectById.success && responseProjectById.data || ({ project: {} as Project });

  if (!responseProjectById.success) {
    // what am I doing with my life...
    // https://github.com/vercel/next.js/discussions/52233#discussioncomment-6779274
    redirect('/404');
  }

  const ownerInitials = nameFormatter(project.owner.name);
  const projectMembersText = (members = [] as ProjectMember[]) => {
    const len = members.length + 1;

    if (len > 1) return `${len} personnes`;

    return `${len} personne`;
  };
  const createParamsUrl = (param: 'tasks' | 'calendar') => {
    const searchParams = new URLSearchParams(resolvedSearchParams as Record<string, string>);

    searchParams.delete('tasks');
    searchParams.delete('calendar');

    searchParams.set(param, '');

    return `?${searchParams.toString()}`;
  };

  let taskSearch = tasks;

  if (isSortByDueDate) {
    taskSearch = taskSearch.sort((taskA, taskB) => new Date(taskA.dueDate).getTime() - new Date(taskB.dueDate).getTime());
  }

  if (searchQuery) {
    taskSearch = taskSearch.filter(task =>
      task.title.toLowerCase().includes(searchQuery) ||
      (task.description && task.description.toLowerCase().includes(searchQuery)) ||
      (task.project && task.project.name.toLowerCase().includes(searchQuery))
    );
  }

  if (taskStatus) {
    taskSearch = taskSearch.filter(task => task.status === taskStatus);
  }

  return (
    <div className={styles['project-container']}>
      <Link href={'/projects'} className={styles['project-back-button']} aria-label="retour" />
      <section className={styles['project-header']}>
        <div className={styles['project-header-container']}>
          <div className={styles['project-header-content']}>
            <h2 className={'headings-h4-neutral-grey-800'}>{project.name} <OpenModalUpdateProjectButton modalId={updateProjectModalId} /></h2>
            <p className={'body-l-grey-600'}>{project.description}</p>
          </div>

          <div className={styles['project-header-buttons']}>
            <OpenModalButton className={styles['project-task-modal-button']} label={'Créer une tâche'} modalId={createTaskModalId} />
            <OpenModalIAButton className={`${styles['project-ia-button']} body-m-neutral-white`} modalId={iaTaskModalId} />
          </div>
          <ModalUpdateProject id={updateProjectModalId} project={project} formAction={handleUpdateProject} />
          <ModalCreateTask id={createTaskModalId} project={project} formAction={handleCreateTask} />
          <ModalCreateTaskIA id={iaTaskModalId} />
        </div>

        <div className={styles['project-contributors']}>
          <h3 className='headings-h5-neutral-grey-800'>Contributeurs <span className='body-m-neutral-grey-600'>{projectMembersText(project.members)}</span></h3>

          <div className={styles['project-contributors-list']}>
            <Tag type='light' className={styles['project-owner']}>{ownerInitials}</Tag>
            <Tag type='light'>Propriétaire</Tag>

            {project.members.map((member: ProjectMember, index: number) => (
              <Fragment key={index}>
                <Tag type='grey' className={styles['project-contributor']}>{nameFormatter(member.user.name)}</Tag>
                <Tag type='grey'>{member.user.name}</Tag>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['project-tasks-container']}>
        <div className={styles['project-tasks-header']}>
          <div className={styles['project-tasks-header-content']}>
            <h4 className={'headings-h5-neutral-grey-800'}>Tâches</h4>
            <p className={'body-m-neutral-grey-600'}>Par ordre de priorité</p>
          </div>

          <div className={styles['project-tasks-header-options']}>
            <Chip type='tasks' href={createParamsUrl('tasks')} isActive={!isSortByDueDate}>Liste</Chip>
            <Chip type='calendar' href={createParamsUrl('calendar')} isActive={isSortByDueDate}>Calendriers</Chip>
            <StatusFilter defaultValue={taskStatus} />
            <TaskSearch defaultValue={searchQuery} />
          </div>

        </div>
        <div className={styles['project-tasks-content']}>
          {taskSearch.map((task) => (
            <TaskProject
              key={task.id}
              userName={userName}
              project={project}
              task={task}
            />
          ))}

          {!taskSearch.length && <p className={'body-m-neutral-grey-600'} style={{ textAlign: 'center' }}>Aucune tâche</p>}
        </div>
      </section>
    </div >
  );
}