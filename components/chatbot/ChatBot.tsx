// components/Chatbot.tsx
import { useEffect, useState } from "react";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";
import { botFAQs } from "./FAQ";
import { X } from "lucide-react";

const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
};

export const Chatbot = () => {
  const [model, setModel] = useState<use.UniversalSentenceEncoder>();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { user: string; bot: string; time: string; isStreaming?: boolean }[]
  >([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const loadModel = async () => {
    const loaded = await use.load();
    setModel(loaded);
  };

  useEffect(() => {
    tf.ready().then(loadModel);
  }, []);

  const getBotResponse = async (question: string): Promise<string> => {
    if (!model) return "Model loading...";
    const inputEmbeddings = await model.embed([question]);
    const inputVec = Array.from(inputEmbeddings.arraySync()[0]);

    let bestScore = -1;
    let bestAnswer = "Hmm, I don't know that yet.";

    for (const faq of botFAQs) {
      const faqEmbedding = await model.embed([faq.question]);
      const faqVec = Array.from(faqEmbedding.arraySync()[0]);
      const score = cosineSimilarity(inputVec, faqVec);
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = faq.answer;
      }
    }
    if (bestScore < 0.5) {
      bestAnswer = "Hmm, I don't know that yet."; // Remove HTML tags
    }
    console.log("bestscore:", bestScore);

    return bestAnswer;
  };

  const streamResponse = async (fullText: string, index: number) => {
    for (let i = 0; i <= fullText.length; i++) {
      await new Promise((res) => setTimeout(res, 25)); // 25ms per char
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[index] = {
          ...newMessages[index],
          bot: fullText.slice(0, i),
        };
        return newMessages;
      });
    }

    // Mark streaming as done
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[index].isStreaming = false;
      return newMessages;
    });
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = { user: input, bot: "", time, isStreaming: true };
    const newIndex = messages.length;

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const botReply = await getBotResponse(input);
    await streamResponse(botReply, newIndex);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 bg-background shadow-lg rounded-xl border flex flex-col h-96">
          <div className="p-3 border-b font-semibold text-center relative">
            <h2 className="font-bold text-center">🤖 FocusBot</h2>
            <button
              className="absolute top-3 right-3 text-primary"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col items-end">
                <div className="bg-primary text-white p-2 rounded-md text-sm self-end max-w-xs">
                  <p>{msg.user}</p>
                </div>
                <div className="bg-gray-100 text-black p-2 rounded-md text-sm self-start max-w-xs mt-1">
                  <p>{msg.bot}</p>
                  {msg.isStreaming && (
                    <span className="animate-pulse text-xs text-gray-400">
                      Typing...
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 self-end">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 rounded px-2 py-1 text-sm border"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              className="text-sm px-3 py-1 rounded bg-primary text-white disabled:opacity-50"
              disabled={isTyping}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-full shadow-xl bg-primary text-white"
        >
          💬 Chat
        </button>
      )}
    </div>
  );
};
