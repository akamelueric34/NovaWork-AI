import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout, GenerateButton, useMockGenerate, field, label } from "@/components/ToolLayout";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — NovaWork AI" },
      { name: "description", content: "Turn an unstructured to-do list into a prioritized daily schedule." },
      { property: "og:title", content: "AI Task Planner — NovaWork AI" },
      { property: "og:description", content: "A prioritized daily schedule from your to-dos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function buildPlan(raw: string) {
  const tasks = raw.split(/\n|,|;/).map((t) => t.trim().replace(/^[-•*\d.]+\s*/, "")).filter(Boolean);
  const list = tasks.length ? tasks : ["Review inbox", "Prepare report", "Team sync"];
  const slots = ["09:00 – 10:00", "10:15 – 11:30", "11:30 – 12:30", "13:30 – 14:30", "14:45 – 15:45", "16:00 – 17:00"];
  const prio = ["🔴 High", "🔴 High", "🟠 Medium", "🟠 Medium", "🟢 Low", "🟢 Low"];
  let out = `PRIORITIZED DAILY SCHEDULE\n\n`;
  list.slice(0, 6).forEach((t, i) => {
    out += `${slots[i]}  ${prio[i]}\n  → ${t}\n\n`;
    if (i === 2) out += `12:30 – 13:30  🍽  Lunch break\n\n`;
  });
  if (list.length > 6) out += `⏭ DEFERRED TO TOMORROW\n${list.slice(6).map((t) => `• ${t}`).join("\n")}\n\n`;
  out += `💡 TIPS\n• Tackle high-priority tasks during your morning focus window.\n• Silence notifications during deep-work blocks.\n• Leave 15 minutes at day's end to review and plan tomorrow.`;
  return out;
}

function Page() {
  const [text, setText] = useState("");
  const g = useMockGenerate();
  return (
    <ToolLayout
      title="AI Task Planner"
      description="Dump your to-dos — get a structured, prioritized day."
      {...g}
      form={
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); g.run(() => buildPlan(text)); }}>
          <div>
            <label className={label}>Your To-Do List</label>
            <textarea rows={14} required value={text} onChange={(e) => setText(e.target.value)} className={field}
              placeholder={"finish Q3 report\ncall vendor about invoice\nreview PRs\nprep slides for Friday\ngym"} />
          </div>
          <GenerateButton loading={g.loading}>Organize My Day</GenerateButton>
        </form>
      }
    />
  );
}
