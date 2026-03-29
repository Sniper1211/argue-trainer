import { NextRequest, NextResponse } from 'next/server'

// 场景配置
const SCENARIOS = {
  workplace: {
    systemPrompt: `你是一个职场沟通训练AI。模拟以下场景：
用户是一个职场新人，正在与一个强势的同事讨论项目分工。
同事说："这个部分很简单，你来做吧，我负责更重要的部分。"

你的角色是模拟这位同事，语气可以稍微强势一些，但保持在合理范围内。
目标是训练用户：
1. 识别不合理的分工要求
2. 理性表达自己的立场
3. 提出建设性解决方案

请根据用户的回应，模拟同事的反应。每次回复后，可以简要分析用户的回应质量（逻辑性、情绪控制、策略选择）。`
  },
  relationship: {
    systemPrompt: `你是一个亲密关系沟通训练AI。模拟以下场景：
用户和伴侣因为家务分工问题发生争执。
伴侣说："我每天工作那么累，你就不能多分担一点吗？"

你的角色是模拟伴侣，语气可以带有情绪，但不要过度攻击性。
目标是训练用户：
1. 识别情绪化表达背后的真实需求
2. 避免防御性反应
3. 建立共赢的沟通模式

请根据用户的回应，模拟伴侣的反应。每次回复后，可以简要分析用户的回应质量。`
  },
  consumer: {
    systemPrompt: `你是一个消费维权沟通训练AI。模拟以下场景：
用户在电商平台购买的商品有质量问题，联系客服要求解决。
客服说："商品已超过7天无理由退换期，我们无法处理。"

你的角色是模拟客服，语气可以官方、推诿一些。
目标是训练用户：
1. 了解消费者权益相关法规
2. 有效提出诉求
3. 应对推诿的策略

请根据用户的回应，模拟客服的反应。每次回复后，可以简要分析用户的回应质量。`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, scenario = 'workplace' } = await request.json()

    // 验证输入
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: '消息格式不正确' },
        { status: 400 }
      )
    }

    // 获取DeepSeek API密钥
    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      console.error('DeepSeek API密钥未配置')
      return NextResponse.json(
        { error: '服务配置错误' },
        { status: 500 }
      )
    }

    // 构建系统消息
    const systemMessage = {
      role: 'system',
      content: SCENARIOS[scenario as keyof typeof SCENARIOS]?.systemPrompt || SCENARIOS.workplace.systemPrompt
    }

    // 构建请求体
    const requestBody = {
      model: 'deepseek-chat',
      messages: [systemMessage, ...messages],
      stream: false,
      max_tokens: 1000,
      temperature: 0.7,
    }

    // 调用DeepSeek API
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DeepSeek API错误:', response.status, errorText)
      return NextResponse.json(
        { error: 'AI服务暂时不可用' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // 提取AI回复
    const aiResponse = data.choices[0]?.message?.content || '抱歉，我没有理解你的意思。'
    
    // 提取token使用情况（用于成本监控）
    const usage = data.usage || {}

    return NextResponse.json({
      message: aiResponse,
      usage: {
        prompt_tokens: usage.prompt_tokens || 0,
        completion_tokens: usage.completion_tokens || 0,
        total_tokens: usage.total_tokens || 0,
      }
    })

  } catch (error) {
    console.error('API路由错误:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

// 添加OPTIONS方法处理CORS预检请求
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}