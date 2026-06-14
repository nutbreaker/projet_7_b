
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import './styles.css';

// https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </>)
}
