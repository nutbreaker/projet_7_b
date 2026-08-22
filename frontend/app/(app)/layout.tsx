import { redirect } from "next/navigation";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { getSessionToken } from "@/services/session";
import { UserProvider } from "@/contexts/userContext";
import { authProfile } from "@/services/auth-profile";

import './styles.css';


// https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const token = await getSessionToken();

    if (!token) {
        redirect('/signin');
    }

    const authProfileResp = await authProfile(token);
    const userName = authProfileResp.success && authProfileResp.data.user.name || '';

    return (
        <UserProvider userName={userName}>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </UserProvider>
    );
}
