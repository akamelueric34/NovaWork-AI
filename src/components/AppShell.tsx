import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  LayoutDashboard, Mail, MessageSquareText, NotebookPen, Search, ShieldAlert, Zap,
} from "lucide-react";

export const tools = [
  { to: "/", label: "Dashboard", short: "Home", icon: LayoutDashboard, desc: "Open a productivity tool." },
  { to: "/email", label: "Smart Email Generator", short: "Email", icon: Mail, desc: "Draft polished workplace emails in any tone." },
  { to: "/meeting-notes", label: "Meeting Notes Summarizer", short: "Meeting Notes", icon: NotebookPen, desc: "Turn transcripts into decisions and action items." },
  { to: "/research", label: "AI Research Assistant", short: "Research", icon: Search, desc: "Summaries, insights and recommendations." },
  { to: "/chat", label: "AI Chatbot", short: "Chat", icon: MessageSquareText, desc: "Get practical workplace guidance." },
] as const;

const nav = tools;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
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
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground xl:text-sm"
                activeProps={{ className: "bg-sidebar-accent !text-primary font-semibold" }}
              >
                <n.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{n.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-lg border border-warning/40 bg-warning/45 p-3 text-warning-foreground">
            <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase">
              <ShieldAlert className="h-4 w-4 shrink-0" /> Responsible AI
            </div>
            <p className="text-xs leading-relaxed">AI outputs are suggestions and require human review.</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-h-0 flex-1 overflow-y-auto pb-16 lg:pb-0">{children}</main>
          <nav className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-5 border-t border-border bg-sidebar/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden" aria-label="Tools">
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
  );
}
