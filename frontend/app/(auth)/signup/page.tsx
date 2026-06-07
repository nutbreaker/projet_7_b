'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AuthForm from "@/components/auth-form/auth-form";

export default function SignUp() {
  const pathname = usePathname();

  return (
    <div className="content">
      <div className="left-side">
        <Image src="/assets/logo-orange.svg" alt="Abricot logo orange" width={252} height={32} />

        <div className="form-container">
          <AuthForm
            formAction={(formData)=>console.log(formData)}
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