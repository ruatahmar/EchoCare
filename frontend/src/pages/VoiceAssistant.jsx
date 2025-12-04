import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, User, Bot } from "lucide-react";
import { familyMembers, medicines, conversationHistory } from "../mockData";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState(conversationHistory);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        addMessage(transcript, "user");
        processVoiceQuery(transcript);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    setListening(false);
    recognitionRef.current.stop();
  };

  const addMessage = (text, sender) => {
    const newMsg = {
      id: messages.length + 1,
      timestamp: new Date().toLocaleTimeString(),
      user: sender === "user" ? text : null,
      assistant: sender === "assistant" ? text : null,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const processVoiceQuery = (query) => {
    let response = "I didn't understand that. Could you repeat?";

    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("who is")) {
      const name = lowerQuery.replace("who is", "").trim();
      const person = familyMembers.find((m) => m.name.toLowerCase() === name);
      if (person) response = `${person.name} is your ${person.relation}. ${person.detail}`;
      else response = "I couldn't find that person in your family list.";
    }

    else if (lowerQuery.includes("medicine") || lowerQuery.includes("meds")) {
      const nextMed = medicines[0];
      response = `Your next medicine is ${nextMed.name} at ${nextMed.time}.`;
    }

    else if (lowerQuery.includes("help") || lowerQuery.includes("emergency")) {
      response = "Alert! I will notify your family immediately.";
    }

    addMessage(response, "assistant");
    speak(response);
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>EchoCare Voice Assistant</h1>

      <div style={styles.messageBox}>
        {messages.map((msg) => (
          <div key={msg.id} style={styles.messageRow}>
            {msg.user && (
              <div style={styles.userMessage}>
                <User size={16} /> {msg.user}
              </div>
            )}
            {msg.assistant && (
              <div style={styles.botMessage}>
                <Bot size={16} /> {msg.assistant}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={listening ? stopListening : startListening}
        style={listening ? styles.stopButton : styles.micButton}
      >
        {listening ? <MicOff size={32} /> : <Mic size={32} />}
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  messageBox: {
    height: "60vh",
    overflowY: "auto",
    background: "#f0f0f0",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "2rem",
  },
  messageRow: {
    marginBottom: "1rem",
  },
  userMessage: {
    background: "#d1e7ff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "left",
  },
  botMessage: {
    background: "#e8ffe4",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "left",
  },
  micButton: {
    background: "#4caf50",
    border: "none",
    padding: "1rem",
    borderRadius: "50%",
    cursor: "pointer",
    color: "white",
  },
  stopButton: {
    background: "#e53935",
    border: "none",
    padding: "1rem",
    borderRadius: "50%",
    cursor: "pointer",
    color: "white",
  },
};

export default VoiceAssistant;
