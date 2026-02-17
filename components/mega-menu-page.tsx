import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { MegaMenuPage } from "@/lib/mega-menu-pages";

export function MegaMenuPageView({ page }: { page: MegaMenuPage }): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <section className="bg-background px-6 pt-40 pb-16 md:pt-52 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <span className="text-muted-foreground bg-foreground/5 inline-block rounded-md px-3 py-1 text-xs font-medium tracking-wider uppercase">
            {page.subtitle}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-medium tracking-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">
            {page.description}
          </p>
        </div>
      </section>

      <section className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-medium tracking-tight">What this includes</h2>
            <ul className="text-muted-foreground mt-6 space-y-3 text-base leading-relaxed">
              {page.highlights.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-medium tracking-tight">Expected outcomes</h2>
            <ul className="text-muted-foreground mt-6 space-y-3 text-base leading-relaxed">
              {page.outcomes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <Link
              href="/"
              className="bg-foreground group mt-8 inline-flex items-center gap-3 rounded-md py-3 pl-5 pr-3 font-medium text-background transition-all duration-500 ease-out hover:rounded-[50px]"
            >
              <span>Back to homepage</span>
              <span className="bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                <ChevronRightIcon className="relative left-px h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
