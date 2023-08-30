import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find a question by its slug', async () => {
    const exampleQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'An Example Of A Title Of A Question',
      slug: Slug.create('an-example-of-a-title-of-a-question'),
      content: 'This is a content of a question',
    })

    inMemoryQuestionsRepository.create(exampleQuestion)

    const { question } = await sut.execute({
      slug: 'an-example-of-a-title-of-a-question',
    })

    expect(question.title).toEqual(exampleQuestion.title)
    expect(inMemoryQuestionsRepository.items[0].slug).toEqual(question.slug)
  })
})
