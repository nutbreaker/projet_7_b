'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {default as AuthForm, LoginFormState}  from "@/components/auth-form/auth-form";
import { handleSignup } from './actions';

export default function SignUp() {
    const [state, formAction] = useActionState(handleSignup, { error: '', fields: { email: '' } });

  return (
    <div className="content">
      <div className="left-side">
        <Image src="/assets/logo-orange.svg" alt="Abricot logo orange" width={252} height={32} />

        <div className="form-container">
          <AuthForm
            formAction={formAction}
            formState={state as LoginFormState}
            formTitle="Inscription"
            submitButtonLabel="S'inscrire"
          />
        </div>

        <p className="body-s-black">Déjà inscrit ? <Link className="body-s-dark-orange left-side-link" href="/signin">
          Se connecter</Link></p>
      </div>
      <div className="right-side">
        <Image
          src="/assets/signup.jpg"
          alt="Inscription image"
          className="right-side-image"
          width={4096}
          height={2731}
        />
      </div>
    </div>
  );
}