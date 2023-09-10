import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { PermissionDeniedError } from './errors/permission-denied-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const exampleQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepository.create(exampleQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: exampleQuestion.id.toString(),
      title: 'Edit Question Test',
      content: 'Edit content test',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Edit Question Test',
      content: 'Edit content test',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const exampleQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(exampleQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: exampleQuestion.id.toString(),
      title: 'Edit Question Test',
      content: 'Edit content test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PermissionDeniedError)
  })
})
