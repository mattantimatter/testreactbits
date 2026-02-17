import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MegaMenuPageView } from "@/components/mega-menu-page";
import { createMetadata } from "@/lib/metadata";
import { megaMenuPageMap, megaMenuPages } from "@/lib/mega-menu-pages";
import type { ReactNode } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return megaMenuPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = megaMenuPageMap.get(slug);

  if (!page) {
    return createMetadata({
      title: "Explore",
      description: "Explore AntimatterAI capabilities and focus areas.",
      path: `/explore/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/explore/${slug}`,
  });
}

export default async function ExploreSubpage({ params }: PageProps): Promise<ReactNode> {
  const { slug } = await params;
  const page = megaMenuPageMap.get(slug);

  if (!page) {
    notFound();
  }

  return <MegaMenuPageView page={page} />;
}
