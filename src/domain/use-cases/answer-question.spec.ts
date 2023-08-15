import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('Create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    questionId: '1',
    mentorId: '1',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})