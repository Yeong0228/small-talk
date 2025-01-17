import dedent from 'dedent'
import getResponseStream from '@/app/utils/openai'
import { NextRequest, NextResponse } from 'next/server'
import { GPTMessage } from '@/app/utils/chat-message'

const constructSystemPrompt = (language: string, evalLanguage: string, convo: string) => {
  return dedent`You are a professional ${evalLanguage} teacher.
  You are given a conversation below between the AI assistant and a user, and your task is to evaluate the user's performance.

  ## Rules
  - Evaluation must provided in ${language}.
  - Evaluate user's grammar, vocabulary usage, fluency, and coherence.
  - List all mistakes you find, excluding mistakes with punctuation and capitalization, and provide a suggestion for each.

  ## Conversation
  ${convo}

  ## Evaluation
  `
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return new NextResponse('This is a dummy answer used in development mode. Uncomment this line to use the API.')
  }
  const { messages, language, evalLanguage } = await request.json()
  try {
    const stream = await getResponseStream(
      constructSystemPrompt(
        language,
        evalLanguage,
        messages.map((msg: GPTMessage) => `${msg.role}: ${msg.content}`).join('\n')
      ),
      [],
      0
    )
    return new NextResponse(stream)
  } catch (e) {
    console.log('Error calling OpenAI', e)
    return new NextResponse('Error calling OpenAI', { status: 500 })
  }
}
