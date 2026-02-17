import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin access and test credentials for backend authentication.",
};

export default function AdminLoginPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <section className="bg-background px-6 pt-40 pb-16 md:pt-52 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            Admin Login
          </h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
            Use these credentials to test backend authentication in production.
          </p>
        </div>
      </section>

      <section className="bg-background px-6 pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-medium tracking-tight">Test credentials</h2>
            <div className="text-muted-foreground mt-6 space-y-3 text-base">
              <p>
                <span className="text-foreground font-medium">Email:</span>{" "}
                admin@example.com
              </p>
              <p>
                <span className="text-foreground font-medium">Password:</span>{" "}
                Admin@123
              </p>
            </div>
            <AdminLoginForm />
          </div>

          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-medium tracking-tight">Login endpoint</h2>
            <p className="text-muted-foreground mt-6 break-all text-sm leading-relaxed">
              POST NEXT_PUBLIC_API_BASE_URL/auth/login
            </p>
            <pre className="text-muted-foreground mt-4 overflow-x-auto rounded-md bg-black/5 p-4 text-xs">
{`{
  "email": "admin@example.com",
  "password": "Admin@123"
}`}
            </pre>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <Link
            href="/"
            className="bg-foreground group inline-flex items-center gap-3 rounded-md py-3 pl-5 pr-3 font-medium text-background transition-all duration-500 ease-out hover:rounded-[50px]"
          >
            <span>Back to homepage</span>
            <span className="bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
              <ChevronRightIcon className="relative left-px h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
