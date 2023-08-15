import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
  mentorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  execute({mentorId, questionId, content}: AnswerQuestionUseCaseRequest) {
    const answer = new Answer(content)

    return answer
  }
}

