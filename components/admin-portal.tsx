"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

interface AdminMe {
  full_name?: string;
  email?: string;
  roles?: Array<{ name: string }>;
  permissions?: string[];
}

export function AdminPortal(): ReactNode {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminMe | null>(null);

  useEffect(() => {
    const run = async (): Promise<void> => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const token = localStorage.getItem("admin_access_token");

      if (!apiBaseUrl) {
        setError("Missing NEXT_PUBLIC_API_BASE_URL.");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("Not logged in yet.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = (await response.json()) as {
          success?: boolean;
          data?: AdminMe;
          message?: string;
        };

        if (!response.ok || !payload?.data) {
          setError(payload?.message || "Session invalid. Please login again.");
          setLoading(false);
          return;
        }

        setAdmin(payload.data);
      } catch {
        setError("Could not reach backend API.");
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  const logout = (): void => {
    localStorage.removeItem("admin_access_token");
    window.location.href = "/admin-login";
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading admin session...</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error}</p>
        <Link
          href="/admin-login"
          className="bg-foreground inline-flex rounded-md px-4 py-2 text-sm font-medium text-background"
        >
          Go to admin login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted rounded-2xl p-8">
        <h2 className="text-2xl font-medium tracking-tight">Authenticated admin</h2>
        <p className="text-muted-foreground mt-4 text-sm">
          Name: {admin?.full_name || "N/A"}
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          Email: {admin?.email || "N/A"}
        </p>
      </div>

      <div className="bg-muted rounded-2xl p-8">
        <h3 className="text-xl font-medium tracking-tight">Roles</h3>
        <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
          {(admin?.roles || []).map((role) => (
            <li key={role.name}>- {role.name}</li>
          ))}
        </ul>
      </div>

      <div className="bg-muted rounded-2xl p-8">
        <h3 className="text-xl font-medium tracking-tight">Permissions</h3>
        <ul className="text-muted-foreground mt-4 max-h-72 space-y-2 overflow-y-auto text-sm">
          {(admin?.permissions || []).map((permission) => (
            <li key={permission}>- {permission}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={logout}
        className="bg-foreground rounded-md px-4 py-2 text-sm font-medium text-background"
      >
        Logout
      </button>
    </div>
  );
}
