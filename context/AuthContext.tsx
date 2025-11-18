import apiClient, { setAccessToken } from "@/lib/axios";
import { User } from "@/types/auth";
import React, { createContext, useCallback, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  refreshUser: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<React.PropsWithChildren> = function ({
  children,
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get("/auth/me");
        console.log(res.data);

        // setUser(res.data);
      } catch {
        const refreshed = await refreshUser();

        if (refreshed) {
          const me = await apiClient.get("/auth/me");
          console.log(me);
          //   setUser(me.data);
        } else {
          //   setUser(null);
        }
      }
      setLoading(false);
    })();
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        setAccessToken(null);
        return false;
      }

      const data = await response.json();
      console.log(data);

      //   if (d.accessToken) {
      //     setAccessToken(d.accessToken);
      //     return true;
      //   }

      return false;
    } catch {
      return false;
    }
  }, []);

  //   //   Initialize auth state on mount
  //   useEffect(() => {
  //     refreshUser();
  //   }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) return { ok: false, error: data.message };

    console.log(data);

    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }

    // // load user
    // try {
    //   const me = await api.get("/auth/me");
    //   setUser(me.data);
    // } catch {
    //   setUser(null);
    // }

    return { ok: true };
  };
  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
