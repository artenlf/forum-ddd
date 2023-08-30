import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'tests/factories/make-answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const exampleAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    inMemoryAnswersRepository.create(exampleAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: exampleAnswer.id.toString(),
      content: 'Edit content test',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Edit content test',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const exampleAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(exampleAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: exampleAnswer.id.toString(),
        content: 'Edit content test',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
