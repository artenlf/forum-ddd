import { Either, left, right } from '@/core/either'
import { PermissionDeniedError } from '@/core/errors/errors/permission-denied-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | PermissionDeniedError,
  object
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new PermissionDeniedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
