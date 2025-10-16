import { create } from "zustand";
import { persist } from "zustand/middleware";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    username: string;
    firstname: string;
    lastname: string;
    city: string;
    phone: string;
    roles: string[];
    exp: number;
    iat: number;
}

interface AuthState {
    token: string | null;
    user: DecodedToken | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    getName: () => string;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,

            login: (token) => {
                try {
                    const decoded = jwtDecode<DecodedToken>(token);
                    set({ token, user: decoded });
                } catch (e) {
                    console.error("JWT invalide :", e);
                }
            },

            logout: () => set({ token: null, user: null }),

            isAuthenticated: () => {
                const token = get().token;
                if (!token) return false;
                try {
                    const decoded = jwtDecode<DecodedToken>(token);
                    const now = Date.now() / 1000;
                    return decoded.exp > now;
                } catch {
                    return false;
                }
            },
            getName: ()=>{
                const token = get().token;
                if (!token) return "";
                try {
                    return get().user?.lastname + " "+ get().user?.firstname;
                } catch {
                    return "";
                }
            }
        }),
        { name: "auth-storage" }
    )
);
