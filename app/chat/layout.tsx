import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Script from 'next/script';
import { headers } from 'next/headers';
export const experimental_ppr = true;

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cookieStore] = await Promise.all([cookies()]);
    const isCollapsed = cookieStore.get('sidebar_state')?.value !== 'true';

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
                strategy="beforeInteractive"
            />
            <SidebarProvider defaultOpen={!isCollapsed}>
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </>
    );
}
