import { getAccessToken, setAccessToken } from "@/lib/session";
import { ErrorResponse, LoginSuccessResponse } from "@/types/apiResponse";
import { User } from "@/types/apiResponse";
import { getIndustriesFromBackend } from "@/utils/getIndustries";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  industries: string[] | undefined;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<React.PropsWithChildren> = function ({
  children,
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [industries, setIndustries] = useState<string[] | undefined>();

  useEffect(() => {
    getIndustries();

    const userCache = localStorage.getItem("user_cache");

    if (userCache) {
      setUser(JSON.parse(userCache));
    }

    setLoading(false);
  }, []);

  async function getIndustries() {
    const res = await getIndustriesFromBackend();

    if (res.data) {
      const industries = res.data.data.map((industry) => industry.name);
      setIndustries(industries);
      return;
    }

    return setIndustries(res.data);
  }

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
      firstName: user.firstName,
      photo: { path: user?.photo?.path },
    };

    localStorage.setItem("user_cache", JSON.stringify(userDataForStorage));

    setAccessToken(token, tokenExpires);

    setUser(user);

    if (!user.isOnboarded) {
      router.push("/onboarding");
    } else {
      router.push("/");
    }

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
    router.push("/login");
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
    // console.log("Logout Response 1...", logoutResponseInitialData);

    if (logoutResponseInitialData.ok) redirectHome();

    // If token expires refresh then retry
    if (logoutResponseInitialData.status === 401) {
      // console.log("Logout failed refreshing token...");

      const refreshResp = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (refreshResp.ok) {
        const data = await refreshResp.json();
        // console.log("Logout Response 2...", data);

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
      } else {
        redirectHome();
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, industries }}>
      {children}
    </AuthContext.Provider>
  );
};
