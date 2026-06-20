import styles from './profile.module.css';
import { getSessionToken } from '@/services/session';
import { redirect } from 'next/navigation';
import { ProfileForm } from './profile-form';

export default async function Profile() {
  const token = await getSessionToken();

  if (!token) {
    redirect('/signin');
  }

  const { success, message, data: { user = {} } = {} } = await getProfileData(token);

  return (
    <div className={styles.profile}>
      <ProfileForm user={user} />
    </div>
  );
}

// TODO extract this into its own service
async function getProfileData(token: string) {
  const response = await fetch('http://localhost:8000/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache'
  });

  if ([200, 401].includes(response.status)) {
    return response.json();
  }

  return {
    success: false,
    error: `${response.status}: ${response.statusText}`,
    message: 'Une erreur inconnue s\'est produite, veuillez ré-essayer'
  };

}