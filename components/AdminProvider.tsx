"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { useWallet } from "@solana/wallet-adapter-react";

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const checkAdmin = useAdminStore((state) => state.checkAdmin);
    const { connected } = useWallet();

    useEffect(() => {
        // Re-check admin role whenever wallet connection state changes
        // This ensures admin status is refreshed after authentication
        checkAdmin();
    }, [checkAdmin, connected]);

    return <>{children}</>;
}
