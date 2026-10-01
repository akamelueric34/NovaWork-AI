import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/email" });
  },
  head: () => ({
    meta: [
      { title: "NovaWork AI — Workplace Productivity Tools" },
      { name: "description", content: "Create emails, summarize meetings, research topics, and get workplace guidance." },
      { property: "og:title", content: "NovaWork AI — Workplace Productivity Tools" },
      { property: "og:description", content: "Four focused tools for everyday workplace productivity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => null,
});
