import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Heart, Send, Sparkles } from "lucide-react";

export interface Message {
  id: string;
  username: string;
  avatar: string;
  timeAgo: string;
  message: string;
  likes: number;
}

interface ChallengeThreadProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
}

const ChallengeThread: React.FC<ChallengeThreadProps> = ({
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-blue-glow border border-blue-900/50 p-6">
      <div className="flex items-center justify-between border-b border-purple-500/50 pb-2 mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="text-pink-500 w-5 h-5" />
          Squad Feed
        </h3>
        <p className="text-xs text-gray-400">
          Finished your reps? Hype someone up 💯
        </p>
      </div>

      {/* Message Input Form */}

      <div className="h-[500px] overflow-y-auto mb-4 pr-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={message.id}>
              <div className="flex items-start gap-3">
                <Image
                  src={message.avatar}
                  alt={message.username}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {message.username}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {message.timeAgo}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {message.message}
                  </p>
                  <button className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{message.likes}</span>
                  </button>
                </div>
              </div>
              {index < messages.length - 1 && (
                <div className="h-px bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 my-2" />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-xl px-4 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeThread;
