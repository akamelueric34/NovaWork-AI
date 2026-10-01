import { useState, type ReactNode } from "react";
import { Copy, Check, Loader2 } from "lucide-react";

export const field =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";
export const label = "mb-1.5 block text-sm font-medium";

export function useMockGenerate() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const run = (make: () => string) => {
    setLoading(true);
    setTimeout(() => {
      setOutput(make());
      setLoading(false);
    }, 1500);
  };
  return { output, setOutput, loading, run };
}

export function GenerateButton({ loading, disabled }: { loading: boolean; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-50"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? "Generating..." : "Generate"}
    </button>
  );
}

export function ToolLayout({
  title, description, form, output, setOutput, loading,
}: {
  title: string; description: string; form: ReactNode; output: string;
  setOutput: (v: string) => void; loading: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="mt-1 text-muted-foreground">{description}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5">{form}</section>
        <section className="flex min-h-[420px] flex-col rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="font-semibold">AI Output <span className="text-xs font-normal text-muted-foreground">(editable)</span></h2>
            <button
              onClick={copy}
              disabled={!output || loading}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary disabled:opacity-40"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
          {loading ? (
            <div className="grid flex-1 place-items-center rounded-lg border border-dashed border-border">
              <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                NovaWork AI is thinking...
              </div>
            </div>
          ) : (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Your generated content will appear here."
              className={`${field} flex-1 resize-none font-mono text-[13px] leading-relaxed`}
            />
          )}
        </section>
      </div>
    </div>
  );
}
