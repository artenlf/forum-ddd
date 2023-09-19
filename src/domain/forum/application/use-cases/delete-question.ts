import { Either, left, right } from '@/core/either'
import { PermissionDeniedError } from '@/core/errors/errors/permission-denied-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | PermissionDeniedError,
  object
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new PermissionDeniedError())
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
