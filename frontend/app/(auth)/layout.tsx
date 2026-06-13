import './styles.css';

// https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container">
            {children}
        </div>
    );
}