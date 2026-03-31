import { create } from "zustand";
import { getAuthToken } from "@/lib/authToken";

interface AdminState {
  role: string;
  loading: boolean;
  checkAdmin: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  role: "user",
  loading: true,

  checkAdmin: async () => {
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/role`,
        {
          credentials: "include",
          headers,
        }
      );
      const data = await res.json();
      set({ role: data?.role || "user", loading: false });
    } catch (err) {
      set({ role: "user", loading: false });
    }
  },
}));

interface AdminStateForUsdc {
  usdcBal: string;
  setUsdcBal: (bal: string) => void;
}

export const useAdminStoreForUsdc = create<AdminStateForUsdc>((set) => ({
  usdcBal: "0",
  setUsdcBal: (bal) => set({ usdcBal: bal }),
}));
