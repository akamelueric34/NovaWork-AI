import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Copy, Check, Send, Loader2 } from "lucide-react";
import { field } from "@/components/ToolLayout";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — NovaWork AI" },
      { name: "description", content: "Chat with NovaWork AI about any workplace question." },
      { property: "og:title", content: "AI Chatbot — NovaWork AI" },
      { property: "og:description", content: "Your on-demand workplace assistant." },
    ],
  }),
  component: Chat,
});

type Msg = { role: "user" | "ai"; text: string };

const replies = [
  "Great question! Here's a practical approach:\n\n1. Clarify the goal and the deadline.\n2. Break the work into small, owned tasks.\n3. Schedule a quick check-in midway.\n\nWant me to draft a message to your team?",
  "Here are a few tips:\n\n• Block focus time on your calendar.\n• Batch similar tasks together.\n• Use the 2-minute rule for quick items.\n\nShall I build you a daily plan with the Task Planner?",
  "For difficult conversations, try the SBI model: describe the Situation, the Behavior, and its Impact. Keep it factual and invite their perspective.",
  "I'd suggest keeping it concise: lead with the key point, add one or two supporting details, and close with a clear next step.",
];

function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm NovaWork AI. How can I help with your work today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, loading]);
  useEffect(() => { if (!loading) inputRef.current?.focus(); }, [loading]);

  const send = () => {
    const t = input.trim();
    if (!t || loading) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: replies[Math.floor(Math.random() * replies.length)] }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col p-4 sm:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">AI Chatbot</h1>
      <p className="mt-1 text-muted-foreground">Ask anything about your workday.</p>
      <div className="mt-6 flex min-h-0 flex-1 flex-col rounded-xl border border-border bg-card">
        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          {msgs.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand text-primary-foreground"><Bot className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <textarea
                    value={m.text}
                    onChange={(e) => setMsgs((all) => all.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                    rows={m.text.split("\n").length + 1}
                    className="w-full resize-none rounded-lg border border-transparent bg-transparent p-1 text-sm leading-relaxed outline-none hover:border-border focus:border-primary"
                  />
                  <button
                    onClick={() => { navigator.clipboard.writeText(m.text); setCopied(i); setTimeout(() => setCopied(null), 1500); }}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    {copied === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === i ? "Copied" : "Copy to Clipboard"}
                  </button>
                </div>
              </div>
            ),
          )}
          {loading && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" /> NovaWork AI is typing...
            </div>
          )}
          <div ref={end} />
        </div>
        <form className="flex gap-2 border-t border-border p-3" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type your message..."
            className={`${field} resize-none`}
          />
          <button type="submit" disabled={loading || !input.trim()} aria-label="Send"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand text-primary-foreground disabled:opacity-50">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
