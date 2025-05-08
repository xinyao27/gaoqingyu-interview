"use client"

import { AuthCard } from "@daveyplate/better-auth-ui"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function AuthView({ pathname }: { pathname: string }) {
    // Just an example, SettingsCards already includes this
    // useAuthenticate({ enabled: pathname === "settings" })

    return (
        <main className="flex grow flex-col items-center justify-center gap-4 p-4">
            <AuthCard pathname={pathname} />

            <p
                className={cn(
                    ["callback", "settings", "sign-out"].includes(pathname) && "hidden",
                    "text-muted-foreground text-xs"
                )}
            >
                Powered by{" "}
                <Link
                    className="text-warning underline"
                    href="https://better-auth.com"
                    target="_blank"
                >
                    better-auth.
                </Link>
            </p>
        </main>
    )
}
