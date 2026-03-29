'use client'

import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    { role: 'assistant', content: '你好！我是你的AI沟通陪练。今天想练习什么场景呢？' }
  ])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          scenario: 'workplace'
        })
      })

      const data = await response.json()
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '抱歉，服务暂时不可用。请稍后重试。' 
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Argue Trainer</h1>
          <p className="text-gray-600 mt-2">AI沟通训练 · 纯前端实现</p>
        </header>

        {/* 主内容 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧信息 */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800 mb-3">使用说明</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 输入你的回应，AI会模拟对话</li>
                <li>• 练习职场、亲密关系等场景</li>
                <li>• 提升逻辑思维和情绪控制</li>
                <li>• 数据保存在本地，保护隐私</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800 mb-3">技术栈</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Next.js</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Tailwind</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">DeepSeek</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Vercel</span>
              </div>
            </div>
          </div>

          {/* 聊天区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* 消息区域 */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="text-sm opacity-75 mb-1">
                        {msg.role === 'user' ? '你' : 'AI陪练'}
                      </div>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                      <div className="flex items-center">
                        <div className="animate-pulse">思考中...</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 输入区域 */}
              <form onSubmit={handleSubmit} className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="输入你的回应..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '发送中...' : '发送'}
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  按Enter发送，Shift+Enter换行
                </div>
              </form>
            </div>

            {/* 快捷提示 */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setInput('我觉得这个安排不太合理...')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
                disabled={loading}
              >
                示例1
              </button>
              <button
                onClick={() => setInput('我能理解你的立场，但是...')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
                disabled={loading}
              >
                示例2
              </button>
              <button
                onClick={() => setInput('这种情况下，我们应该...')}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
                disabled={loading}
              >
                示例3
              </button>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="mt-8 pt-6 border-t text-center text-gray-500 text-sm">
          <p>纯前端实现 · AI API按量付费 · Vercel免费托管</p>
          <p className="mt-1">
            <a 
              href="https://github.com/Sniper1211/argue-trainer" 
              className="text-blue-600 hover:underline"
            >
              GitHub仓库
            </a>
            {' · '}
            <a 
              href="https://vercel.com" 
              className="text-blue-600 hover:underline"
            >
              Vercel部署
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}