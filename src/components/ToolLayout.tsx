import { useState, type ReactNode } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const field =
  "w-full rounded-lg border border-input bg-background/80 px-3.5 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 sm:text-sm";
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

export function GenerateButton({ loading, disabled, children = "Generate" }: { loading: boolean; disabled?: boolean; children?: ReactNode }) {
  return (
    <Button
      type="submit"
      disabled={loading || disabled}
      className="h-11 w-full font-semibold"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? "Working..." : children}
    </Button>
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
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="mx-auto flex min-h-full max-w-7xl flex-col p-4 sm:p-6 lg:p-8">
      <div className="flex min-w-0 items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-glow" />
        <h1 className="truncate text-xl font-bold sm:text-2xl lg:text-3xl">{title}</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground sm:text-base">{description}</p>
      <div className="mt-4 grid flex-1 gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:mt-6">
        <section className="rounded-xl border border-border/80 bg-card/70 p-4 shadow-glow backdrop-blur-md sm:p-5">{form}</section>
        <section className="flex min-h-[320px] flex-col rounded-xl border border-border/80 bg-card/70 p-4 shadow-glow backdrop-blur-md sm:min-h-[420px] sm:p-5">
          <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <h2 className="min-w-0 truncate font-semibold">AI Output <span className="text-xs font-normal text-muted-foreground">(editable)</span></h2>
            <Button
              variant="outline"
              size="sm"
              onClick={copy}
              disabled={!output || loading}
              aria-label="Copy generated output"
              className="shrink-0 px-3"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy to Clipboard"}</span>
              <span className="sm:hidden">{copied ? "Copied" : "Copy"}</span>
            </Button>
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
