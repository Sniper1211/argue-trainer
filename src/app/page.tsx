import ChatInterface from '@/components/ChatInterface'
import ScenarioSelector from '@/components/ScenarioSelector'
import TrainingStats from '@/components/TrainingStats'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Argue Trainer</h1>
              <p className="text-gray-600 mt-2">
                AI吵架陪练 · 理性思辨与情绪控制训练平台
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                开始训练
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                训练历史
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：场景选择 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">训练场景</h2>
              <ScenarioSelector />
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700 mb-3">训练目标</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">逻辑思维训练</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">情绪控制能力</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">策略选择能力</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 中间：对话界面 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">AI陪练对话</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      与AI模拟真实冲突场景，提升沟通能力
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      在线
                    </span>
                  </div>
                </div>
              </div>
              
              <ChatInterface />
            </div>

            {/* 训练统计 */}
            <div className="mt-8">
              <TrainingStats />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                © 2026 Argue Trainer. 基于Vibe Coding实践开发.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                使用指南
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                隐私政策
              </a>
              <a href="https://github.com/Sniper1211/argue-trainer" 
                 className="text-gray-500 hover:text-gray-700">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}