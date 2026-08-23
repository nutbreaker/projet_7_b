import { redirect } from 'next/dist/server/api-utils';

import { handleCreateProject } from '@/app/(app)/action';

import { projects } from '@/services/projects';
import { getSessionToken } from '@/services/session';
import { projectsIdTasks } from '@/services/projects-id-tasks';

import CreateProjectButton from '@/components/buttons/create-project-button';
import ModalCreateProject from '@/components/modal/modal-create-project';
import CardProject from '@/components/card-project/card-project';

import type { ProjectWithTasks, Project, Task } from '@/types/api.types';

import styles from './page.module.css';

export default async function Project() {
  const token = await getSessionToken();

  if (!token) {
    redirect('/signin');
  }

  const createProjectModalId = 'create-project-modal';
  const projectsResponse = await projects(token as string);
  const projectList = projectsResponse.success && projectsResponse.data.projects as Project[];

  const projectWithTasks: ProjectWithTasks[] = await Promise.all(
    projectList.map(async (project: Project) => {
      const taskResponse = await projectsIdTasks(token as string, project.id);
      const tasks = taskResponse.success && taskResponse.data.tasks as Task[];

      return {
        ...project,
        tasks
      }
    })
  );

  return (
    <div>
      <section className={styles['project-header']}>
        <div>
          <h2 className={'headings-h4-neutral-grey-800'}>Mes projets</h2>
          <p className={'body-l-black'}>Gérez vos projets</p>
        </div>

        <CreateProjectButton modalId={createProjectModalId} />

        <ModalCreateProject id={createProjectModalId} formAction={handleCreateProject} />
      </section>

      <section className={styles['project-list']}>
        {
          projectWithTasks.length &&
          projectWithTasks
            .map((project) => (
              <a key={project.id} href={`projects/${project.id}`}><CardProject {...project} /></a>
            ))
        }
      </section>
    </div >
  );
}