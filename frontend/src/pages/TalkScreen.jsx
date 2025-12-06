import React, { useState } from "react";
import { Mic, Send } from "lucide-react";

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" }
  ]);

  // ✅ FIX: Define SpeechRecognition properly
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = false;

    // When speech is detected
    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;

      setMessages((prev) => [
        ...prev,
        { from: "user", text: transcript }
      ]);

      // TODO: Send transcript to backend or AI to generate response
    };

    recognition.onerror = (err) => {
      console.log("Speech Error:", err);
      setIsListening(false);
    };
  }

  const toggleMic = () => {
    if (!recognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (!isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    setIsListening(!isListening);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Voice Assistant
      </h1>

      {/* Mic button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleMic}
          className={`w-24 h-24 rounded-full shadow-xl flex items-center justify-center transition-all text-white text-3xl font-bold ${
            isListening ? "bg-red-500 scale-110" : "bg-blue-500"
          }`}
        >
          <Mic size={48} />
        </button>
      </div>

      {/* Text input */}
      <div className="flex items-center gap-3 mb-6">
        <input
          className="flex-1 p-3 border rounded-xl shadow-sm focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="p-3 bg-green-500 text-white rounded-xl shadow-lg"
        >
          <Send size={22} />
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-xl">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 mb-3 max-w-[80%] rounded-xl text-sm shadow ${
              msg.from === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
