import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout, GenerateButton, useMockGenerate, field, label } from "@/components/ToolLayout";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — NovaWork AI" },
      { name: "description", content: "Generate polished workplace emails in a formal, friendly or persuasive tone." },
      { property: "og:title", content: "Smart Email Generator — NovaWork AI" },
      { property: "og:description", content: "Generate polished workplace emails in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

const openers = {
  Formal: ["Dear Team,", "I am writing regarding the following matter:", "Please do not hesitate to contact me should you require further information.", "Kind regards,"],
  Friendly: ["Hi everyone,", "Hope your week is going well! Quick note about this:", "Let me know if you have any questions — happy to help!", "Cheers,"],
  Persuasive: ["Hello Team,", "I'd like to propose an opportunity that I believe will make a real difference:", "I'm confident this will deliver strong results, and I'd love your support to move forward this week.", "Best regards,"],
} as const;

function EmailPage() {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<keyof typeof openers>("Formal");
  const g = useMockGenerate();
  return (
    <ToolLayout
      title="Smart Email Generator"
      description="Describe what you need to say and choose a tone."
      {...g}
      form={
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const [hi, intro, close, sign] = openers[tone];
            g.run(
              () => `Subject: Update — ${context.slice(0, 50) || "Project Follow-up"}

${hi}

${intro}

${context || "We need to align on the next steps for the current project."}

To keep things moving, here are the proposed next steps:
• Review the attached details by end of week
• Share any feedback or concerns in our team channel
• Confirm availability for a short sync on Thursday

${close}

${sign}
[Your Name]`,
            );
          }}
        >
          <div>
            <label className={label}>Email Context</label>
            <textarea rows={8} required value={context} onChange={(e) => setContext(e.target.value)} className={field}
              placeholder="e.g. Follow up with the client about the delayed Q3 deliverable and propose a new date." />
          </div>
          <div>
            <label className={label}>Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value as keyof typeof openers)} className={field}>
              <option>Formal</option>
              <option>Friendly</option>
              <option>Persuasive</option>
            </select>
          </div>
          <GenerateButton loading={g.loading}>Generate Professional Draft</GenerateButton>
        </form>
      }
    />
  );
}
