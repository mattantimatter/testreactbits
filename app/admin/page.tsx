import type { Metadata } from "next";
import { AdminPortal } from "@/components/admin-portal";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Authenticated admin testing portal.",
};

export default function AdminPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <section className="bg-background px-6 pt-40 pb-16 md:pt-52 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            Admin Portal
          </h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
            Session check against your backend auth service.
          </p>
        </div>
      </section>

      <section className="bg-background px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <AdminPortal />
        </div>
      </section>
    </main>
  );
}
