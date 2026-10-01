import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Mail, NotebookPen, CalendarCheck, Search, MessageSquare, Menu, X, Zap,
} from "lucide-react";

export const tools = [
  { to: "/email", label: "Smart Email Generator", short: "Email", icon: Mail, desc: "Draft polished workplace emails in any tone." },
  { to: "/meeting-notes", label: "Meeting Notes Summarizer", short: "Meeting Notes", icon: NotebookPen, desc: "Turn transcripts into decisions and action items." },
  { to: "/planner", label: "AI Task Planner", short: "Task Planner", icon: CalendarCheck, desc: "Convert messy to-dos into a prioritized day." },
  { to: "/research", label: "AI Research Assistant", short: "Research", icon: Search, desc: "Summaries, insights and recommendations." },
  { to: "/chat", label: "AI Chatbot", short: "Chatbot", icon: MessageSquare, desc: "Ask anything about your work." },
] as const;

const nav = [{ to: "/", label: "Dashboard", icon: LayoutDashboard }, ...tools];

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-dvh flex-col">
      <div className="shrink-0 border-b border-border bg-warning px-4 py-2 text-center text-xs font-medium text-warning-foreground sm:text-sm">
        ⚠️ Responsible AI Guardrail: AI outputs are suggestions and require human review.
      </div>
      <div className="flex min-h-0 flex-1">
        {open && <div className="fixed inset-0 z-30 bg-background/70 md:hidden" onClick={() => setOpen(false)} />}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar p-4 transition-transform md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-primary-foreground shadow-glow">
                <Zap className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold">NovaWork <span className="text-brand">AI</span></span>
            </Link>
            <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
          </div>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                activeProps={{ className: "bg-sidebar-accent !text-primary font-semibold" }}
              >
                <n.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{"short" in n ? n.short : n.label}</span>
              </Link>
            ))}
          </nav>
          <p className="mt-auto text-xs text-muted-foreground">Simulated AI · No data leaves your browser</p>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 border-b border-border px-4 py-3 md:hidden">
            <button onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <span className="font-display font-bold">NovaWork <span className="text-brand">AI</span></span>
          </header>
          <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
