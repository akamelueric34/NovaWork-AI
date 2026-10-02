import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout, GenerateButton, OptionCard, useMockGenerate, field, label, textAreaField } from "@/components/ToolLayout";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — NovaWork AI" },
      { name: "description", content: "Get summaries, key insights and recommendations on any topic or URL." },
      { property: "og:title", content: "AI Research Assistant — NovaWork AI" },
      { property: "og:description", content: "Summaries, insights and recommendations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Quick");
  const [focus, setFocus] = useState("");
  const g = useMockGenerate();
  return (
    <ToolLayout
      title="AI Research Assistant"
      description="Enter a topic or URL to research."
      {...g}
      form={
        <form
          className="flex h-full flex-col gap-5"
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
          <div className="grid gap-3 sm:grid-cols-2"><div>
            <label className={label}>Topic or URL</label><input required value={topic} onChange={(e) => setTopic(e.target.value)} className={field}
              placeholder="e.g. Hybrid work best practices or https://..." />
          </div><div><label className={label}>Research Focus</label><input value={focus} onChange={(e) => setFocus(e.target.value)} className={field} placeholder="e.g. Risks and trends" /></div></div>
          <div><label className={label}>Depth</label><div className="grid grid-cols-3 gap-2">{[["Quick", "Top findings"], ["Focused", "Useful detail"], ["Deep", "Full brief"]].map(([title, description]) => <OptionCard key={title} title={title} description={description} selected={depth === title} onClick={() => setDepth(title)} />)}</div></div>
          <div className="flex-1"><label className={label}>Context or Article Text</label><textarea value={focus} onChange={(e) => setFocus(e.target.value)} className={`${textAreaField} min-h-48`} placeholder="Add context, questions, or article text to guide the research..." /></div>
          <GenerateButton loading={g.loading}>Synthesize Research</GenerateButton>
        </form>
      }
    />
  );
}
