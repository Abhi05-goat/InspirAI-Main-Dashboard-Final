"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: string
  content: string
}

interface ChatbotPanelProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  pageContext?: string
}

export default function ChatbotPanel({ messages, onSendMessage, pageContext }: ChatbotPanelProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (inputValue.trim()) {
      setIsLoading(true)
      onSendMessage(inputValue)
      setInputValue("")

      // TODO: Wire up actual chatbot API call here with pageContext
      // Example:
      // const response = await fetch('/api/chatbot/message', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     message: inputValue,
      //     context: pageContext  // Send parsed HTML context to chatbot
      //   })
      // })

      setTimeout(() => setIsLoading(false), 500)
    }
  }

  return (
    <div
      className={`fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white border-2 border-blue-200 rounded-xl shadow-lg flex flex-col transition-all duration-300 ${isOpen ? "h-96" : "h-14"}`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b-2 border-blue-200 cursor-pointer bg-blue-600 text-white rounded-t-lg hover:bg-blue-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
          <h3 className="font-semibold">InspirAI Assistant</h3>
        </div>
        <button className="text-white hover:opacity-80 transition-opacity font-bold">{isOpen ? "−" : "+"}</button>
      </div>

      {/* Messages */}
      {isOpen && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none shadow-md"
                      : "bg-white text-gray-800 border-2 border-blue-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border-2 border-blue-200 px-4 py-2 rounded-lg text-sm rounded-bl-none shadow-sm">
                  <span className="inline-block animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-blue-200 p-4 flex gap-2 bg-white">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border-2 border-blue-200 text-gray-800 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition-all text-sm font-semibold disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  )
}
