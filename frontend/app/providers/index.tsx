import { ReactNode } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { AuthProvider } from "@features/auth";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ReactQueryProvider>
    );
}
