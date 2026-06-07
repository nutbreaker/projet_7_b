
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>
        <Header />
        <main className="grow">
            {children}
        </main>
        <Footer />
    </>)
}
