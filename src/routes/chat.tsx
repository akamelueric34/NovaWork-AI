import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GenerateButton, OptionCard, ToolLayout, field, label, textAreaField, useMockGenerate } from "@/components/ToolLayout";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [
    { title: "AI Chatbot — NovaWork AI" },
    { name: "description", content: "Get clear, practical guidance for everyday workplace tasks." },
    { property: "og:title", content: "AI Chatbot — NovaWork AI" },
    { property: "og:description", content: "Practical workplace guidance in seconds." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ChatPage,
});

function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [style, setStyle] = useState("Concise");
  const g = useMockGenerate();
  const styleOptions = [
    { title: "Concise", description: "Short answer" },
    { title: "Detailed", description: "More context" },
    { title: "Actionable", description: "Clear steps" },
  ];
  return <ToolLayout title="AI Chatbot" description="Get practical help with a workplace question." {...g} form={
    <form className="flex h-full flex-col gap-5" onSubmit={(event) => { event.preventDefault(); g.run(() => `Here’s a ${style.toLowerCase()} response to your request:\n\n${prompt}\n\nRecommended approach:\n• Clarify the desired outcome and deadline.\n• Break the work into the next three practical steps.\n• Confirm ownership and review the result before sharing.\n\nSuggested next step: Write a short first draft, then ask the relevant colleague to verify any facts or commitments.${context ? `\n\nContext considered: ${context}` : ""}`); }}>
      <div><label className={label}>Response Style</label><div className="grid grid-cols-3 gap-2">{styleOptions.map((option) => <OptionCard key={option.title} title={option.title} description={option.description} selected={style === option.title} onClick={() => setStyle(option.title)} />)}</div></div>
      <div><label className={label}>Work Context</label><input value={context} onChange={(event) => setContext(event.target.value)} className={field} placeholder="e.g. Preparing for a client meeting" /></div>
      <div className="flex-1"><label className={label}>Your Question</label><textarea required value={prompt} onChange={(event) => setPrompt(event.target.value)} className={`${textAreaField} min-h-56`} placeholder="Ask for help drafting, planning, proofreading, or solving a workplace task..." /></div>
      <GenerateButton loading={g.loading}>Generate Response</GenerateButton>
    </form>
  } />;
}