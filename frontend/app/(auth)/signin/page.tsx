'use client';
import { useActionState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {default as AuthForm, LoginFormState} from "@/components/auth-form/auth-form";
import { handleSignin } from './actions';

export default function SignIn() {
  const [state, formAction] = useActionState(handleSignin, { error: '', fields: { email: '' } });

  return (
    <div className="content">
      <div className="left-side">
        <Image src="/assets/logo-orange.svg" alt="Abricot logo orange" width={252} height={32} />

        <div className="form-container">
          <AuthForm
            formAction={formAction}
            formState={state as LoginFormState}
            formTitle="Connexion"
            submitButtonLabel="Se connecter"
          />
          <Link className="body-s-dark-orange left-side-link" href="https://www.perdu.com">
            Mot de passe oublié ?
          </Link>
        </div>

        <p className="body-s-black">Pas encore de compte ? <Link className="body-s-dark-orange left-side-link" href="/signup">
          Créer un compte</Link></p>
      </div>
      <div className="right-side">
        <Image
          src="/assets/signin.jpg"
          alt="Connexion image"
          className="right-side-image"
          width={4096}
          height={2731}
        />
      </div>
    </div>
  );
}