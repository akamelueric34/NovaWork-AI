import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  Mail, NotebookPen, Search, Zap,
} from "lucide-react";

export const tools = [
  { to: "/email", label: "Smart Email Generator", short: "Email", icon: Mail, desc: "Draft polished workplace emails in any tone." },
  { to: "/meeting-notes", label: "Meeting Notes Summarizer", short: "Meeting Notes", icon: NotebookPen, desc: "Turn transcripts into decisions and action items." },
  { to: "/research", label: "AI Research Assistant", short: "Research", icon: Search, desc: "Summaries, insights and recommendations." },
] as const;

const nav = tools;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <div className="shrink-0 border-b border-border bg-warning px-3 py-1.5 text-center text-[10px] font-medium leading-tight text-warning-foreground sm:text-xs">
        ⚠️ Responsible AI Guardrail: AI outputs are suggestions and require human review.
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/email" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-primary-foreground shadow-glow">
                <Zap className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-bold">NovaWork <span className="text-primary">AI</span></span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                activeProps={{ className: "bg-sidebar-accent !text-primary font-semibold" }}
              >
                <n.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{n.short}</span>
              </Link>
            ))}
          </nav>
          <p className="mt-auto text-xs text-muted-foreground">Simulated AI · No data leaves your browser</p>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-h-0 flex-1 overflow-y-auto pb-16 lg:pb-0">{children}</main>
          <nav className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-3 border-t border-border bg-sidebar/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden" aria-label="Tools">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-md text-muted-foreground transition-colors active:bg-sidebar-accent"
                activeProps={{ className: "!text-primary" }}
              >
                <n.icon className="h-5 w-5 shrink-0" />
                <span className="max-w-full truncate px-1 text-[10px] font-semibold">{n.short}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
