"use client"

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({})

export function useClientUser() {
    const {
        data: session,
        isPending, //loading state
    } = authClient.useSession()

    return {
        session,
        isPending
    }
}
