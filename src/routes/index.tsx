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
    ],
  }),
  component: Index,
});

function Index() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
        <p className="text-sm font-medium text-primary">{greet} 👋</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
          Welcome to <span className="text-brand">NovaWork AI</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Your focused AI assistant for everyday work. Pick a tool to get started.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-glow"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-primary">
              <t.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-semibold">{t.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Launch <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
