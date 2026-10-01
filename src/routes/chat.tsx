import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Copy, Check, Send, Loader2 } from "lucide-react";
import { field } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Workplace Chat — NovaWork AI" },
      { name: "description", content: "Get practical guidance for everyday workplace questions." },
      { property: "og:title", content: "Workplace Chat — NovaWork AI" },
      { property: "og:description", content: "Your on-demand workplace assistant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Chat,
});

type Msg = { role: "user" | "ai"; text: string };

const replies = [
  "Great question! Here's a practical approach:\n\n1. Clarify the goal and the deadline.\n2. Break the work into small, owned tasks.\n3. Schedule a quick check-in midway.\n\nWant me to draft a message to your team?",
  "Here are a few tips:\n\n• Block focus time on your calendar.\n• Batch similar tasks together.\n• Use the 2-minute rule for quick items.\n\nWould you like help turning these into clear next steps?",
  "For difficult conversations, try the SBI model: describe the Situation, the Behavior, and its Impact. Keep it factual and invite their perspective.",
  "I'd suggest keeping it concise: lead with the key point, add one or two supporting details, and close with a clear next step.",
];

const suggestions = ["Proofread my text", "Suggest a meeting agenda", "Plan my priorities"];

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
      setMsgs((m) => [...m, { role: "ai", text: replies[Math.floor(Math.random() * replies.length)] ?? "How can I help with your work?" }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col p-4 sm:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Workplace Chat</h1>
      <p className="mt-1 text-muted-foreground">Ask anything about your workday.</p>
      <div className="mt-6 flex min-h-0 flex-1 flex-col rounded-lg border border-border bg-card">
        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          {msgs.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-wrap rounded-lg rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-primary"><Bot className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <textarea
                    value={m.text}
                    onChange={(e) => setMsgs((all) => all.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                    rows={m.text.split("\n").length + 1}
                    className="w-full resize-none rounded-lg border border-transparent bg-transparent p-1 text-sm leading-relaxed outline-none hover:border-border focus:border-primary"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground"
                    onClick={() => { navigator.clipboard.writeText(m.text); setCopied(i); toast.success("Copied to clipboard"); setTimeout(() => setCopied(null), 1500); }}
                  >
                    {copied === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === i ? "Copied" : "Copy to Clipboard"}
                  </Button>
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
        <div className="flex flex-wrap gap-2 border-t border-border px-3 pt-3">
          {suggestions.map((suggestion) => (
            <Button key={suggestion} variant="outline" size="sm" onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}>
              {suggestion}
            </Button>
          ))}
        </div>
        <form className="flex gap-2 p-3" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type your message..."
            className={`${field} resize-none`}
          />
          <Button type="submit" disabled={loading || !input.trim()} aria-label="Send" size="icon" className="h-11 w-11 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
