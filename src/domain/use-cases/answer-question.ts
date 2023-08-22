import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  mentorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {

  constructor(
    private answersRepository: AnswersRepository,
    ) {}

  async execute({mentorId, questionId, content}: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(mentorId),
      questionId: new UniqueEntityID(questionId)
    })

   await this.answersRepository.create(answer)

    return answer
  }
}

