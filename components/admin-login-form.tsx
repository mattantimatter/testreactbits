"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const TEST_EMAIL = "admin@example.com";
const TEST_PASSWORD = "Admin@123";

export function AdminLoginForm(): ReactNode {
  const [email, setEmail] = useState(TEST_EMAIL);
  const [password, setPassword] = useState(TEST_PASSWORD);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);

    if (!apiBaseUrl) {
      setError("Missing NEXT_PUBLIC_API_BASE_URL in Vercel environment variables.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        data?: { access_token?: string };
        message?: string;
      };

      const token = payload?.data?.access_token;

      if (!response.ok || !token) {
        setError(payload?.message || "Login failed. Check backend URL and credentials.");
        return;
      }

      localStorage.setItem("admin_access_token", token);
      window.location.href = "/admin";
    } catch {
      setError("Could not reach backend API. Confirm NEXT_PUBLIC_API_BASE_URL.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label className="text-foreground mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
          required
        />
      </div>
      <div>
        <label className="text-foreground mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-foreground w-full rounded-md px-4 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in to admin"}
      </button>
    </form>
  );
}
