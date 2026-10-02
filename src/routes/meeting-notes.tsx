import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout, GenerateButton, useMockGenerate, field, label, textAreaField } from "@/components/ToolLayout";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — NovaWork AI" },
      { name: "description", content: "Turn raw meeting transcripts into key decisions and action items." },
      { property: "og:title", content: "Meeting Notes Summarizer — NovaWork AI" },
      { property: "og:description", content: "Transcripts to decisions and action items." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const mock = `MEETING SUMMARY
Date: ${new Date().toLocaleDateString()}

📌 KEY DECISIONS
• Product launch moved to the second week of next month to allow extra QA.
• Marketing budget reallocated: 60% digital, 40% events.
• Weekly stand-ups shift to Tuesdays at 10:00.
• Customer onboarding flow redesign approved for Q4.

✅ ACTION ITEMS
• [Sarah] Finalize the QA test plan — Due: Friday
• [James] Share revised marketing budget breakdown — Due: Wednesday
• [Priya] Draft onboarding wireframes for review — Due: Next Monday
• [Team] Update calendars for the new stand-up time — Due: Today

💬 OPEN QUESTIONS
• Do we need additional contractor support for QA?
• Which events should be prioritized in the events budget?`;

function Page() {
  const [text, setText] = useState("");
  const [meeting, setMeeting] = useState("");
  const [participants, setParticipants] = useState("");
  const g = useMockGenerate();
  return (
    <ToolLayout
      title="Meeting Notes Summarizer"
      description="Paste a raw transcript and get structured notes."
      {...g}
      form={
        <form className="flex h-full flex-col gap-5" onSubmit={(e) => { e.preventDefault(); g.run(() => `${meeting ? `${meeting.toUpperCase()}\n${participants ? `Participants: ${participants}\n\n` : ""}` : ""}${mock}`); }}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className={label}>Meeting</label><input value={meeting} onChange={(e) => setMeeting(e.target.value)} className={field} placeholder="e.g. Weekly planning" /></div>
            <div><label className={label}>Participants</label><input value={participants} onChange={(e) => setParticipants(e.target.value)} className={field} placeholder="e.g. Sarah, James" /></div>
          </div>
          <div>
            <label className={label}>Raw Transcript</label>
            <textarea rows={12} required value={text} onChange={(e) => setText(e.target.value)} className={`${textAreaField} min-h-64`}
              placeholder="Paste your meeting transcript here..." />
          </div>
          <GenerateButton loading={g.loading}>Extract Action Items</GenerateButton>
        </form>
      }
    />
  );
}
