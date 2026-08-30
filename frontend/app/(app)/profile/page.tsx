import styles from './profile.module.css';
import { getSessionToken } from '@/services/session';
import { redirect } from 'next/navigation';
import { ProfileForm } from './profile-form';
import { authProfile } from '@/services/auth-profile';

export default async function Profile() {
  const token = await getSessionToken();

  if (!token) {
    redirect('/signin');
  }

  const response = await authProfile(token);
  const user = response.success ? response.data.user : {};

  return (
    <div className={styles.profile}>
      <ProfileForm user={user as any} />
    </div>
  );
}