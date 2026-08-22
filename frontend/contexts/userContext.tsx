// This Dx is killing me...
// https://vercel.com/kb/guide/react-context-state-management-nextjs
// https://react.dev/reference/react/createContext
"use client";
import { createContext, useContext, ReactNode } from 'react';

type UserContextType = {
    userName: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, userName }: { children: ReactNode; userName: string }) {
    return (
        <UserContext.Provider value={{ userName }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser doit être utilisé dans un UserProvider');
    }

    return context;
}