import { Either, left, right } from '@/core/either'
import { PermissionDeniedError } from '@/core/errors/errors/permission-denied-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | PermissionDeniedError,
  object
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new PermissionDeniedError())
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}
