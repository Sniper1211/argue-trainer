// 本地存储工具 - 纯前端数据持久化方案

const STORAGE_KEYS = {
  TRAINING_HISTORY: 'argue_trainer_history',
  USER_PREFERENCES: 'argue_trainer_prefs',
  SCENARIO_PROGRESS: 'argue_trainer_progress',
} as const

export interface TrainingSession {
  id: string
  scenario: string
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: number
  }>
  startedAt: number
  endedAt?: number
  feedback?: {
    logicScore: number // 1-5
    emotionScore: number // 1-5
    strategyScore: number // 1-5
    notes?: string
  }
}

export interface UserPreferences {
  preferredScenarios: string[]
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  autoSave: boolean
  theme: 'light' | 'dark' | 'system'
}

export interface ScenarioProgress {
  scenarioId: string
  completedSessions: number
  averageScores: {
    logic: number
    emotion: number
    strategy: number
  }
  lastPracticed: number
}

// 训练历史管理
export const storage = {
  // 保存训练会话
  saveSession(session: TrainingSession): void {
    try {
      const history = this.getHistory()
      history.push(session)
      localStorage.setItem(STORAGE_KEYS.TRAINING_HISTORY, JSON.stringify(history))
    } catch (error) {
      console.error('保存训练会话失败:', error)
    }
  },

  // 获取所有训练历史
  getHistory(): TrainingSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRAINING_HISTORY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('读取训练历史失败:', error)
      return []
    }
  },

  // 获取最近N次训练
  getRecentSessions(limit: number = 10): TrainingSession[] {
    const history = this.getHistory()
    return history
      .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0))
      .slice(0, limit)
  },

  // 清空训练历史
  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.TRAINING_HISTORY)
  },

  // 用户偏好设置
  getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES)
      return data ? JSON.parse(data) : {
        preferredScenarios: ['workplace'],
        difficultyLevel: 'beginner',
        autoSave: true,
        theme: 'system'
      }
    } catch (error) {
      console.error('读取用户偏好失败:', error)
      return {
        preferredScenarios: ['workplace'],
        difficultyLevel: 'beginner',
        autoSave: true,
        theme: 'system'
      }
    }
  },

  savePreferences(prefs: UserPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs))
    } catch (error) {
      console.error('保存用户偏好失败:', error)
    }
  },

  // 场景进度跟踪
  updateProgress(scenarioId: string, scores: { logic: number; emotion: number; strategy: number }): void {
    try {
      const progressData = this.getProgress()
      const existing = progressData.find(p => p.scenarioId === scenarioId)
      
      if (existing) {
        existing.completedSessions += 1
        existing.averageScores.logic = this.calculateAverage(
          existing.averageScores.logic,
          existing.completedSessions - 1,
          scores.logic
        )
        existing.averageScores.emotion = this.calculateAverage(
          existing.averageScores.emotion,
          existing.completedSessions - 1,
          scores.emotion
        )
        existing.averageScores.strategy = this.calculateAverage(
          existing.averageScores.strategy,
          existing.completedSessions - 1,
          scores.strategy
        )
        existing.lastPracticed = Date.now()
      } else {
        progressData.push({
          scenarioId,
          completedSessions: 1,
          averageScores: scores,
          lastPracticed: Date.now()
        })
      }
      
      localStorage.setItem(STORAGE_KEYS.SCENARIO_PROGRESS, JSON.stringify(progressData))
    } catch (error) {
      console.error('更新进度失败:', error)
    }
  },

  getProgress(): ScenarioProgress[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCENARIO_PROGRESS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('读取进度失败:', error)
      return []
    }
  },

  // 工具函数
  private calculateAverage(currentAverage: number, currentCount: number, newValue: number): number {
    return (currentAverage * currentCount + newValue) / (currentCount + 1)
  },

  // 导出数据（备份功能）
  exportData(): string {
    const data = {
      history: this.getHistory(),
      preferences: this.getPreferences(),
      progress: this.getProgress(),
      exportedAt: Date.now(),
      version: '1.0'
    }
    return JSON.stringify(data, null, 2)
  },

  // 导入数据
  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString)
      
      if (data.history) {
        localStorage.setItem(STORAGE_KEYS.TRAINING_HISTORY, JSON.stringify(data.history))
      }
      
      if (data.preferences) {
        localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(data.preferences))
      }
      
      if (data.progress) {
        localStorage.setItem(STORAGE_KEYS.SCENARIO_PROGRESS, JSON.stringify(data.progress))
      }
      
      return true
    } catch (error) {
      console.error('导入数据失败:', error)
      return false
    }
  },

  // 存储使用情况
  getStorageUsage(): { used: number; total: number } {
    try {
      let total = 0
      Object.values(STORAGE_KEYS).forEach(key => {
        const item = localStorage.getItem(key)
        if (item) {
          total += item.length * 2 // 近似计算，UTF-16字符
        }
      })
      
      return {
        used: total,
        total: 5 * 1024 * 1024 // localStorage通常限制为5MB
      }
    } catch (error) {
      return { used: 0, total: 0 }
    }
  }
}