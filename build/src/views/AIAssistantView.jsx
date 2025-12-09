import React, { useState } from "react";
import { Icons } from "../components/Icons";

export default function AIAssistantView() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I'm your AI assistant. Ask me anything — calculations, DOTD procedures, QC help, or field guidance.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    const reply = {
      role: "assistant",
      content: `You said: "${input}". I can help with calculations, DOTD procedures, QC workflows, or anything else you need.`,
    };

    setMessages((prev) => [...prev, reply]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[80vh] bg-black border border-zinc-800 rounded-xl overflow-hidden animate-in fade-in">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900">
        <Icons.Bot className="text-green-500" size={20} />
        <h2 className="text-lg font-black text-white uppercase tracking-wide">
          AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "assistant"
                ? "bg-zinc-900 text-zinc-200 border border-zinc-700"
                : "bg-green-600 text-white ml-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex items-center gap-3">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-green-600 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg font-bold flex items-center gap-2 uppercase text-xs"
          type="button"
        >
          <Icons.Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
}
