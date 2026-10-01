import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout, GenerateButton, useMockGenerate, field, label } from "@/components/ToolLayout";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — NovaWork AI" },
      { name: "description", content: "Get summaries, key insights and recommendations on any topic or URL." },
      { property: "og:title", content: "AI Research Assistant — NovaWork AI" },
      { property: "og:description", content: "Summaries, insights and recommendations." },
    ],
  }),
  component: Page,
});

function Page() {
  const [topic, setTopic] = useState("");
  const g = useMockGenerate();
  return (
    <ToolLayout
      title="AI Research Assistant"
      description="Enter a topic or URL to research."
      {...g}
      form={
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            g.run(
              () => `RESEARCH BRIEF: ${topic}

📄 SUMMARY
${topic} is an area of growing importance for modern organizations. Current discussion centres on improving efficiency, reducing costs, and managing risk while adapting to fast-changing market expectations. Adoption is accelerating, though maturity varies widely across industries.

🔍 KEY INSIGHTS
1. Early adopters report 20–35% productivity gains within the first year.
2. The main barriers are skills gaps, change management, and data quality.
3. Regulatory and ethical considerations are becoming a board-level topic.
4. Cross-functional ownership outperforms siloed, single-team initiatives.

🎯 RECOMMENDATIONS
• Start with a focused pilot tied to one measurable business outcome.
• Invest in team training before scaling.
• Define governance and human-review checkpoints from day one.
• Review results quarterly and iterate based on evidence.

⚠️ Note: Verify all figures against primary sources before use.`,
            );
          }}
        >
          <div>
            <label className={label}>Topic or URL</label>
            <input required value={topic} onChange={(e) => setTopic(e.target.value)} className={field}
              placeholder="e.g. Hybrid work best practices or https://..." />
          </div>
          <GenerateButton loading={g.loading} />
        </form>
      }
    />
  );
}
