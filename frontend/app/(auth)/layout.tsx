import './styles.css';

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