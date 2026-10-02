import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { tools } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaWork AI — Workplace Productivity Tools" },
      { name: "description", content: "Create emails, summarize meetings, research topics, and get workplace guidance." },
      { property: "og:title", content: "NovaWork AI — Workplace Productivity Tools" },
      { property: "og:description", content: "Four focused AI tools for everyday workplace productivity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const quickTools = tools.filter((tool) => tool.to !== "/");
  return (
    <div className="mx-auto min-h-full max-w-7xl p-5 sm:p-8 lg:p-10">
      <p className="text-sm font-semibold text-primary">Workspace</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Reclaim your workday.</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">Choose a focused assistant and turn rough inputs into useful, editable work.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {quickTools.map((tool) => (
          <Link key={tool.to} to={tool.to} className="group rounded-xl border border-border/70 bg-card p-6 shadow-glow transition-colors hover:border-primary/60">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><tool.icon className="h-5 w-5" /></span>
              <div className="min-w-0"><h2 className="font-semibold">{tool.label}</h2><p className="mt-1 text-sm text-muted-foreground">{tool.desc}</p></div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
