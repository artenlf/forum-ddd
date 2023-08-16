import { expect, test } from 'vitest'
import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async function (answer: Answer) {
    return
  }
} 


test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    mentorId: '1',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})