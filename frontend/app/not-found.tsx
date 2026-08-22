import Link from 'next/link';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>La ressource demandée n&rsquo;a pas été trouvée</p>
      <Link href="/">Revenir à l&rsquo;accueil</Link>
    </div>
  );
}