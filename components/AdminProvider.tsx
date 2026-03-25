"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const checkAdmin = useAdminStore((state) => state.checkAdmin);

    useEffect(() => {
        checkAdmin();
    }, [checkAdmin]);

    return <>{children}</>;
}
