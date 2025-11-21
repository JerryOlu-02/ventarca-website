import apiClient from "@/lib/axios";
import { getAccessToken, setAccessToken } from "@/lib/session";
import { ErrorResponse, LoginSuccessResponse } from "@/types/apiResponse";
import { User } from "@/types/apiResponse";
import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
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
    const raw = localStorage.getItem("user_cache");

    if (raw) {
      setUser(JSON.parse(raw));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorData: ErrorResponse = data;

      return {
        ok: false,
        error:
          typeof errorData.message === "object"
            ? Object.values(errorData.message)[0]
            : errorData.message,
      };
    }

    const { token, tokenExpires, user }: LoginSuccessResponse = data;

    const userDataForStorage = {
      name: user.firstName,
      photo: user?.photo?.path,
    };

    localStorage.setItem("user_cache", JSON.stringify(userDataForStorage));

    setAccessToken(token, tokenExpires);

    setUser(user);

    return { ok: true };
  };

  const redirectHome = function () {
    // Clear cached user data
    localStorage.removeItem("user_cache");

    // Clear accessToken held in memory
    setAccessToken(null);

    // Clear user in state
    setUser(null);

    // Notify other tabs
    try {
      const bc = new BroadcastChannel("auth");
      bc.postMessage("logout");
      bc.close();
    } catch {
      localStorage.setItem("logout", Date.now().toString());
    }

    // Redirect to login
    window.location.href = "/login";
  };

  const logout = async () => {
    let token = getAccessToken();

    let resp = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: token }),
    });

    const logoutResponseInitialData = await resp.json();

    if (logoutResponseInitialData.ok) redirectHome();

    // If token expires refresh then retry
    if (logoutResponseInitialData.status === 401) {
      // console.log("Logout failed → refreshing token...");

      const refreshResp = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (refreshResp.ok) {
        const data = await refreshResp.json();

        setAccessToken(data.token);

        resp = await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken: data.token }),
        });

        const logoutResponse = await resp.json();

        if (logoutResponse.ok) {
          redirectHome();
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
