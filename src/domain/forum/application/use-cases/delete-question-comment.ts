import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Permission denied')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}