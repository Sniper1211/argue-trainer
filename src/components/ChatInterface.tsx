'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Loader2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是你的AI沟通陪练。今天想练习什么场景呢？',
      role: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // 模拟AI响应 - 实际开发中替换为DeepSeek API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `我理解你的观点。在实际沟通中，我们可以尝试更理性的表达方式。比如：\n\n1. 先确认对方的核心诉求\n2. 表达自己的感受而非指责\n3. 提出建设性解决方案\n\n你觉得这样的回应方式如何？`,
        role: 'assistant',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('发送消息失败:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: '抱歉，AI服务暂时不可用。请稍后重试。',
        role: 'assistant',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`p-1 rounded-full mr-2 ${
                  message.role === 'user' ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-700" />
                  )}
                </div>
                <span className="text-sm font-medium">
                  {message.role === 'user' ? '你' : 'AI陪练'}
                </span>
                <span className="text-xs opacity-75 ml-3">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
              <div className="flex items-center">
                <div className="p-1 rounded-full bg-gray-300 mr-2">
                  <Bot className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm font-medium">AI陪练</span>
                <Loader2 className="w-4 h-4 ml-3 animate-spin text-gray-500" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t p-4">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="输入你的回应...（按Enter发送，Shift+Enter换行）"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  发送中
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  发送
                </>
              )}
            </button>
            <div className="text-xs text-gray-500 mt-2 text-center">
              {input.length}/1000
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setInput('我觉得你这个说法不太合理...')}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
            disabled={isLoading}
          >
            示例回应1
          </button>
          <button
            onClick={() => setInput('我能理解你的立场，但是...')}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
            disabled={isLoading}
          >
            示例回应2
          </button>
          <button
            onClick={() => setInput('这种情况下，我们应该...')}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
            disabled={isLoading}
          >
            示例回应3
          </button>
        </div>
      </div>
    </div>
  )
}