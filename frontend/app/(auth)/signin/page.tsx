'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AuthForm from "@/components/auth-form/auth-form";


export default function SignIn() {
  const pathname = usePathname();

  return (
    <div className="content">
      <div className="left-side">
        <Image src="/assets/logo-orange.svg" alt="Abricot logo orange" width={252} height={32} />

        <div className="form-container">
          <AuthForm
            formAction={pathname}
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