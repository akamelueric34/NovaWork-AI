import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { tools } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — NovaWork AI" },
      { name: "description", content: "Your AI workplace productivity hub: emails, notes, planning, research and chat." },
      { property: "og:title", content: "Dashboard — NovaWork AI" },
      { property: "og:description", content: "Your AI workplace productivity hub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <div className="border-b border-border pb-8 pt-2 sm:pb-10 sm:pt-6">
        <p className="text-sm font-medium text-primary">{greet}</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-5xl">Reclaim your workday.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Automate your repetitive tasks in seconds.</p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/60 hover:bg-secondary/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-primary">
              <t.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-semibold">{t.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
