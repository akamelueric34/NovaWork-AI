import { useState, type ReactNode } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const field =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";
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
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="mt-1 text-muted-foreground">{description}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-card p-5">{form}</section>
        <section className="flex min-h-[420px] flex-col rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="font-semibold">AI Output <span className="text-xs font-normal text-muted-foreground">(editable)</span></h2>
            <Button
              variant="outline"
              size="sm"
              onClick={copy}
              disabled={!output || loading}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy to Clipboard"}
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
